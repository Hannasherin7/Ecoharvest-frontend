import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import NavAdmin from "../../Components/Layout/NavAdmin"; // Import NavAdmin for the header

const SendAnnouncement = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("text", text);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:7000/send-announcement", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Announcement sent successfully!");
      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error sending announcement:", error);
      setError("Failed to send announcement. Please try again.");
    } finally {
      setLoading(false);
    }
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

  const formStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const textareaStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    resize: "vertical",
  };

  const fileInputStyle = {
    marginBottom: "10px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    marginBottom: "10px", // Added margin for spacing
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  };

  const viewButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#2196F3", // Blue color for the view button
  };

  const errorStyle = {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <NavAdmin />

      {/* Page Title */}
      <h1 style={headerStyle}>Send Announcement</h1>

      {/* Form */}
      <div style={formStyle}>
        {error && <p style={errorStyle}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter announcement text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={textareaStyle}
            required
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={fileInputStyle}
          />
          <button
            type="submit"
            disabled={loading}
            style={loading ? buttonDisabledStyle : buttonStyle}
          >
            {loading ? "Sending..." : "Send Announcement"}
          </button>
        </form>

        {/* View All Announcements Button */}
        <button
          onClick={() => navigate("/viewaa")} // Navigate to /viewaa
          style={viewButtonStyle}
        >
          View All Announcements
        </button>
      </div>
    </div>
  );
};

export default SendAnnouncement;