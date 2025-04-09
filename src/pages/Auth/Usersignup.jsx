import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


const Usersignup = () => {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    console.log(data);
    readValue(data);
  };

  const readValue = (data) => {
    if (data.password !== data.cpassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:7000/signup", data)
      .then((response) => {
        if (response.data.status === "SIGNUP") {
          alert("Registration successful");
        } else {
          alert("Registration failed");
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  // Footer Styles
  const styles = {
    footer: {
      backgroundColor: "black",
      color: "white",
      textAlign: "center",
      padding: "20px",
      marginTop: "auto",
      width: "100%",
    },
    link: {
      color: "white",
      textDecoration: "none",
      margin: "0 5px",
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <div
        style={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "90%",
          maxWidth: "1200px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          margin: "auto",
          flex: "1",
          padding: "20px",
        }}
      >
        {/* Left Side (60%) - Signup Form */}
        <div style={{ flex: "60%", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Signup</h1>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "bold" }}>Name</label>
              <input
                type="text"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                {...register("name", { required: "This field is required" })}
                placeholder="Enter your name"
              />
              {errors?.name?.message && (
                <span style={{ color: "red", fontSize: "14px" }}>{errors?.name?.message}</span>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "bold" }}>Email</label>
              <input
                type="text"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email",
                  },
                })}
                placeholder="Enter your email"
              />
              {errors?.email?.message && (
                <span style={{ color: "red", fontSize: "14px" }}>{errors?.email?.message}</span>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "bold" }}>Phone</label>
              <input
                type="text"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: { value: 10, message: "Min 10 numbers required" },
                })}
                placeholder="Enter your phone number"
              />
              {errors?.phone?.message && (
                <span style={{ color: "red", fontSize: "14px" }}>{errors?.phone?.message}</span>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "bold" }}>Gender</label>
              <select
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                {...register("gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "bold" }}>User Type</label>
              <select
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                {...register("usertype", { required: "User type is required" })}
              >
                <option value="">Select User Type</option>
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
              </select>
              {errors?.usertype?.message && (
                <span style={{ color: "red", fontSize: "14px" }}>{errors?.usertype?.message}</span>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "bold" }}>Password</label>
              <input
                type="password"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 5, message: "Min 5 characters" },
                })}
                placeholder="Enter your password"
              />
              {errors?.password?.message && (
                <span style={{ color: "red", fontSize: "14px" }}>{errors?.password?.message}</span>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "bold" }}>Confirm Password</label>
              <input
                type="password"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                {...register("cpassword", {
                  required: "Confirm password is required",
                  minLength: { value: 5, message: "Min 5 characters" },
                  validate: (value) => {
                    return value === password.current || "The passwords do not match";
                  },
                })}
                placeholder="Confirm your password"
              />
              {errors?.cpassword?.message && (
                <span style={{ color: "red", fontSize: "14px" }}>{errors?.cpassword?.message}</span>
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
                REGISTER
              </button>
            </div>
          </form>
        </div>

        {/* Right Side (40%) - Login Section */}
        <div
          style={{
            flex: "40%",
            backgroundColor: "#28a745",
            padding: "20px",
            borderRadius: "0 10px 10px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Already Have an Account?</h2>
          <p style={{ fontSize: "16px", marginBottom: "20px", textAlign: "center" }}>
            Login to access your account and explore more features.
          </p>
          <Link
            to="/login"
            style={{
              backgroundColor: "#fff",
              color: "#28a745",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
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

export default Usersignup;