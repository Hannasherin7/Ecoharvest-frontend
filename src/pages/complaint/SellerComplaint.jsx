import React, { useEffect, useState } from "react";
import axios from "axios";
import NavSeller from "../../Components/Layout/NavSeller"; // Import NavSeller
import { Link } from "react-router-dom"; // For footer navigation

const SellerComplaints = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [sellerMessage, setSellerMessage] = useState("");

  const userId = localStorage.getItem("userid"); // Get seller's userId from localStorage

  useEffect(() => {
    const fetchSoldProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/soldproduct?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Filter products to only include those with complaints
        const productsWithComplaints = response.data.filter(
          (product) => product.complaints && product.complaints.length > 0
        );
        setProducts(productsWithComplaints);
      } catch (err) {
        console.error("Error fetching sold products:", err);
        setError("Could not fetch sold products. Please try again later.");
      }
    };

    fetchSoldProducts();
  }, [userId]);

  const handleUpdateComplaint = async (complaintId) => {
    try {
      const response = await axios.put(
        `http://localhost:7000/update-complaintstatus/${complaintId}`,
        { status, sellerMessage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        alert("Complaint updated successfully!");
        setSelectedComplaint(null); // Close the update form
        setStatus("");
        setSellerMessage("");

        // Refresh the product list
        const updatedProducts = products.map((product) => ({
          ...product,
          complaints: product.complaints.map((complaint) =>
            complaint._id === complaintId ? response.data.complaint : complaint
          ),
        }));
        setProducts(updatedProducts);
      }
    } catch (err) {
      console.error("Error updating complaint:", err);
      alert("Failed to update complaint. Please try again.");
    }
  };

  // Styles
  const styles = {
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      textAlign: 'center',
      padding: '20px',
      marginTop: '30px',
    },
    link: {
      color: '#4caf50',
      textDecoration: 'none',
    },
  };

  const headerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px 0",
  };

  return (
    <div>
      <NavSeller /> {/* Add NavSeller */}
      <div className="container mt-4">
        <h1 style={headerStyle}>Seller Complaints</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <img
                  src={`http://localhost:7000/${product.image}`}
                  alt={product.name}
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px", marginRight: "10px" }}
                />
                <div>
                  <h2>{product.pname}</h2>
                  <p>{product.discription}</p>
                  <p>Price: ${product.price}</p>
                </div>
              </div>

              <h3>Complaints</h3>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>User Email</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Resolution Request</th>
                      <th>Status</th>
                      <th>Seller Response</th>
                      <th>Evidence</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.complaints.map((complaint) => (
                      <tr key={complaint._id}>
                        <td>{complaint.userId?.email}</td>
                        <td>{complaint.description}</td>
                        <td>{complaint.category}</td>
                        <td>{complaint.resolutionRequest}</td>
                        <td>{complaint.status}</td>
                        <td>{complaint.sellerResponse || "No response yet"}</td>
                        <td>
                          {complaint.evidence && (
                            <img
                              src={`http://localhost:7000/${complaint.evidence}`}
                              alt="Evidence"
                              style={{ width: "100px", height: "auto" }}
                            />
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => setSelectedComplaint(complaint._id)}
                            className="btn btn-primary"
                          >
                            Update
                          </button>
                          {selectedComplaint === complaint._id && (
                            <div style={{ marginTop: "10px" }}>
                              <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="form-select mb-2"
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                              <textarea
                                placeholder="Enter your response"
                                value={sellerMessage}
                                onChange={(e) => setSellerMessage(e.target.value)}
                                className="form-control mb-2"
                              />
                              <button
                                onClick={() => handleUpdateComplaint(complaint._id)}
                                className="btn btn-success me-2"
                              >
                                Submit
                              </button>
                              <button
                                onClick={() => setSelectedComplaint(null)}
                                className="btn btn-danger"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <p>No products with complaints found.</p>
        )}
      </div>
      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
        <p>
          Follow us on
          <a href="https://facebook.com" style={styles.link}> Facebook</a>,
          <a href="https://instagram.com" style={styles.link}> Instagram</a>, and
          <a href="https://twitter.com" style={styles.link}> Twitter</a>.
        </p>
        <p>
          <Link to="/contact" style={styles.link}>Contact Us</Link> |
          <Link to="/about" style={styles.link}> About Us</Link>
        </p>
      </footer>
    </div>
  );
};

export default SellerComplaints;