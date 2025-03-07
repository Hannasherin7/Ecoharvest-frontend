import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Layout/NavBar";
import { Link } from 'react-router-dom';

const UserDetails = () => {
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
      <NavBar />
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
          <Link to="/uorder" style={buttonStyle}>
            User Orders
          </Link>
         
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

export default UserDetails;