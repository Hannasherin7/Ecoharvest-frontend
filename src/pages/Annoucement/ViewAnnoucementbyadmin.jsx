import React, { useEffect, useState } from "react";
import axios from "axios";
import NavAdmin from "../../Components/Layout/NavAdmin"; // Import NavAdmin for the header

const ViewAnnouncementsbyadmin = () => {
  const [announcements, setAnnouncements] = useState([]);
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
  const pageStyle = {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  };

  const headerStyle = {
    textAlign: "center",
    margin: "20px 0",
    fontSize: "32px",
    color: "#333",
  };

  const announcementCardStyle = {
    border: "1px solid #ddd",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const announcementTextStyle = {
    fontSize: "18px",
    marginBottom: "10px",
  };

  const announcementImageStyle = {
    width: "100%",
    maxWidth: "500px",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "10px",
  };

  const commentButtonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
  };

  const commentSectionStyle = {
    marginTop: "10px",
  };

  const commentCardStyle = {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  };

  const commentTextStyle = {
    marginBottom: "5px",
  };

  const likeButtonStyle = {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <NavAdmin />

      {/* Page Title */}
      <h1 style={headerStyle}>Announcements</h1>

      {/* Announcements List */}
      {announcements.map((announcement) => (
        <div key={announcement._id} style={announcementCardStyle}>
          {/* Announcement Content */}
          <div>
            <p style={announcementTextStyle}>{announcement.text}</p>
            {announcement.image && (
              <img
                src={`http://localhost:7000/${announcement.image}`}
                alt="Announcement"
                style={announcementImageStyle}
              />
            )}
          </div>

          {/* Comment Button */}
          <button
            onClick={() => toggleComments(announcement._id)}
            style={commentButtonStyle}
          >
            {showComments[announcement._id] ? "Hide Comments" : "View Comments"}
          </button>

          {/* Comments Section */}
          {showComments[announcement._id] && (
            <div style={commentSectionStyle}>
              <h3 style={{ marginBottom: "10px" }}>Comments</h3>
              {announcement.comments.map((comment) => (
                <div key={comment._id} style={commentCardStyle}>
                  <p style={commentTextStyle}>
                    <strong>{comment.sellerId.name}:</strong> {comment.text}
                  </p>
                  <button
                    onClick={() => handleLikeComment(announcement._id, comment._id)}
                    style={likeButtonStyle}
                  >
                    Like ({comment.likes.length})
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewAnnouncementsbyadmin;