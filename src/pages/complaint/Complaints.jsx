import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../../Components/Layout/NavBar';
import NavSeller from '../../Components/Layout/NavSeller';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for footer navigation

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
            <footer style={styles.footer}>
                <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
                <p>
                    Follow us on
                    <a href="https://facebook.com" style={styles.link}> Facebook</a>,
                    <a href="https://instagram.com" style={styles.link}> Instagram</a>, and
                    <a href="https://twitter.com" style={styles.link}> Twitter</a>.
                </p>
                <p>
                    <Link to="/contact" style={styles.link}>Contact Us</Link> |
                    <Link to="/about" style={styles.link}> About Us</Link>
                </p>
            </footer>
        </div>
    );
};

export default Complaints;