import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../../Components/Layout/NavBar';
import NavSeller from '../../Components/Layout/NavSeller';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for footer navigation
  import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

      

const Complaints = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        complaint: "",
        resolutionRequest: "Immediate Investigation",
        image: null
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    const inputHandler = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const fileHandler = (event) => {
        setData({
            ...data,
            image: event.target.files[0]
        });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!data.name.trim()) newErrors.name = "Name is required";
        if (!data.email.trim()) newErrors.email = "Email is required";
        if (!data.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        if (!data.complaint.trim()) newErrors.complaint = "Complaint is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("phoneNumber", data.phoneNumber);
            formData.append("complaint", data.complaint);
            formData.append("resolutionRequest", data.resolutionRequest);
            if (data.image) {
                formData.append("image", data.image);
            }

            axios.post("http://localhost:7000/complaints", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                if (response.data.status === "success") {
                    alert("Complaint Submitted Successfully!");
                    setData({
                        name: "",
                        email: "",
                        phoneNumber: "",
                        complaint: "",
                        resolutionRequest: "Immediate Investigation",
                        image: null
                    });
                    setErrors({});
                } else {
                    alert("Error in submission.");
                }
            }).catch((error) => {
                console.error("Error submitting complaint:", error);
            });
        }
    };

    // Styles
    const styles = {
        footer: {
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            padding: '20px',
            marginTop: '30px',
        },
        link: {
            color: '#4caf50',
            textDecoration: 'none',
        },
    };

    const headerStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
        textAlign: "center",
        padding: "20px",
        borderRadius: "10px",
        margin: "20px 0",
    };

    return (
        <div>
            <NavSeller />
            <div className="container mt-4">
                <h1 style={headerStyle}>Complaints Form</h1>
                {/* Add a button to navigate to /user/complaint */}
                <div className="text-end mb-3">
                    <button 
                        className="btn btn-primary" 
                        onClick={() => navigate("/user/complaint")}
                    >
                        View Your Own Complaints
                    </button>
                </div>
                <div className="card p-4 shadow">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" value={data.name} onChange={inputHandler} />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" value={data.email} onChange={inputHandler} />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone Number</label>
                            <input type="text" className="form-control" name="phoneNumber" value={data.phoneNumber} onChange={inputHandler} />
                            {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Complaint</label>
                            <textarea className="form-control" name="complaint" value={data.complaint} onChange={inputHandler} />
                            {errors.complaint && <span className="text-danger">{errors.complaint}</span>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Resolution Request</label>
                            <select className="form-select" name="resolutionRequest" value={data.resolutionRequest} onChange={inputHandler}>
                                <option value="Immediate Investigation">Immediate Investigation</option>
                                <option value="Refund/Compensation">Refund/Compensation</option>
                                <option value="Account Reinstatement">Account Reinstatement</option>
                                <option value="Listing Correction">Listing Correction</option>
                                <option value="Technical Support">Technical Support</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Upload Image</label>
                            <input type="file" className="form-control" name="image" onChange={fileHandler} />
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
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

export default Complaints;