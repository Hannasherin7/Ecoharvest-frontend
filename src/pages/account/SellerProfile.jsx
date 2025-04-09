import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Layout/NavBar";
import { Link } from 'react-router-dom';
import NavSeller from "../../Components/Layout/NavSeller";
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

         

const SellerProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userprofile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:7000/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);
      setUser(response.data.user);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to fetch user details");
      setLoading(false);
    }
  };

  useEffect(() => {
    userprofile();
  }, []);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>{error}</p>;

  // Styles
  const headerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px 0",
    width: "100%", // Ensure header spans full width
  };

  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    marginTop: 'auto',
    width: '100%', // Ensure footer spans full width
  };

  const linkStyle = {
    color: '#4caf50',
    textDecoration: 'none',
  };

  const pageStyle = {
    minHeight: "100vh",
    padding: "0", // Remove padding to fill the sides
    color: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9", // Light background color
  };

  const profileCard = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
    padding: "20px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    margin: "20px 0", // Add margin for spacing
  };

  const avatarContainer = {
    marginBottom: "20px",
  };

  const avatar = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #ddd",
  };

  const userInfo = {
    textAlign: "center",
    color: "#333",
  };

  const userName = {
    fontSize: "24px",
    color: "#333",
    margin: "10px 0",
  };

  const buttonContainer = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    textDecoration: "none",
  };

  return (
    <div style={pageStyle}>
      <div style={{ width: "100%" }}>
      <NavSeller/>
    </div>
      <h1 style={headerStyle}>User Profile</h1> {/* Header with headerStyle applied */}

      <div style={profileCard}>
        <div style={avatarContainer}>
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="User Avatar"
            style={avatar}
          />
        </div>
        <div>
          <center>
            <h2 style={userName}>Name: {user?.name}</h2>
            <p style={userInfo}>
              <strong>Email:</strong> {user?.email}
            </p>
            <p style={userInfo}>
              <strong>Phone No:</strong> {user?.phone}
            </p>
            <p style={userInfo}>
              <strong>Gender:</strong> {user?.gender}
            </p>
          </center>
        </div>

        {/* Buttons for navigation */}
        <div style={buttonContainer}>
          <Link to={`/soldproducts/${user?._id}`} style={buttonStyle}>
            Sold Products
          </Link>
          <Link to="/rcor" style={buttonStyle}>
            Received Orders
          </Link>
          </div>
      </div>

      {/* Footer */}
      
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

export default SellerProfile;