import React, { useEffect, useState } from "react";
import axios from "axios";
import NavSeller from "../../Components/Layout/NavSeller"; // Import NavSeller
import { Link } from "react-router-dom"; // For footer navigation

const ViewAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState({}); // Track which announcements have comments visible

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:7000/announcements", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleAddComment = async (announcementId) => {
    try {
      const sellerId = localStorage.getItem("userid");
      const response = await axios.post(
        `http://localhost:7000/announcements/${announcementId}/comment`,
        { text: commentText, sellerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAnnouncements((prev) =>
        prev.map((announcement) =>
          announcement._id === announcementId ? response.data.announcement : announcement
        )
      );
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLikeComment = async (announcementId, commentId) => {
    try {
      const sellerId = localStorage.getItem("userid");
      await axios.post(
        `http://localhost:7000/announcements/${announcementId}/comments/${commentId}/like`,
        { sellerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Refresh announcements to show updated likes
      const response = await axios.get("http://localhost:7000/announcements", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const toggleComments = (announcementId) => {
    setShowComments((prev) => ({
      ...prev,
      [announcementId]: !prev[announcementId], // Toggle visibility of comments
    }));
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
        <h1 style={headerStyle}>Announcements</h1>
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Announcement Content */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "18px", marginBottom: "10px" }}>{announcement.text}</p>
              {announcement.image && (
                <img
                  src={`http://localhost:7000/${announcement.image}`}
                  alt="Announcement"
                  style={{ width: "100%", maxWidth: "500px", height: "auto", borderRadius: "10px" }}
                />
              )}
            </div>

            {/* Comment Button */}
            <button
              onClick={() => toggleComments(announcement._id)}
              className="btn btn-primary mb-3"
            >
              {showComments[announcement._id] ? "Hide Comments" : "View Comments"}
            </button>

            {/* Comments Section */}
            {showComments[announcement._id] && (
              <div>
                <h3 style={{ marginBottom: "10px" }}>Comments</h3>
                {announcement.comments.map((comment) => (
                  <div
                    key={comment._id}
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <p style={{ marginBottom: "5px" }}>
                      <strong>{comment.sellerId.name}:</strong> {comment.text}
                    </p>
                    <button
                      onClick={() => handleLikeComment(announcement._id, comment._id)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                    >
                      👍 {comment.likes.length}
                    </button>
                  </div>
                ))}

                {/* Add Comment Section */}
                <textarea
                  placeholder="Add a comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="form-control mb-3"
                  style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                />
                <button
                  onClick={() => handleAddComment(announcement._id)}
                  className="btn btn-primary"
                >
                  Add Comment
                </button>
              </div>
            )}
          </div>
        ))}
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

export default ViewAnnouncements;