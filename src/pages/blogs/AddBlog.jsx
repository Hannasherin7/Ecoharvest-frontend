import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../../Components/Layout/NavBar";
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

           

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const userId = localStorage.getItem("userid");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("userId", userId);

    try {
      const response = await axios.post("http://localhost:7000/blogs/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Response:", response); // Debugging: Check full response structure

      if (response.data && response.data.message) {
        alert(response.data.message);
      } else {
        alert("Blog added successfully!"); // Fallback message
      }
    } catch (error) {
      console.error("Error adding blog:", error.response?.data || error.message);
      alert("Failed to add blog");
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
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
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
    marginLeft: "5px",
  };

  return (
    <div>
        <NavBar/>
      {/* Header Section */}
      <header style={headerStyle}>
        <h1>Upload a New Blog</h1>
      </header>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="6"
          style={inputStyle}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>submit Blog</button>
      </form>

      {/* Footer Section */}
      
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

export default AddBlog;
