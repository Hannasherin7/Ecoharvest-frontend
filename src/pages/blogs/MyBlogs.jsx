import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Components/Layout/NavBar";
import { Link } from "react-router-dom";

import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";




const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogs, setExpandedBlogs] = useState({});

  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/my-blogs/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching my blogs:", error);
      }
    };

    fetchMyBlogs();
  }, [userId]);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:7000/blogs/delete/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const toggleReadMore = (blogId) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  return (
    <div style={containerStyle}>
      <NavBar />
      <header style={headerStyle}>
        <h1>My Blogs</h1>
      </header>

      <div style={gridContainerStyle}>
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} style={cardStyle}>
              <h2 style={titleStyle}>{blog.title}</h2>
              <img
                src={`http://localhost:7000/${blog.image.replace(/^\//, "")}`}
                alt={blog.title}
                style={imageStyle}
              />
              <div style={cardContentStyle}>
                <p style={contentStyle}>
                  {expandedBlogs[blog._id] || blog.content.length <= 100
                    ? blog.content
                    : `${blog.content.substring(0, 100)}...`}
                </p>
                {blog.content.length > 100 && (
                  <button
                    style={readMoreButtonStyle}
                    onClick={() => toggleReadMore(blog._id)}
                  >
                    {expandedBlogs[blog._id] ? "Show Less" : "Read More"}
                  </button>
                )}
                <button
                  style={deleteButtonStyle}
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

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

const containerStyle = {
  maxWidth: "1200px",
  margin: "auto",
  textAlign: "center",
  padding: "20px",
};

const headerStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
};

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  justifyContent: "center",
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "auto",
  width: "350px",
  padding: "10px",
};

const imageStyle = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
};

const cardContentStyle = {
  padding: "15px",
  flexGrow: 1,
};

const titleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const contentStyle = {
  fontSize: "14px",
  color: "#333",
  flexGrow: 1,
};

const readMoreButtonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "5px 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  marginTop: "10px",
  width: "100%",
};

const deleteButtonStyle = {
  backgroundColor: "#d9534f",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  width: "100%",
  marginTop: "10px",
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

export default MyBlogs;
