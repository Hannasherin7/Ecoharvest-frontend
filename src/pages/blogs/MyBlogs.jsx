import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Components/Layout/NavBar";

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

      <footer style={footerStyle}>
        <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
        <p>
          Follow us on
          <a href="https://facebook.com" style={linkStyle}> Facebook</a>,
          <a href="https://instagram.com" style={linkStyle}> Instagram</a>, and
          <a href="https://twitter.com" style={linkStyle}> Twitter</a>.
        </p>
        <p>
          <a href="/contact" style={linkStyle}>Contact Us</a> |
          <a href="/about" style={linkStyle}> About Us</a>
        </p>
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
