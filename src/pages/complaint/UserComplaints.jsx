import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from '../../Components/Layout/NavBar'; // Adjust the path as necessary
import { Link } from 'react-router-dom'; // For footer navigation
  import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


const UserComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [editingComplaintId, setEditingComplaintId] = useState(null);
    const [editedComplaint, setEditedComplaint] = useState({
        description: "",
        category: "",
        resolutionRequest: "",
        evidence: null,
    });

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get("http://localhost:7000/user-complaints", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setComplaints(response.data.complaints);
            } catch (error) {
                console.error("Error fetching complaints:", error);
            }
        };

        fetchComplaints();
    }, []);

    const handleEditClick = (complaint) => {
        setEditingComplaintId(complaint._id);
        setEditedComplaint({
            description: complaint.description,
            category: complaint.category,
            resolutionRequest: complaint.resolutionRequest,
            evidence: null,
        });
    };

    const handleSaveClick = async (complaintId) => {
        const formData = new FormData();
        formData.append("complaintId", complaintId);
        formData.append("description", editedComplaint.description);
        formData.append("category", editedComplaint.category);
        formData.append("resolutionRequest", editedComplaint.resolutionRequest);

        if (editedComplaint.evidence) {
            formData.append("evidence", editedComplaint.evidence);
        }

        try {
            const response = await axios.post(
                "http://localhost:7000/update-complaint",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.message === "Complaint updated successfully") {
                setComplaints((prevComplaints) =>
                    prevComplaints.map((complaint) =>
                        complaint._id === complaintId
                            ? { ...complaint, ...response.data.complaint }
                            : complaint
                    )
                );
                setEditingComplaintId(null);
            }
        } catch (error) {
            console.error("Error updating complaint:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingComplaintId(null);
        setEditedComplaint({
            description: "",
            category: "",
            resolutionRequest: "",
            evidence: null,
        });
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
            <NavBar />
            <div className="container mt-4">
                <h1 style={headerStyle}>Your Complaints</h1>
                <div style={{ padding: "20px" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f2f2f2" }}>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Description</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Category</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Resolution Request</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Seller Response</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Evidence</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint) => (
                                <tr key={complaint._id} style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {editingComplaintId === complaint._id ? (
                                            <textarea
                                                value={editedComplaint.description}
                                                onChange={(e) =>
                                                    setEditedComplaint({
                                                        ...editedComplaint,
                                                        description: e.target.value,
                                                    })
                                                }
                                                style={{ width: "100%", padding: "5px" }}
                                            />
                                        ) : (
                                            complaint.description
                                        )}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {editingComplaintId === complaint._id ? (
                                            <select
                                                value={editedComplaint.category}
                                                onChange={(e) =>
                                                    setEditedComplaint({
                                                        ...editedComplaint,
                                                        category: e.target.value,
                                                    })
                                                }
                                                style={{ width: "100%", padding: "5px" }}
                                            >
                                                <option value="Damaged Product">Damaged Product</option>
                                                <option value="Late Delivery">Late Delivery</option>
                                                <option value="Wrong Product">Wrong Product</option>
                                                <option value="Poor Quality">Poor Quality</option>
                                                <option value="Missing Items">Missing Items</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        ) : (
                                            complaint.category
                                        )}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {editingComplaintId === complaint._id ? (
                                            <select
                                                value={editedComplaint.resolutionRequest}
                                                onChange={(e) =>
                                                    setEditedComplaint({
                                                        ...editedComplaint,
                                                        resolutionRequest: e.target.value,
                                                    })
                                                }
                                                style={{ width: "100%", padding: "5px" }}
                                            >
                                                <option value="Replacement">Replacement</option>
                                                <option value="Refund">Refund</option>
                                                <option value="Return">Return</option>
                                                <option value="Exchange">Exchange</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        ) : (
                                            complaint.resolutionRequest
                                        )}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {complaint.status}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {complaint.sellerResponse || "No response yet"}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {editingComplaintId === complaint._id ? (
                                            <input
                                                type="file"
                                                onChange={(e) =>
                                                    setEditedComplaint({
                                                        ...editedComplaint,
                                                        evidence: e.target.files[0],
                                                    })
                                                }
                                            />
                                        ) : (
                                            complaint.evidence && (
                                                <img
                                                    src={`http://localhost:7000/${complaint.evidence}`}
                                                    alt="Evidence"
                                                    style={{ width: "100px", height: "auto" }}
                                                />
                                            )
                                        )}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {editingComplaintId === complaint._id ? (
                                            <div style={{ display: "flex", gap: "5px" }}>
                                                <button
                                                    onClick={() => handleSaveClick(complaint._id)}
                                                    style={{
                                                        backgroundColor: "#4CAF50",
                                                        color: "white",
                                                        border: "none",
                                                        padding: "5px 10px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    style={{
                                                        backgroundColor: "#f44336",
                                                        color: "white",
                                                        border: "none",
                                                        padding: "5px 10px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleEditClick(complaint)}
                                                style={{
                                                    backgroundColor: "#ff5722",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "5px 10px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                                    Total Complaints: {complaints.length}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            {/* Footer */}
          
                <footer style={{
                            backgroundColor: "#2c3e50",
                            color: "#ecf0f1",
                            padding: "50px 0 20px",
                            marginTop: "50px"
                          }}>
                            <div className="container">
                              <div className="row">
                                <div className="col-md-4 mb-4">
                                  <h5 style={{ 
                                    fontFamily: "'Playfair Display', serif",
                                    marginBottom: "20px",
                                    fontWeight: "600"
                                  }}>
                                    EcoHarvest
                                  </h5>
                                  <p style={{ lineHeight: "1.6" }}>
                                    Bringing people together through the joy of organic living and sharing high-quality products from around the world.
                                  </p>
                                </div>
                                <div className="col-md-2 mb-4">
                                  <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Explore</h6>
                                  <ul style={{ listStyle: "none", padding: "0" }}>
                                    <li style={{ marginBottom: "8px" }}><Link to="/" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Home</Link></li>
                                    <li style={{ marginBottom: "8px" }}><Link to="/productlist" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Products</Link></li>
                                    <li style={{ marginBottom: "8px" }}><Link to="/about" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>About</Link></li>
                                    <li style={{ marginBottom: "8px" }}><Link to="/contact" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Contact</Link></li>
                                  </ul>
                                </div>
                                <div className="col-md-3 mb-4">
                                  <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Legal</h6>
                                  <ul style={{ listStyle: "none", padding: "0" }}>
                                    <li style={{ marginBottom: "8px" }}>Eco-friendly Commitment</li>
                                    <li style={{ marginBottom: "8px" }}>Sustainability Policy</li>
                                    <li style={{ marginBottom: "8px" }}>Organic Certification</li>
                                  </ul>
                                </div>
                                <div className="col-md-3 mb-4">
                                  <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Connect With Us</h6>
                                  <div className="social-icons" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                                    <a href="https://facebook.com" style={{ color: "#bdc3c7", marginRight: "15px", ":hover": { color: "#3b5998" } }}><FaFacebook /></a>
                                    <a href="https://instagram.com" style={{ color: "#bdc3c7", marginRight: "15px", ":hover": { color: "#e4405f" } }}><FaInstagram /></a>
                                    <a href="https://twitter.com" style={{ color: "#bdc3c7", ":hover": { color: "#1da1f2" } }}><FaTwitter /></a>
                                  </div>
                                 
                                  
                                </div>
                              </div>
                              <hr style={{ borderColor: "#34495e", margin: "20px 0" }} />
                              <div className="text-center" style={{ fontSize: "0.9rem" }}>
                                <p style={{ margin: "0" }}>
                                  &copy; {new Date().getFullYear()} EcoHarvest. All rights reserved.
                                </p>
                              </div>
                            </div>
                          </footer>
        </div>
    );
};

export default UserComplaints;