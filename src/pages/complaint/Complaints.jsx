import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import NavBar from '../../Components/Layout/NavBar';
import { Link } from 'react-router-dom';

const Complaints = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        ComplaintType: "",
        PriorityLevel: "Select",
        DateFilled: "",
        ContactNo: ""
    });

    const [errors, setErrors] = useState({});

    const inputHandler = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!data.name.trim()) newErrors.name = "Name is required";
        if (!data.ComplaintType.trim()) newErrors.ComplaintType = "Complaint is required";
        if (!data.PriorityLevel || data.PriorityLevel === "Select") newErrors.PriorityLevel = "Please select a priority level";
        if (!data.DateFilled) newErrors.DateFilled = "Date is required";
        if (!data.ContactNo.trim()) {
            newErrors.ContactNo = "Contact No is required";
        } else if (!/^\d{10}$/.test(data.ContactNo)) {
            newErrors.ContactNo = "Contact No must be 10 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Submitted Complaint Data:", data);
            axios.post("http://localhost:7000/complaints", data,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
              })
                .then((response) => {
                    console.log(response);
                    if (response.data.status === "success") {
                        alert("Complaint Submitted Successfully!");
                        setData({
                            name: "",
                            ComplaintType: "",
                            PriorityLevel: "Select",
                            DateFilled: "",
                            ContactNo: ""
                        });
                        setErrors({});
                    } else {
                        alert("Error in submission.");
                    }
                })
                .catch((error) => {
                    console.error("Error submitting complaint:", error);
                });
        }
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
            <div className="container mt-5">
                <h1 style={headerStyle}>Complaints Form</h1> {/* Header with headerStyle applied */}
                <div className="card p-4 shadow">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" value={data.name} onChange={inputHandler} />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Complaint</label>
                            <input type="text" className="form-control" name="ComplaintType" value={data.ComplaintType} onChange={inputHandler} />
                            {errors.ComplaintType && <span className="text-danger">{errors.ComplaintType}</span>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Priority Level</label>
                            <select className="form-select" name="PriorityLevel" value={data.PriorityLevel} onChange={inputHandler}>
                                <option value="Select">Select</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            {errors.PriorityLevel && <span className="text-danger">{errors.PriorityLevel}</span>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Date Filed</label>
                            <input type="date" className="form-control" name="DateFilled" value={data.DateFilled} onChange={inputHandler} />
                            {errors.DateFilled && <span className="text-danger">{errors.DateFilled}</span>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Contact No</label>
                            <input type="text" className="form-control" name="ContactNo" value={data.ContactNo} onChange={inputHandler} />
                            {errors.ContactNo && <span className="text-danger">{errors.ContactNo}</span>}
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <button 
                                className="btn btn-purple" 
                                style={{ backgroundColor: 'purple', color: 'white' }} 
                                onClick={() => navigate('/user/complaint')}>
                                View Complaints
                            </button>
                        </div>
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

export default Complaints;