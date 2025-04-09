import React, { useState, useEffect } from "react";
import axios from "axios";
import NavSeller from "../../Components/Layout/NavSeller";
import { Link } from "react-router-dom"; // For footer navigation
  import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

      

const OwnComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:7000/ownComplaint", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            setComplaints(response.data.complaints);
        }).catch((error) => {
            console.error("Error fetching complaints:", error);
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
            <NavSeller />
            <div className="container mt-4">
                <h1 style={headerStyle}>Your Complaints</h1>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Complaint</th>
                                <th>Resolution Request</th>
                                <th>Status</th>
                                <th>Admin Message</th>
                                <th>Image</th> {/* New column for image */}
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((comp) => (
                                <tr key={comp._id}>
                                    <td>{comp.name}</td>
                                    <td>{comp.email}</td>
                                    <td>{comp.phoneNumber}</td>
                                    <td>{comp.complaint}</td>
                                    <td>{comp.resolutionRequest}</td>
                                    <td>{comp.status}</td>
                                    <td>{comp.adminMessage}</td>
                                    <td>
                                        {comp.image && ( // Display image if it exists
                                            <img
                                                src={`http://localhost:7000/${comp.image}`}
                                                alt="Complaint Evidence"
                                                style={{ width: "100px", height: "auto" }}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
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

export default OwnComplaints;