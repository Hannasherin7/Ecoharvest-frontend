import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const UserFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]); // Stores the user's feedbacks
  const [editingFeedbackId, setEditingFeedbackId] = useState(null); // Tracks which feedback is being edited
  const [editedFeedback, setEditedFeedback] = useState({ text: "", rating: 0 }); // Stores the edited feedback data

  const loggedInUserId = localStorage.getItem("userid");

  // Fetch the user's feedbacks when the component mounts
  useEffect(() => {
    const fetchUserFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:7000/user-feedbacks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error("Error fetching user feedbacks:", error);
      }
    };

    fetchUserFeedbacks();
  }, []);

  // Handle editing feedback
  const handleEditFeedback = (feedback) => {
    setEditingFeedbackId(feedback._id);
    setEditedFeedback({ text: feedback.text, rating: feedback.rating });
  };

  // Handle saving the edited feedback
  const handleSaveFeedback = async (feedbackId) => {
    try {
      const response = await axios.put(
        `http://localhost:7000/update-feedback/${feedbackId}`, // Include feedbackId in the URL
        editedFeedback,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message === "Feedback updated successfully") {
        // Update the feedbacks list with the edited feedback
        const updatedFeedbacks = feedbacks.map((fb) =>
          fb._id === feedbackId ? { ...fb, text: editedFeedback.text, rating: editedFeedback.rating } : fb
        );

        setFeedbacks(updatedFeedbacks);
        setEditingFeedbackId(null); // Stop editing
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Feedbacks</h1>
      {feedbacks.length === 0 ? (
        <p>You have not submitted any feedbacks yet.</p>
      ) : (
        feedbacks.map((feedback) => (
          <div
            key={feedback._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3>Product: {feedback.productId?.pname}</h3>
            <p>Description: {feedback.productId?.discription}</p>
            <p>Price: ${feedback.productId?.price}</p>

            {editingFeedbackId === feedback._id ? (
              // Edit feedback form
              <div>
                <textarea
                  value={editedFeedback.text}
                  onChange={(e) =>
                    setEditedFeedback({ ...editedFeedback, text: e.target.value })
                  }
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                <select
                  value={editedFeedback.rating}
                  onChange={(e) =>
                    setEditedFeedback({ ...editedFeedback, rating: e.target.value })
                  }
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
                <button
                  onClick={() => handleSaveFeedback(feedback._id)}
                  style={{ marginRight: "10px" }}
                >
                  Save
                </button>
                <button onClick={() => setEditingFeedbackId(null)}>Cancel</button>
              </div>
            ) : (
              // Display feedback
              <div>
                <p>
                  <strong>Your Feedback:</strong> {feedback.text}
                </p>
                <p>
                  <strong>Rating:</strong> {feedback.rating} Stars
                </p>
                <button onClick={() => handleEditFeedback(feedback)}>
                  Edit Feedback
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};