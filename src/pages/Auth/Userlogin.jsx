import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

            

const Userlogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    readValue(data);
  };

  const readValue = async (data) => {
    try {
      const response = await axios.post("http://localhost:7000/login", data);
      if (response.data.status === "Success") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userid", response.data.userid);
        localStorage.setItem("useremail", response.data.email);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("isAdmin", response?.data?.isAdmin || false);
        localStorage.setItem("usertype", response.data.usertype); // Store usertype in localStorage

        alert("LOGGED IN");

        // Check user type and navigate accordingly
        if (response.data?.isAdmin === true) {
          navigate("/adminhome");
        } else if (response.data.usertype === "seller") {
          navigate("/sellerhome"); // Navigate to seller home if user is a seller
        } else {
          navigate("/userhome"); // Navigate to user home for other users
        }
      } else if (response.data.status === "Error") {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  // Footer Styles
  const styles = {
    footer: {
      backgroundColor: "black",
      color: "white",
      textAlign: "center",
      padding: "20px",
      width: "100%",
    },
    link: {
      color: "white",
      textDecoration: "none",
      margin: "0 5px",
    },
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Go to Home Button */}
      <Link
        to="/"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none",
          fontWeight: "bold",
          zIndex: 1000,
        }}
      >
        Go to Home
      </Link>

      {/* Main Content (Login and New Here? Section) */}
      <div
        style={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flex: "1",
          width: "100%",
          maxWidth: "1200px",
          margin: "auto",
          padding: "20px",
          gap: "20px", // Gap between the two sections
        }}
      >
        {/* Left Side (60%) - Login Form */}
        <div
          style={{
            flex: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "#333", marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>Login to Your Account</h1>
            {errorMessage && (
              <div style={{ color: "red", marginBottom: "15px" }}>
                {errorMessage}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "bold" }}>Email</label>
              <input
                type="text"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span style={{ color: "red", fontSize: "14px" }}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "bold" }}>Password</label>
              <input
                type="password"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters",
                  },
                })}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span style={{ color: "red", fontSize: "14px" }}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Right Side (40%) - New Here? Section */}
        <div
          style={{
            flex: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#28a745",
            borderRadius: "10px",
            color: "#fff",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>New Here?</h2>
          <p style={{ fontSize: "16px", marginBottom: "20px", textAlign: "center" }}>
            Sign up and discover a great amount of new opportunities!
          </p>
          <Link
            to="/signup"
            style={{
              backgroundColor: "#fff",
              color: "#28a745",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Footer (Visible on Scroll) */}
     
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

export default Userlogin;