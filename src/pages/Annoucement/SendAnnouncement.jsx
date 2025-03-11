import React, { useState } from "react";
import axios from "axios";

const SendAnnouncement = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      alert("Failed to send announcement. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Send Announcement</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter announcement text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
          Send Announcement
        </button>
      </form>
    </div>
  );
};

export default SendAnnouncement;