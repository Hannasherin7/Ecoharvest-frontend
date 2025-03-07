import React, { useEffect, useState } from "react";
import axios from "axios";

const ConfirmFarmer = () => {
  const [farmers, setFarmers] = useState([]);

  // Fetch farmers data
  const fetchFarmers = () => {
    axios
      .get("http://localhost:7000/farmers")
      .then((response) => {
        console.log("API Response:", response.data);
        setFarmers(Array.isArray(response.data.data) ? response.data.data : []);
      })
      .catch((error) => {
        console.error("Error fetching farmers:", error);
        setFarmers([]);
      });
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  // Update status function
  const updateStatus = (id, status) => {
    axios
      .post("http://localhost:7000/update-farmer-status", {
        farmerId: id,
        status,
      })
      .then(() => {
        // Re-fetch data to ensure the state is updated
        fetchFarmers();
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  // Inline styles
  const containerStyle = {
    padding: "20px",
    textAlign: "center",
  };

  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "300px",
    textAlign: "left",
  };

  const selectStyle = {
    width: "100%",
    padding: "5px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  return (
    <div style={containerStyle}>
      <h2>Farmer Verification and Approval</h2>
      <div style={gridStyle}>
        {farmers.length > 0 ? (
          farmers.map((f) => (
            <div key={f._id} style={cardStyle}>
              <p>
                <strong>Name:</strong> {f.name}
              </p>
              <p>
                <strong>Email:</strong> {f.email}
              </p>
              <p>
                <strong>Phone:</strong> {f.phone}
              </p>
              <p>
                <strong>ID Proof:</strong>
                <a
                  href={`http://localhost:7000`+f.idProof}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  View
                </a>
              </p>
              <p>
                <strong>Terms Accepted:</strong>{" "}
                {f.termsAccepted ? "Yes" : "No"}
              </p>
              <p>
                <strong>Registered On:</strong>{" "}
                {new Date(f.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>
                <select
                  value={f.status || "pending"}
                  onChange={(e) => updateStatus(f._id, e.target.value)}
                  style={selectStyle}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </p>
            </div>
          ))
        ) : (
          <p>No farmers available.</p>
        )}
      </div>
    </div>
  );
};

export default ConfirmFarmer;
