import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for footer navigation
import NavBar from '../Components/Layout/NavBar';

export const AddProduct = () => {
    const [data, setData] = useState({
        image: null, // Change to file object
        pname: "",
        discription: "",
        price: "",
        quantity: "",
        category: "", // Category will now be selected from a dropdown
        details: "" // New field for product details
    });

    const [message, setMessage] = useState(""); 

    const inputHandler = (event) => {
        if (event.target.name === "image") {
            setData({ ...data, image: event.target.files[0] });
        } else {
            setData({ ...data, [event.target.name]: event.target.value });
        }
    };

    const readValue = async () => {
        const { image, pname, discription, price, quantity, category, details } = data;
        if (!image || !pname || !discription || !price || !quantity || !category || !details) {
            setMessage("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("pname", pname);
        formData.append("discription", discription);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("category", category);
        formData.append("details", details); // Append product details to form data

        try {
            const response = await axios.post("http://localhost:7000/addpro", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(response.data);
            if (response.data.status === "success") {
                setMessage("Product successfully added");
                setData({ 
                    image: null, 
                    pname: "", 
                    discription: "", 
                    price: "", 
                    quantity: "", 
                    category: "", 
                    details: "" // Reset product details field
                }); 
            } else {
                setMessage("Error adding product");
            }
        } catch (error) {
            console.log(error.message);
            setMessage("An error occurred");
        }
    };

    // Updated page style without background image
    const pageStyle = {
        padding: '20px',
        minHeight: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between' // Space between header, content, and footer
    };

    const inputStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '15px',
        width: '100%' // Ensure inputs are full width
    };

    const dropdownStyle = {
        marginBottom: '20px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        color: 'black' // Dropdown text color
    };

    const styles = {
        header: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            textAlign: "center",
            padding: "20px",
            borderRadius: "10px",
            margin: "20px",
        },
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

    // Dropdown options for category
    const categories = [
        "Fruits",
        "Vegetables",
        "Meat and Poultry",
        "Dairy Products",
        "Grains and Legumes",
        "Processed Foods",
        "Non-Food Items"
    ];

    return (
        <div style={pageStyle}>
            <NavBar />
            <h1 style={styles.header}>Sell Your Product</h1>
            <div style={dropdownStyle}>
                <label htmlFor="navigation"></label>
                <select 
                    id="navigation" 
                    onChange={(e) => {
                        if (e.target.value) {
                            window.location.href = e.target.value;
                        }
                    }}
                    style={{ marginLeft: '10px' }}
                >
                    <option value="">View Your Products</option>
                    <option value="/viewpro">View Products</option>
                </select>
            </div>

            {/* Feedback Message */}
            {message && <div className="alert alert-info">{message}</div>}

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            {Object.keys(data).map((key) => (
                                <div className="col-sm-6" key={key}>
                                    <label className="form-label">
                                        {key === 'pname' ? 'Product Name' : 
                                         key === 'discription' ? 'Description' : 
                                         key.charAt(0).toUpperCase() + key.slice(1)}
                                    </label>
                                    {key === 'category' ? (
                                        <select
                                            className="form-control"
                                            name={key}
                                            value={data[key]}
                                            onChange={inputHandler}
                                            style={inputStyle}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    ) : key === 'image' ? (
                                        <input 
                                            type="file"
                                            className="form-control"
                                            name={key}
                                            onChange={inputHandler}
                                            style={inputStyle}
                                            accept="image/*"
                                        />
                                    ) : key === 'details' ? (
                                        <textarea
                                            className="form-control"
                                            name={key}
                                            value={data[key]}
                                            onChange={inputHandler}
                                            style={inputStyle}
                                            placeholder="Enter product details"
                                            rows="4"
                                        />
                                    ) : (
                                        <input 
                                            type={key === 'price' || key === 'quantity' ? 'number' : 'text'} 
                                            className="form-control" 
                                            name={key} 
                                            value={data[key]} 
                                            onChange={inputHandler} 
                                            style={inputStyle} 
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="col-12">
                                <br /><button onClick={readValue} className="btn btn-success">ADD PRODUCT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={styles.footer}>
                <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
                <p>
                    Follow us on
                    <a href="https://facebook.com" style={styles.link}>
                        {" "}
                        Facebook
                    </a>
                    ,
                    <a href="https://instagram.com" style={styles.link}>
                        {" "}
                        Instagram
                    </a>
                    , and
                    <a href="https://twitter.com" style={styles.link}>
                        {" "}
                        Twitter
                    </a>
                    .
                </p>
                <p>
                    <Link to="/contact" style={styles.link}>
                        Contact Us
                    </Link>{" "}
                    |
                    <Link to="/about" style={styles.link}>
                        {" "}
                        About Us
                    </Link>
                </p>
            </footer>
        </div>
    );
};