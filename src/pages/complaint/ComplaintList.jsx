import React, { useState, useEffect } from "react";
import axios from "axios";
import NavAdmin from "../../Components/Layout/NavAdmin";
import { Link } from 'react-router-dom';

const ComplaintList = () => {
  const [data, changeData] = useState([]);

  // Fetch complaints when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:7000/complaintList", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log("Fetched Data:", response.data);
        changeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
      });
  };

  const deleteComplaint = (_id) => {
    axios
      .post("http://localhost:7000/deleteComplaint", { _id })
      .then((response) => {
        if (response.data.status === "success") {
          alert("Complaint cleared");
          changeData((prevData) => prevData.filter((res) => res._id !== _id));
        } else {
          alert("Error deleting complaint");
        }
      })
      .catch((error) => {
        console.error("Error deleting complaint:", error);
      });
  };

  // Update complaint status
  const updateStatus = (_id, newStatus) => {
    axios
      .post("http://localhost:7000/updateComplaintStatus", { _id, status: newStatus })
      .then((response) => {
        if (response.data.status === "success") {
          changeData((prevData) =>
            prevData.map((item) =>
              item._id === _id ? { ...item, status: newStatus } : item
            )
          );
          console.log("Status updated successfully!");
        } else {
          alert("Error updating status");
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
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

  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    marginTop: '30px',
  };

  const linkStyle = {
    color: '#4caf50',
    textDecoration: 'none',
  };

  return (
    <div>
      <NavAdmin />
      <div className="container">
        <h1 style={headerStyle}>Complaint List</h1> {/* Header with headerStyle applied */}
        <div className="row">
          <div className="col">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Complaint</th>
                  <th>Priority Level</th>
                  <th>Date Filled</th>
                  <th>Contact No</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((value) => (
                    <tr key={value._id}>
                      <td>{value.name}</td>
                      <td>{value.ComplaintType}</td>
                      <td>{value.PriorityLevel}</td>
                      <td>{value.DateFilled}</td>
                      <td>{value.ContactNo}</td>
                      <td>
                        <select
                          className="form-select"
                          value={value.status}
                          onChange={(e) => updateStatus(value._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteComplaint(value._id)}
                        >
                          Clear Complaint
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No complaints available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default ComplaintList;