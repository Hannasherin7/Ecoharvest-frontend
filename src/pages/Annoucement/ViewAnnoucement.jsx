import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Announcements</h1>
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
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
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
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Like ({comment.likes.length})
                  </button>
                </div>
              ))}

              {/* Add Comment Section */}
              <textarea
                placeholder="Add a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={() => handleAddComment(announcement._id)}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add Comment
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewAnnouncements;