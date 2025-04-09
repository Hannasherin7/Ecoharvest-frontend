import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Components/Layout/NavBar";
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Owntip = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetchUserTips();
  }, []);

  // Function to fetch the logged-in user's tips
  const fetchUserTips = async () => {
    try {
      const response = await axios.get("http://localhost:7000/usertips", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTips(response.data.tips);
    } catch (error) {
      console.error("Error fetching tips:", error);
      alert("Failed to load tips.");
    }
  };

  // Function to delete a tip
  const deleteTip = async (tipId) => {
    if (window.confirm("Are you sure you want to delete this tip?")) {
      try {
        const response = await axios.post(
          "http://localhost:7000/deletetip",
          { tipId }, // Send tipId in the request body
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        if (response.data.status === "success") {
          alert("Tip deleted successfully");
          fetchUserTips(); // Refresh tips after deletion
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting tip:", error);
        alert("Failed to delete tip.");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h2 className="text-center">My Added Tips</h2>

        {tips.length === 0 ? (
          <p className="text-center">No tips added yet.</p>
        ) : (
          <div className="row">
            {tips.map((tip) => (
              <div key={tip._id} className="col-md-4">
                <div className="card p-3">
                  <img
                    src={`http://localhost:7000/${tip.imaget.replace(
                      /^\//,
                      ""
                    )}`}
                    alt={tip.item}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <h4>{tip.item}</h4>
                  <p>{tip.tip}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTip(tip._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

<footer style={{
            backgroundColor: "#2c3e50",
            color: "#ecf0f1",
            padding: "50px 0 20px",
            marginTop: "50px"
          }}>
            <div className="container">
              <div className="row">
                <div className="col-md-4 mb-4">
                  <h5 style={{ 
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    EcoHarvest
                  </h5>
                  <p style={{ lineHeight: "1.6" }}>
                    Bringing people together through the joy of organic living and sharing high-quality products from around the world.
                  </p>
                </div>
                <div className="col-md-2 mb-4">
                  <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Explore</h6>
                  <ul style={{ listStyle: "none", padding: "0" }}>
                    <li style={{ marginBottom: "8px" }}><Link to="/" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Home</Link></li>
                    <li style={{ marginBottom: "8px" }}><Link to="/productlist" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Products</Link></li>
                    <li style={{ marginBottom: "8px" }}><Link to="/about" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>About</Link></li>
                    <li style={{ marginBottom: "8px" }}><Link to="/contact" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Contact</Link></li>
                  </ul>
                </div>
                <div className="col-md-3 mb-4">
                  <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Legal</h6>
                  <ul style={{ listStyle: "none", padding: "0" }}>
                    <li style={{ marginBottom: "8px" }}>Eco-friendly Commitment</li>
                    <li style={{ marginBottom: "8px" }}>Sustainability Policy</li>
                    <li style={{ marginBottom: "8px" }}>Organic Certification</li>
                  </ul>
                </div>
                <div className="col-md-3 mb-4">
                  <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Connect With Us</h6>
                  <div className="social-icons" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                    <a href="https://facebook.com" style={{ color: "#bdc3c7", marginRight: "15px", ":hover": { color: "#3b5998" } }}><FaFacebook /></a>
                    <a href="https://instagram.com" style={{ color: "#bdc3c7", marginRight: "15px", ":hover": { color: "#e4405f" } }}><FaInstagram /></a>
                    <a href="https://twitter.com" style={{ color: "#bdc3c7", ":hover": { color: "#1da1f2" } }}><FaTwitter /></a>
                  </div>
                 
                  
                </div>
              </div>
              <hr style={{ borderColor: "#34495e", margin: "20px 0" }} />
              <div className="text-center" style={{ fontSize: "0.9rem" }}>
                <p style={{ margin: "0" }}>
                  &copy; {new Date().getFullYear()} EcoHarvest. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
    </div>
  );
};

export default Owntip;