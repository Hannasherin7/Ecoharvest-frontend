import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/Layout/NavBar";
import { Link } from 'react-router-dom';
import Select from 'react-select'; // Import react-select
import NavSeller from "../Components/Layout/NavSeller";
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


const Fconfirmation = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        productype: [], // Changed to array for multiple selections
        category: [], // Single category (for Organic Product)
        seedcategory: [], // Multiple seed categories (for Seeds)
        fertilizercategory: [], // Multiple fertilizer categories (for Fertilizers)
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

    // Product type options with "All" option
    const productTypeOptions = [
        { value: "All", label: "All" },
        { value: "Organic Product", label: "Organic Product" },
        { value: "Seeds", label: "Seeds" },
        { value: "Fertilizers", label: "Fertilizers" },
    ];

    // Categories for Organic Product with "All" option
    const categoryOptions = [
        { value: "All", label: "All" },
        { value: "Fruits", label: "Fruits" },
        { value: "Vegetables", label: "Vegetables" },
        { value: "Meat and Poultry", label: "Meat and Poultry" },
        { value: "Dairy Products", label: "Dairy Products" },
        { value: "Grains and Legumes", label: "Grains and Legumes" },
        { value: "Processed Foods", label: "Processed Foods" },
        { value: "Non-Food Items", label: "Non-Food Items" },
    ];

    // Seed categories for Seeds with "All" option
    const seedCategoryOptions = [
        { value: "All", label: "All" },
        { value: "Vegetable Seed", label: "Vegetable Seed" },
        { value: "Fruite Seed", label: "Fruite Seed" },
        { value: "Flower Seed", label: "Flower Seed" },
        { value: "Field Crop Seed", label: "Field Crop Seed" },
        { value: "Oil Seeds Crop", label: "Oil Seeds Crop" },
        { value: "Fodder Crop", label: "Fodder Crop" },
    ];

    // Fertilizer categories for Fertilizers with "All" option
    const fertilizerCategoryOptions = [
        { value: "All", label: "All" },
        { value: "Organic Fertilizers", label: "Organic Fertilizers" },
        { value: "Synthetic (Inorganic) Fertilizers", label: "Synthetic (Inorganic) Fertilizers" },
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
                        // Ensure productype is an array
                        const userDetails = response.data.userDetails;
                        userDetails.productype = Array.isArray(userDetails.productype) ? userDetails.productype : [userDetails.productype];
                        setUserDetails(userDetails);

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

    // Handle multiple product type selections
    const handleProductTypeChange = (selectedOptions) => {
        setData({ 
            ...data, 
            productype: selectedOptions.map(option => option.value),
        });
    };

    // Handle category selections
    const handleCategoryChange = (selectedOptions) => {
        setData({ ...data, category: selectedOptions.map(option => option.value) });
    };

    // Handle seed category selections
    const handleSeedCategoryChange = (selectedOptions) => {
        setData({ ...data, seedcategory: selectedOptions.map(option => option.value) });
    };

    // Handle fertilizer category selections
    const handleFertilizerCategoryChange = (selectedOptions) => {
        setData({ ...data, fertilizercategory: selectedOptions.map(option => option.value) });
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
        formData.append("productype", JSON.stringify(data.productype)); // Send product type as JSON
        formData.append("category", JSON.stringify(data.category)); // Send category as JSON
        formData.append("seedcategory", JSON.stringify(data.seedcategory)); // Send seedcategory as JSON
        formData.append("fertilizercategory", JSON.stringify(data.fertilizercategory)); // Send fertilizercategory as JSON
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
                    productype: [], // Reset product type
                    category: [], // Reset category
                    seedcategory: [], // Reset seedcategory
                    fertilizercategory: [], // Reset fertilizercategory
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
            <NavSeller/>
            <h1 style={headerStyle}>Seller Registration</h1> {/* Header with headerStyle applied */}

            {isRegistered && userDetails ? (
                <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
                    <h3>Registration Details</h3>
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Phone:</strong> {userDetails.phone}</p>
                    <p><strong>Product Type:</strong> {Array.isArray(userDetails.productype) ? userDetails.productype.join(", ") : userDetails.productype}</p>
                    <p><strong>Organic Product Category:</strong> {Array.isArray(userDetails.category) ? userDetails.category.join(", ") : userDetails.category}</p>
                    <p><strong>Seed Category:</strong> {Array.isArray(userDetails.seedcategory) ? userDetails.seedcategory.join(", ") : userDetails.seedcategory}</p>
                    <p><strong>Fertilizer Category:</strong> {Array.isArray(userDetails.fertilizercategory) ? userDetails.fertilizercategory.join(", ") : userDetails.fertilizercategory}</p>
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

                    {/* Product Type Dropdown (Multiple Selection) */}
                    <Select
                        name="productype"
                        options={productTypeOptions}
                        value={productTypeOptions.filter((option) => data.productype.includes(option.value))}
                        onChange={handleProductTypeChange}
                        placeholder="Select Product Type"
                        isMulti
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

                    {/* Category Dropdown (Conditional Rendering) */}
                    {data.productype.includes("Organic Product") && (
                        <Select
                            name="category"
                            options={categoryOptions}
                            value={categoryOptions.filter((option) => data.category.includes(option.value))}
                            onChange={handleCategoryChange}
                            placeholder="Select Categories"
                            isMulti
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
                    )}

                    {/* Seed Category Dropdown (Conditional Rendering) */}
                    {data.productype.includes("Seeds") && (
                        <Select
                            name="seedcategory"
                            options={seedCategoryOptions}
                            value={seedCategoryOptions.filter((option) => data.seedcategory.includes(option.value))}
                            onChange={handleSeedCategoryChange}
                            placeholder="Select Seed Categories"
                            isMulti
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
                    )}

                    {/* Fertilizer Category Dropdown (Conditional Rendering) */}
                    {data.productype.includes("Fertilizers") && (
                        <Select
                            name="fertilizercategory"
                            options={fertilizerCategoryOptions}
                            value={fertilizerCategoryOptions.filter((option) => data.fertilizercategory.includes(option.value))}
                            onChange={handleFertilizerCategoryChange}
                            placeholder="Select Fertilizer Categories"
                            isMulti
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
                    )}

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

export default Fconfirmation;