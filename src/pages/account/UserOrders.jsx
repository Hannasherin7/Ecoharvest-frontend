import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Components/Layout/NavBar";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [error, setError] = useState("");
  const [feedbackVisible, setFeedbackVisible] = useState({});
  const [feedbackText, setFeedbackText] = useState({});
  const [feedbackRating, setFeedbackRating] = useState({});
  const [editingFeedbackId, setEditingFeedbackId] = useState(null);
  const [editedFeedback, setEditedFeedback] = useState({ text: "", rating: "" });

  // Complaint states
  const [complaintVisible, setComplaintVisible] = useState({});
  const [complaintData, setComplaintData] = useState({
    description: "",
    category: "Damaged Product",
    resolutionRequest: "Replacement",
    evidence: null,
  });
  const [editingComplaintId, setEditingComplaintId] = useState(null);
  const [editedComplaint, setEditedComplaint] = useState({
    description: "",
    category: "Damaged Product",
    resolutionRequest: "Replacement",
    evidence: null,
  });

  useEffect(() => {
    const fetchUserOrders = async () => {
      const userId = localStorage.getItem("userid");

      if (!userId) {
        setError("User ID not found. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:7000/ownorders?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.length > 0) {
          setUserOrders(response.data);
        } else {
          setError("No orders found for this user.");
        }
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("Could not fetch user orders. Please try again later.");
      }
    };

    fetchUserOrders();
  }, []);

  const statusSteps = ["Order placed", "In transit", "Out of delivery", "delivered"];

  // Feedback handlers
  const handleAddFeedback = (orderId) => {
    setFeedbackVisible((prev) => ({ ...prev, [orderId]: true }));
  };

  const handleCloseFeedback = (orderId) => {
    setFeedbackVisible((prev) => ({ ...prev, [orderId]: false }));
    setEditingFeedbackId(null);
  };

  const handleSubmitFeedback = async (orderId, productId) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/addfeedback",
        {
          text: feedbackText[orderId],
          rating: feedbackRating[orderId],
          userId: localStorage.getItem("userid"),
          productId,
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        setFeedbackVisible((prev) => ({ ...prev, [orderId]: false }));
        setUserOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, feedbacks: [...order.feedbacks, response.data] }
              : order
          )
        );
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  const handleEditFeedback = (feedback) => {
    setEditingFeedbackId(feedback._id);
    setEditedFeedback({ text: feedback.text, rating: feedback.rating });
  };

  const handleSaveFeedback = async (feedbackId) => {
    try {
      const response = await axios.put(
        `http://localhost:7000/update-feedback/${feedbackId}`,
        editedFeedback,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message === "Feedback updated successfully") {
        setUserOrders((prevOrders) =>
          prevOrders.map((order) => ({
            ...order,
            feedbacks: order.feedbacks.map((fb) =>
              fb._id === feedbackId
                ? { ...fb, text: editedFeedback.text, rating: editedFeedback.rating }
                : fb
            ),
          }))
        );
        setEditingFeedbackId(null);
      }
    } catch (err) {
      console.error("Error updating feedback:", err);
    }
  };

  // Complaint handlers
  const handleAddComplaint = (orderId) => {
    const userComplaint = userOrders
      .find((order) => order._id === orderId)
      ?.complaints?.find(
        (complaint) => complaint.userId === localStorage.getItem("userid")
      );

    if (userComplaint) {
      alert(
        "You have already submitted a complaint for this product. If you want to know about your complaint, please go to your complaints."
      );
      return;
    }

    setComplaintVisible((prev) => ({ ...prev, [orderId]: true }));
  };

  const handleCloseComplaint = (orderId) => {
    setComplaintVisible((prev) => ({ ...prev, [orderId]: false }));
    setEditingComplaintId(null);
  };

  const handleSubmitComplaint = async (orderId, productId) => {
    if (!complaintData.description || !complaintData.category || !complaintData.resolutionRequest) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("description", complaintData.description);
    formData.append("category", complaintData.category);
    formData.append("resolutionRequest", complaintData.resolutionRequest);
    formData.append("userId", localStorage.getItem("userid"));
    formData.append("productId", productId);

    // Append the image file
    if (complaintData.evidence) {
      formData.append("evidence", complaintData.evidence);
    }

    try {
      const response = await axios.post(
        "http://localhost:7000/submit-complaint",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        setComplaintVisible((prev) => ({ ...prev, [orderId]: false }));
        setUserOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  complaints: Array.isArray(order.complaints)
                    ? [...order.complaints, response.data.complaint]
                    : [response.data.complaint],
                }
              : order
          )
        );
      }
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("You have already submitted a complaint for this product. If you want to know about your complaint, please go to your complaints.");
    }
  };

  const handleEditComplaint = (complaint) => {
    setEditingComplaintId(complaint._id);
    setEditedComplaint({
      description: complaint.description,
      category: complaint.category,
      resolutionRequest: complaint.resolutionRequest,
      evidence: complaint.evidence,
    });
  };

  const handleSaveComplaint = async (complaintId) => {
    try {
      const response = await axios.put(
        `http://localhost:7000/update-complaint/${complaintId}`,
        editedComplaint,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message === "Complaint updated successfully") {
        setUserOrders((prevOrders) =>
          prevOrders.map((order) => ({
            ...order,
            complaints: order.complaints.map((comp) =>
              comp._id === complaintId
                ? { ...comp, ...editedComplaint }
                : comp
            ),
          }))
        );
        setEditingComplaintId(null);
      }
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  // Function to render rating as golden stars
  const renderRatingStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <div style={styles.pageStyle}>
      <div style={{ width: "100%" }}>
        <NavBar />
      </div>
      <h1 style={styles.headerStyle}>Your Orders</h1>
      {error && <p style={styles.error}>{error}</p>}

      {userOrders.length > 0 ? (
        <div style={styles.cardsContainer}>
          {userOrders.map((order, index) => {
            const userFeedback = Array.isArray(order.feedbacks)
              ? order.feedbacks.find(
                  (feedback) =>
                    feedback.userId === localStorage.getItem("userid")
                )
              : null;

            const userComplaint = Array.isArray(order.complaints)
              ? order.complaints.find(
                  (complaint) =>
                    complaint.userId === localStorage.getItem("userid")
                )
              : null;

            return (
              <div key={index} style={styles.card}>
                <img
                  src={`http://localhost:7000/${order.image.replace(/^\//, "")}`}
                  alt={order.productName}
                  style={styles.productImage}
                />
                <h3>{order.productName}</h3>
                <p style={styles.description}>{order.discription}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.userPhone}</p>
                <p><strong>Price:</strong> {order.price}</p>
                <div style={styles.statusContainer}>
                  {statusSteps.map((step, idx) => {
                    const isCompleted = idx <= statusSteps.indexOf(order.status);
                    return (
                      <div key={idx} style={styles.statusStep}>
                        <div
                          style={{
                            ...styles.statusDot,
                            backgroundColor: isCompleted ? "darkgreen" : "#ccc",
                            borderColor: isCompleted ? "darkgreen" : "#ccc",
                          }}
                        >
                          {isCompleted && <div style={styles.innerWhiteDot}></div>}
                        </div>
                        <span style={styles.statusText}>{step}</span>
                      </div>
                    );
                  })}
                  <div style={styles.statusLine}></div>
                </div>
                {order.status === "delivered" && (
                  <div>
                    {/* Feedback Section */}
                    {!feedbackVisible[order._id] && (
                      <button
                        onClick={() => handleAddFeedback(order._id)}
                        style={styles.feedbackButton}
                      >
                        Feedback
                      </button>
                    )}

                    {feedbackVisible[order._id] && (
                      <>
                        {userFeedback ? (
                          <div>
                            {editingFeedbackId === userFeedback._id ? (
                              <div>
                                <textarea
                                  value={editedFeedback.text}
                                  onChange={(e) =>
                                    setEditedFeedback({
                                      ...editedFeedback,
                                      text: e.target.value,
                                    })
                                  }
                                  style={styles.textarea}
                                />
                                <select
                                  value={editedFeedback.rating}
                                  onChange={(e) =>
                                    setEditedFeedback({
                                      ...editedFeedback,
                                      rating: e.target.value,
                                    })
                                  }
                                  style={styles.select}
                                >
                                  <option value={1}>1 Star</option>
                                  <option value={2}>2 Stars</option>
                                  <option value={3}>3 Stars</option>
                                  <option value={4}>4 Stars</option>
                                  <option value={5}>5 Stars</option>
                                </select>
                                <button
                                  onClick={() =>
                                    handleSaveFeedback(userFeedback._id)
                                  }
                                  style={styles.button}
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingFeedbackId(null)}
                                  style={styles.button}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div>
                                <p>
                                  <strong>Your Feedback:</strong>{" "}
                                  {userFeedback.text}
                                </p>
                                <p>
                                  <strong>Your Rating:</strong>{" "}
                                  {renderRatingStars(userFeedback.rating)}
                                </p>
                                <button
                                  onClick={() => handleEditFeedback(userFeedback)}
                                  style={styles.button}
                                >
                                  Edit Feedback
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <textarea
                              placeholder="Enter your feedback"
                              value={feedbackText[order._id] || ""}
                              onChange={(e) =>
                                setFeedbackText((prev) => ({
                                  ...prev,
                                  [order._id]: e.target.value,
                                }))
                              }
                              style={styles.textarea}
                            />
                            <select
                              value={feedbackRating[order._id] || ""}
                              onChange={(e) =>
                                setFeedbackRating((prev) => ({
                                  ...prev,
                                  [order._id]: e.target.value,
                                }))
                              }
                              style={styles.select}
                            >
                              <option value="">Select Rating</option>
                              {[1, 2, 3, 4, 5].map((value) => (
                                <option key={value} value={value}>
                                  {value} Star{value > 1 ? "s" : ""}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() =>
                                handleSubmitFeedback(
                                  order._id,
                                  order.productId
                                )
                              }
                              style={styles.button}
                            >
                              Submit Feedback
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {/* Complaint Section */}
                    {!complaintVisible[order._id] && !userComplaint && (
                      <button
                        onClick={() => handleAddComplaint(order._id)}
                        style={styles.complaintButton}
                      >
                        Submit Complaint
                      </button>
                    )}

                    {complaintVisible[order._id] && !userComplaint && (
                      <div>
                        <textarea
                          placeholder="Complaint Description"
                          value={complaintData.description}
                          onChange={(e) =>
                            setComplaintData({
                              ...complaintData,
                              description: e.target.value,
                            })
                          }
                          style={styles.textarea}
                        />
                        <select
                          value={complaintData.category}
                          onChange={(e) =>
                            setComplaintData({
                              ...complaintData,
                              category: e.target.value,
                            })
                          }
                          style={styles.select}
                        >
                          <option value="Damaged Product">Damaged Product</option>
                          <option value="Late Delivery">Late Delivery</option>
                          <option value="Wrong Product">Wrong Product</option>
                          <option value="Poor Quality">Poor Quality</option>
                          <option value="Missing Items">Missing Items</option>
                          <option value="Others">Others</option>
                        </select>
                        <select
                          value={complaintData.resolutionRequest}
                          onChange={(e) =>
                            setComplaintData({
                              ...complaintData,
                              resolutionRequest: e.target.value,
                            })
                          }
                          style={styles.select}
                        >
                          <option value="Replacement">Replacement</option>
                          <option value="Refund">Refund</option>
                          <option value="Return">Return</option>
                          <option value="Exchange">Exchange</option>
                          <option value="Other">Other</option>
                        </select>
                        <input
                          type="file"
                          onChange={(e) =>
                            setComplaintData({
                              ...complaintData,
                              evidence: e.target.files[0],
                            })
                          }
                        />
                        <button
                          onClick={() =>
                            handleSubmitComplaint(order._id, order.productId)
                          }
                          style={styles.button}
                        >
                          Submit Complaint
                        </button>
                      </div>
                    )}

                    {userComplaint && (
                      <div>
                        {editingComplaintId === userComplaint._id ? (
                          <div>
                            <textarea
                              placeholder="Complaint Description"
                              value={editedComplaint.description}
                              onChange={(e) =>
                                setEditedComplaint({
                                  ...editedComplaint,
                                  description: e.target.value,
                                })
                              }
                              style={styles.textarea}
                            />
                            <select
                              value={editedComplaint.category}
                              onChange={(e) =>
                                setEditedComplaint({
                                  ...editedComplaint,
                                  category: e.target.value,
                                })
                              }
                              style={styles.select}
                            >
                              <option value="Damaged Product">Damaged Product</option>
                              <option value="Late Delivery">Late Delivery</option>
                              <option value="Wrong Product">Wrong Product</option>
                              <option value="Poor Quality">Poor Quality</option>
                              <option value="Missing Items">Missing Items</option>
                              <option value="Others">Others</option>
                            </select>
                            <select
                              value={editedComplaint.resolutionRequest}
                              onChange={(e) =>
                                setEditedComplaint({
                                  ...editedComplaint,
                                  resolutionRequest: e.target.value,
                                })
                              }
                              style={styles.select}
                            >
                              <option value="Replacement">Replacement</option>
                              <option value="Refund">Refund</option>
                              <option value="Return">Return</option>
                              <option value="Exchange">Exchange</option>
                              <option value="Other">Other</option>
                            </select>
                            <input
                              type="file"
                              onChange={(e) =>
                                setEditedComplaint({
                                  ...editedComplaint,
                                  evidence: e.target.files[0],
                                })
                              }
                            />
                            <button
                              onClick={() =>
                                handleSaveComplaint(userComplaint._id)
                              }
                              style={styles.button}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingComplaintId(null)}
                              style={styles.button}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div>
                            <p>
                              <strong>Your Complaint:</strong>{" "}
                              {userComplaint.description}
                            </p>
                            <p>
                              <strong>Category:</strong>{" "}
                              {userComplaint.category}
                            </p>
                            
                            <p>
                              <strong>Resolution Request:</strong>{" "}
                              {userComplaint.resolutionRequest}
                            </p>
                            <button
                              onClick={() => handleEditComplaint(userComplaint)}
                              style={styles.button}
                            >
                              Edit Complaint
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        !error && <p>Loading orders...</p>
      )}

      <footer style={styles.footerStyle}>
        <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
        <p>
          Follow us on
          <a href="https://facebook.com" style={styles.linkStyle}> Facebook</a>,
          <a href="https://instagram.com" style={styles.linkStyle}> Instagram</a>, and
          <a href="https://twitter.com" style={styles.linkStyle}> Twitter</a>.
        </p>
        <p>
          <Link to="/contact" style={styles.linkStyle}>Contact Us</Link> |
          <Link to="/about" style={styles.linkStyle}> About Us</Link>
        </p>
      </footer>
    </div>
  );
};

const styles = {
  pageStyle: {
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  footerStyle: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    marginTop: 'auto',
    width: '100%',
  },
  linkStyle: {
    color: '#4caf50',
    textDecoration: 'none',
  },
  headerStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px 0",
    width: "100%",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "80%",
    maxWidth: "800px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "100%",
    textAlign: "center",
  },
  productImage: {
    width: "150px",
    height: "150px",
    objectFit: "contain",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginTop: "10px",
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: "20px auto",
    position: "relative",
  },
  statusStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
  statusDot: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "3px solid green",
    position: "relative",
  },
  innerWhiteDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  statusText: {
    marginTop: "5px",
    fontSize: "14px",
    color: "#333",
  },
  statusLine: {
    position: "absolute",
    top: "50%",
    left: "0",
    width: "100%",
    height: "3px",
    backgroundColor: "green",
  },
  feedbackButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    margin: "5px",
  },
  complaintButton: {
    padding: "10px 20px",
    backgroundColor: "#ff5722",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    margin: "5px",
  },
  textarea: {
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    margin: "5px",
  },
};

export default UserOrders;