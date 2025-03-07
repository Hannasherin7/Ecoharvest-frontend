import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../../Components/Layout/NavBar";

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
      <footer style={footerStyle}>
        <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
        <p>
          Follow us on
          <a href="https://facebook.com" style={linkStyle}> Facebook</a>,
          <a href="https://instagram.com" style={linkStyle}> Instagram</a>, and
          <a href="https://twitter.com" style={linkStyle}> Twitter</a>.
        </p>
        <p>
          <Link to="/contact" style={linkStyle}>Contact Us</Link> |
          <Link to="/about" style={linkStyle}> About Us</Link>
        </p>
      </footer>
    </div>
  );
};

export default AddBlog;
