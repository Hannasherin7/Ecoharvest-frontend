import React, { useState } from "react";
import axios from "axios";
import NavBar from "../../Components/Layout/NavBar";
import { Link } from "react-router-dom";
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

          

const ProductFeedBack = () => {
  const [image, setImage] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !feedback) {
      setMessage("Please fill in all fields.");
      return;
    }
    const userId = localStorage.getItem("userid");

      
    const formData = new FormData();
    formData.append("image", image);
    formData.append("feedback", feedback);

    try {
      const response = await axios.post("http://localhost:7000/submitFeedback", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.status === "success") {
        setMessage("Feedback submitted successfully!");
        setImage(null);
        setFeedback("");
      } else {
        setMessage("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("An error occurred while submitting feedback.");
    }
  };

  // Styles
  const headerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px 0",
    width: "100%",
  };

  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    marginTop: 'auto',
    width: '100%',
  };

  const linkStyle = {
    color: '#4caf50',
    textDecoration: 'none',
  };

  const pageStyle = {
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  };

  const formStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const textareaStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "vertical",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  };

  return (
    <div style={pageStyle}>
      <div style={{ width: "100%" }}>
        <NavBar />
      </div>
      <h1 style={headerStyle}>Feedback Form</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={textareaStyle}
            rows="5"
            placeholder="Enter your feedback..."
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Submit Feedback
        </button>
        {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
      </form>

     
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

export default ProductFeedBack;