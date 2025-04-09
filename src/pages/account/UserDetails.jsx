import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../../Components/Layout/NavBar";
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

          

const UserDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
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

      setUser(response.data.user);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to fetch user details. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>{error}</p>;

  // Styles
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "0",
    fontFamily: "'Poppins', sans-serif",
  };

  const headerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px 0",
    width: "100%",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const profileCardStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "30px",
    width: "400px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    margin: "20px 0",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const avatarStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #ddd",
    marginBottom: "20px",
    transition: "transform 0.3s ease",
  };

  const userNameStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "10px 0",
    color: "#333",
  };

  const userInfoStyle = {
    fontSize: "16px",
    color: "#555",
    margin: "5px 0",
  };

  const buttonContainerStyle = {
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
    fontSize: "16px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  };

  const footerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    width: "100%",
    marginTop: "auto",
  };

  const linkStyle = {
    color: "#4CAF50",
    textDecoration: "none",
    transition: "color 0.3s ease",
  };

  return (
    <div style={pageStyle}>
      <div style={{ width: "100%" }}>
        <NavBar />
      </div>

      <h1 style={headerStyle}> Profile</h1>

      <div
        style={profileCardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
        }}
      >
        <div>
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="User Avatar"
            style={avatarStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
        <div>
          <h2 style={userNameStyle}>{user?.name}</h2>
          <p style={userInfoStyle}>
            <strong>Email:</strong> {user?.email}
          </p>
          <p style={userInfoStyle}>
            <strong>Phone No:</strong> {user?.phone}
          </p>
          <p style={userInfoStyle}>
            <strong>Gender:</strong> {user?.gender}
          </p>
        </div>

        <div style={buttonContainerStyle}>
          <Link
            to="/uorder"
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#388e3c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
          >
            Your Orders
          </Link>
          <Link
            to="/ucom"
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#388e3c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
          >
            Your Complaints
          </Link>
        </div>
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

export default UserDetails;