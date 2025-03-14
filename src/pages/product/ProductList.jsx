import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Layout/NavBar";
import { Link } from "react-router-dom";
import NavSeller from "../../Components/Layout/NavSeller";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    paymentMethod: "",
    orderQuantity: 1,
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState({ text: "", rating: 0 });
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentProductFeedback, setCurrentProductFeedback] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category
  const [orderId, setOrderId] = useState(null); // State to store order ID

  const loggedInUserId = localStorage.getItem("userid");

  const categories = [
    "Fruits",
    "Vegetables",
    "Meat and Poultry",
    "Dairy Products",
    "Grains and Legumes",
    "Processed Foods",
    "Non-Food Items",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:7000/viewpro", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleInputChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleFeedbackChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (selectedProduct) {
      const discountedPrice = selectedProduct.price * (1 - selectedProduct.discountPercentage / 100);
      setTotalAmount(discountedPrice * orderData.orderQuantity);
    }
  }, [orderData.orderQuantity, selectedProduct]);

  const checkProductAvailability = async (productId, postalCode) => {
    try {
      const response = await axios.post("http://localhost:7000/check-availability", {
        productId,
        postalCode
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      return response.data; // Return the response from the backend
    } catch (error) {
      console.error("Error checking product availability:", error);
      return { status: "error", message: "An error occurred while checking product availability." };
    }
  };

  const placeOrder = async () => {
    if (
      orderData.name &&
      orderData.email &&
      orderData.phone &&
      orderData.address &&
      orderData.pincode &&
      orderData.paymentMethod
    ) {
      // Check product availability before placing the order
      const availabilityResponse = await checkProductAvailability(selectedProduct._id, orderData.pincode);

      if (availabilityResponse.status === "error") {
        alert(availabilityResponse.message);
        return;
      }

      const orderPayload = {
        ...orderData,
        productId: selectedProduct._id,
      };

      axios
        .post("http://localhost:7000/order", orderPayload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.status === "success") {
            alert("Order placed successfully!");
            setSelectedProduct(null);
            setOrderId(response.data.orderId); // Store the order ID
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => console.error("Order error:", error));
    } else {
      alert("Please fill all fields.");
    }
  };

  const submitFeedback = async (productId) => {
    if (!loggedInUserId) {
      alert("Please log in to submit feedback.");
      return;
    }

    if (!feedback.text || !feedback.rating) {
      alert("Please provide both feedback text and rating.");
      return;
    }

    try {
      const feedbackPayload = {
        ...feedback,
        userId: loggedInUserId,
        productId,
        orderId, // Include the order ID
      };

      const response = await axios.post(
        "http://localhost:7000/submit-feedback",
        feedbackPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message === "You have already submitted feedback for this order.") {
        setFeedbackError(response.data.message);
        setHasSubmittedFeedback(true);
      } else {
        alert("Feedback submitted successfully!");
        setFeedback({ text: "", rating: 0 });
        setShowFeedbackForm(false);
        setFeedbackError("");
        setHasSubmittedFeedback(true);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      if (error.response && error.response.data.message) {
        setFeedbackError(error.response.data.message);
      } else {
        alert("Failed to submit feedback.");
      }
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Set the selected category
  };

  // Updated filteredProducts logic to only show Organic Products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.pname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const isOrganicProduct = product.productype === "Organic Product"; // New condition
    return matchesSearch && matchesCategory && product.userId !== loggedInUserId && isOrganicProduct;
  });

  const handleReadFeedback = async (product) => {
    setCurrentProductFeedback(product.feedbacks || []);
    setCurrentProductId(product._id);
    setShowFeedbackModal(true);
    setFeedbackError("");

    try {
      const response = await axios.get(
        `http://localhost:7000/check-feedback/${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.hasSubmittedFeedback) {
        setHasSubmittedFeedback(true);
      } else {
        setHasSubmittedFeedback(false);
      }
    } catch (error) {
      console.error("Error checking feedback:", error);
    }
  };

  const handleAddFeedbackClick = async (productId) => {
    if (!loggedInUserId) {
      alert("Please log in to submit feedback.");
      return;
    }

    if (hasSubmittedFeedback) {
      setFeedbackError("You have already submitted feedback for this order.");
      return;
    }

    try {
      const eligibilityResponse = await axios.get(
        `http://localhost:7000/check-eligibility/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (eligibilityResponse.data.eligible) {
        setShowFeedbackForm(true);
      } else {
        alert("You are not eligible to submit feedback for this product.");
      }
    } catch (error) {
      console.error("Error checking eligibility:", error);
      alert("Failed to check eligibility.");
    }
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  const headerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px 0",
  };

  const footerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    marginTop: "30px",
  };

  const linkStyle = {
    color: "#4caf50",
    textDecoration: "none",
  };

  const pageStyle = {
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
  };

  const categoryCardStyle = {
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    margin: "10px",
    flex: "1 1 calc(14.28% - 20px)", // 7 cards in a row
    maxWidth: "calc(14.28% - 20px)", // 7 cards in a row
  };

  return (
    <div style={pageStyle}>
      <NavBar/>
      <h1 style={headerStyle}>Browse Organic Products</h1>

      {/* Category Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}>
        {categories.map((category) => (
          <div
            key={category}
            style={categoryCardStyle}
            onClick={() => handleCategoryClick(category)}
          >
            <h3>{category}</h3>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(5px)",
          color: "black",
        }}
      />

      <div className="row">
        {filteredProducts.map((product) => {
          const discountedPrice = product.price * (1 - product.discountPercentage / 100);
          return (
            <div key={product._id} className="col-4">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "15px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                  padding: "20px",
                }}
                className="card"
              >
                <img
                  src={`http://localhost:7000/${product.image.replace(/^\//, "")}`}
                  alt={product.pname}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 style={{ color: "black" }}>{product.pname}</h5>
                  <p style={{ color: "black" }}>{product.discription}</p>
                  <p style={{ color: "black" }}>Product Details: {product.details}</p>
                  <p style={{ color: "black" }}>
                    <span style={{ textDecoration: "line-through" }}>
                      ${product.price}
                    </span>{" "}
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      ${discountedPrice.toFixed(2)} ({product.discountPercentage}% off)
                    </span>
                  </p>

                  {product.quantity < 1 ? (
                    <button disabled className="btn btn-danger">
                      Out of Stock
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="btn btn-primary"
                    >
                      Buy Now
                    </button>
                  )}

                  <button
                    onClick={() => handleReadFeedback(product)}
                    className="btn btn-info"
                    style={{ marginTop: "10px" }}
                  >
                    Read Feedback
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Modal */}
      {selectedProduct && (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "15px",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          }}
          className="modal show d-block"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Place Order</h5>
                <button onClick={() => setSelectedProduct(null)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p style={{ color: "black" }}>
                  Product: {selectedProduct.pname}
                </p>
                <p style={{ color: "black" }}>
                  <span style={{ textDecoration: "line-through" }}>
                    ${selectedProduct.price}
                  </span>{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    ${(selectedProduct.price * (1 - selectedProduct.discountPercentage / 100)).toFixed(2)} ({selectedProduct.discountPercentage}% off)
                  </span>
                </p>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={orderData.email}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={orderData.pincode}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
                <input
                  type="number"
                  name="orderQuantity"
                  placeholder="Quantity"
                  value={orderData.orderQuantity}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  min="1"
                  max={selectedProduct.quantity}
                />
                <select
                  name="paymentMethod"
                  value={orderData.paymentMethod}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                >
                  <option value="">Select Payment Method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="cash_on_delivery">Cash on Delivery</option>
                </select>
                <p style={{ color: "black" }}>Total: ${totalAmount.toFixed(2)}</p>
              </div>
              <div className="modal-footer">
                <button onClick={placeOrder} className="btn btn-primary">
                  Place Order
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "15px",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "600px",
            zIndex: 1000,
          }}
          className="modal show d-block"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Product Feedback</h5>
                <button onClick={() => setShowFeedbackModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {currentProductFeedback.length > 0 ? (
                  currentProductFeedback.map((fb, index) => (
                    <div
                      key={index}
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "10px",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ color: "black" }}>
                        By: <strong>{fb.userId?.name || "Unknown User"}</strong>
                      </p>
                      <p style={{ color: "black" }}>Feedback: {fb.text}</p>
                      <p style={{ color: "black" }}>
                        Rating: {renderStars(fb.rating)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "black" }}>No feedbacks yet.</p>
                )}

                {!hasSubmittedFeedback && (
                  <>
                    <p style={{ color: "black", marginTop: "20px" }}>
                      Do you want to add feedback?
                    </p>
                    <button
                      onClick={() => handleAddFeedbackClick(currentProductId)}
                      className="btn btn-success"
                    >
                      Add Feedback
                    </button>
                  </>
                )}

                {showFeedbackForm && (
                  <div style={{ marginTop: "20px" }}>
                    <textarea
                      name="text"
                      placeholder="Write your feedback..."
                      value={feedback.text}
                      onChange={handleFeedbackChange}
                      style={{ width: "100%", marginBottom: "10px" }}
                    />
                    <select
                      name="rating"
                      value={feedback.rating}
                      onChange={handleFeedbackChange}
                      style={{ width: "100%", marginBottom: "10px" }}
                    >
                      <option value={0}>Select Rating</option>
                      <option value={1}>1 Star</option>
                      <option value={2}>2 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={5}>5 Stars</option>
                    </select>
                    <button
                      onClick={() => submitFeedback(currentProductId)}
                      className="btn btn-primary"
                    >
                      Submit Feedback
                    </button>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={footerStyle}>
        <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
        <p>
          Follow us on
          <a href="https://facebook.com" style={linkStyle}>
            {" "}
            Facebook
          </a>
          ,
          <a href="https://instagram.com" style={linkStyle}>
            {" "}
            Instagram
          </a>
          , and
          <a href="https://twitter.com" style={linkStyle}>
            {" "}
            Twitter
          </a>
          .
        </p>
        <p>
          <Link to="/contact" style={linkStyle}>
            Contact Us
          </Link>{" "}
          |
          <Link to="/about" style={linkStyle}>
            {" "}
            About Us
          </Link>
        </p>
      </footer>
    </div>
  );
};