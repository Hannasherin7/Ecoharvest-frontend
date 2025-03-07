import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../Components/Layout/NavBar";
import { Link } from 'react-router-dom';

const Owncomplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:7000/ownComplaint", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log("Fetched Data:", response.data); // <-- Console log here
        if (response.data.status === "success") {
          setComplaints(response.data.complaints);
        } else {
          console.error("Error in API response:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
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
      <NavBar />
      <div className="container">
        <h1 style={headerStyle}>Your Complaints</h1> {/* Header with headerStyle applied */}
        <div className="row">
          <div className="col">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Complaint</th>
                  <th>Priority Level</th>
                  <th>Date Filed</th>
                  <th>Contact No</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((comp) => (
                    <tr key={comp._id}>
                      <td>{comp.name}</td>
                      <td>{comp.ComplaintType}</td>
                      <td>{comp.PriorityLevel}</td>
                      <td>{comp.DateFilled}</td>
                      <td>{comp.ContactNo}</td>
                      <td>{comp.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
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

export default Owncomplaint;