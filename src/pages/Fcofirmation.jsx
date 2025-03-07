import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/Layout/NavBar";
import { Link } from 'react-router-dom';
import Select from 'react-select'; // Import react-select

const Fconfirmation = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        category: "", // Single category
        idProof: null,
        termsAccepted: false,
    });

    const [message, setMessage] = useState("");
    const [showTerms, setShowTerms] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");

    const navigate = useNavigate();

    // Categories for the dropdown
    const categories = [
        { value: "Fruits", label: "Fruits" },
        { value: "Vegetables", label: "Vegetables" },
        { value: "Meat and Poultry", label: "Meat and Poultry" },
        { value: "Dairy Products", label: "Dairy Products" },
        { value: "Grains and Legumes", label: "Grains and Legumes" },
        { value: "Processed Foods", label: "Processed Foods" },
        { value: "Non-Food Items", label: "Non-Food Items" },
        { value: "All", label: "All" },
    ];

    useEffect(() => {
        const checkIfRegistered = async () => {
            const userId = localStorage.getItem("userid");
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:7000/user/check-registration/${userId}`);
                    console.log("API Response:", response.data);

                    if (response.data.isRegistered) {
                        setIsRegistered(true);
                        setUserDetails(response.data.userDetails);

                        const statusResponse = await axios.get(`http://localhost:7000/user/status/${userId}`);
                        setStatus(statusResponse.data.status);
                    } else {
                        setIsRegistered(false);
                    }
                } catch (error) {
                    console.error("Error checking registration:", error);
                    setIsRegistered(false);
                }
            } else {
                setIsRegistered(false);
            }
            setLoading(false);
        };

        checkIfRegistered();
    }, []);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (selectedOption) => {
        setData({ ...data, category: selectedOption.value });
    };

    const handleFileChange = (e) => {
        setData({ ...data, idProof: e.target.files[0] });
    };

    const handleAcceptTerms = () => {
        setData({ ...data, termsAccepted: true }); // Set termsAccepted to true
        setShowTerms(false); // Close the modal
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.termsAccepted) {
            setMessage("You must accept the terms and conditions.");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("category", data.category); // Send single category
        formData.append("idProof", data.idProof);
        formData.append("termsAccepted", data.termsAccepted);
        formData.append("user", localStorage.getItem("userid"));
        formData.append("status", "pending");

        try {
            const response = await axios.post('http://localhost:7000/register-farmer', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log("Registration Response:", response.data);

            if (response.status === 201 && response.data.status === "success") {
                setIsRegistered(true);
                setMessage("Registration Successful! Waiting for admin's approval.");
                setData({
                    name: "",
                    email: "",
                    phone: "",
                    category: "", // Reset category field
                    idProof: null,
                    termsAccepted: false,
                });
            } else {
                setMessage(response.data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Error registering farmer:", error);
            setMessage("Error registering farmer.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

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
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <NavBar />
            <h1 style={headerStyle}>Farmer Registration</h1> {/* Header with headerStyle applied */}

            {isRegistered && userDetails ? (
                <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
                    <h3>Registration Details</h3>
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Phone:</strong> {userDetails.phone}</p>
                    <p><strong>Category:</strong> {userDetails.category}</p> {/* Display single category */}
                    <p><strong>ID Proof:</strong> <a href={`http://localhost:7000${userDetails.idProof}`} target="_blank" rel="noopener noreferrer">View</a></p>
                    <p><strong>Status:</strong> {status}</p>

                    {status === "approved" && (
                        <button 
                            onClick={() => navigate("/addpro")}
                            style={{ 
                                backgroundColor: "#4CAF50", 
                                color: "#fff", 
                                border: "none", 
                                padding: "10px 20px", 
                                borderRadius: "5px", 
                                cursor: "pointer", 
                                marginTop: "10px" 
                            }}
                        >
                            Sell Your Product
                        </button>
                    )}

                    {status === "rejected" && (
                        <p style={{ color: "red", marginTop: "10px" }}>
                            Sorry, your registration was rejected.
                        </p>
                    )}

                    {status === "pending" && (
                        <p style={{ color: "orange", marginTop: "10px" }}>
                            Waiting for admin's approval.
                        </p>
                    )}
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto", background: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                    <input type="text" name="name" placeholder="Name" value={data.name} onChange={handleChange} required style={{ marginBottom: "10px", width: "100%", padding: "8px" }} />
                    <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required style={{ marginBottom: "10px", width: "100%", padding: "8px" }} />
                    <input type="text" name="phone" placeholder="Phone" value={data.phone} onChange={handleChange} required style={{ marginBottom: "10px", width: "100%", padding: "8px" }} />

                    {/* Single-Select Category Dropdown */}
                    <Select
                        name="category"
                        options={categories}
                        value={categories.find((cat) => cat.value === data.category)}
                        onChange={handleCategoryChange}
                        placeholder="Select Category"
                        required
                        styles={{
                            control: (base) => ({
                                ...base,
                                marginBottom: "10px",
                                padding: "8px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }),
                        }}
                    />

                    <input type="file" name="idProof" onChange={handleFileChange} required style={{ marginBottom: "10px" }} />

                    <div style={{ marginBottom: "10px" }}>
                        <button 
                            type="button" 
                            onClick={() => setShowTerms(true)} 
                            style={{ 
                                backgroundColor: "#007BFF", 
                                color: "#fff", 
                                border: "none", 
                                padding: "10px", 
                                borderRadius: "5px", 
                                cursor: "pointer", 
                                marginBottom: "10px" 
                            }}
                        >
                            View Terms and Conditions
                        </button>
                    </div>

                    <button 
                        type="submit" 
                        disabled={!data.termsAccepted} 
                        style={{ 
                            backgroundColor: data.termsAccepted ? "#4CAF50" : "#ccc", 
                            color: "#fff", 
                            border: "none", 
                            padding: "10px", 
                            borderRadius: "5px", 
                            cursor: data.termsAccepted ? "pointer" : "not-allowed" 
                        }}
                    >
                        Register
                    </button>
                    {message && <p>{message}</p>}
                </form>
            )}

            {showTerms && (
                <div style={{ padding: "20px", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "10px", maxWidth: "600px", margin: "20px auto" }}>
                    <h3>Terms and Conditions</h3>
                    <p>By registering on our platform, you confirm that all products you sell are 100% organic. If you are found selling non-organic products under the organic label, you will face penalties including account suspension and legal consequences.</p>
                    <ul>
                        <li>You must provide genuine ID proof for verification.</li>
                        <li>You must not mislead customers by labeling non-organic products as organic.</li>
                        <li>We reserve the right to inspect and verify your products at any time.</li>
                        <li>Violation of these terms may result in permanent removal from the platform.</li>
                    </ul>
                    <button 
                        onClick={handleAcceptTerms} 
                        style={{ 
                            backgroundColor: "#4CAF50", 
                            color: "#fff", 
                            border: "none", 
                            padding: "10px", 
                            borderRadius: "5px", 
                            cursor: "pointer", 
                            marginRight: "10px" 
                        }}
                    >
                        Accept
                    </button>
                    <button 
                        onClick={() => setShowTerms(false)} 
                        style={{ 
                            backgroundColor: "#f44336", 
                            color: "#fff", 
                            border: "none", 
                            padding: "10px", 
                            borderRadius: "5px", 
                            cursor: "pointer" 
                        }}
                    >
                        Decline
                    </button>
                </div>
            )}
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

export default Fconfirmation;