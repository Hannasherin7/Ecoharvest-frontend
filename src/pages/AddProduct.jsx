import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/Layout/NavBar';
import NavSeller from '../Components/Layout/NavSeller';
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";



export const AddProduct = () => {
    const [data, setData] = useState({
        image: null, // Image file
        pname: "",
        discription: "",
        price: "",
        quantity: "",
        category: "",
        details: "",
        productype: "", // New field for product type
        specialOffers: "", // New field for special offers
        discountPercentage: 0, // New field for discount percentage
        seedcategory: "", // New field for seed category
        fertilizercategory: "", // New field for fertilizer category
        deliveryZones: [] // Array of supported postal codes
    });

    const [postalCode, setPostalCode] = useState("");
    const [message, setMessage] = useState("");

    const inputHandler = (event) => {
        if (event.target.name === "image") {
            setData({ ...data, image: event.target.files[0] }); // Handle file input
        } else {
            setData({ ...data, [event.target.name]: event.target.value });
        }
    };

    const addPostalCode = () => {
        if (postalCode) {
            setData({
                ...data,
                deliveryZones: [...data.deliveryZones, postalCode]
            });
            setPostalCode("");
        }
    };

    const readValue = async () => {
        const { image, pname, discription, price, quantity, category, details, productype, specialOffers, discountPercentage, seedcategory, fertilizercategory, deliveryZones } = data;
        if (!image || !pname || !discription || !price || !quantity || !details || !productype) {
            setMessage("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image); // Append the image file
        formData.append("pname", pname);
        formData.append("discription", discription);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("category", category);
        formData.append("details", details);
        formData.append("productype", productype);
        formData.append("specialOffers", specialOffers);
        formData.append("discountPercentage", discountPercentage);
        formData.append("seedcategory", seedcategory);
        formData.append("fertilizercategory", fertilizercategory);
        formData.append("deliveryZones", JSON.stringify(deliveryZones)); // Append delivery zones

        try {
            const response = await axios.post("http://localhost:7000/addpro", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data" // Required for file upload
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
                    details: "",
                    productype: "",
                    specialOffers: "",
                    discountPercentage: 0,
                    seedcategory: "",
                    fertilizercategory: "",
                    deliveryZones: []
                });
            } else {
                setMessage("Error adding product");
            }
        } catch (error) {
            console.log(error.message);
            setMessage("An error occurred");
        }
    };

    // Dropdown options for product type
    const productTypeOptions = [
        { value: "Organic Product", label: "Organic Product" },
        { value: "Seeds", label: "Seeds" },
        { value: "Fertilizers", label: "Fertilizers" }
    ];

    // Dropdown options for seed category
    const seedCategoryOptions = [
        { value: "Vegetable Seed", label: "Vegetable Seed" },
        { value: "Fruite Seed", label: "Fruite Seed" },
        { value: "Flower Seed", label: "Flower Seed" },
        { value: "Field Crop Seed", label: "Field Crop Seed" },
        { value: "Oil Seeds Crop", label: "Oil Seeds Crop" },
        { value: "Fodder Crop", label: "Fodder Crop" }
    ];

    // Dropdown options for fertilizer category
    const fertilizerCategoryOptions = [
        { value: "Organic Fertilizers", label: "Organic Fertilizers" },
        { value: "Synthetic (Inorganic) Fertilizers", label: "Synthetic (Inorganic) Fertilizers" }
    ];

    // Dropdown options for category (Organic Product)
    const categoryOptions = [
        "Fruits",
        "Vegetables",
        "Meat and Poultry",
        "Dairy Products",
        "Grains and Legumes",
        "Processed Foods",
        "Non-Food Items"
    ];

    return (
        <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <NavSeller />
            <h1 style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", textAlign: "center", padding: "20px", borderRadius: "10px", margin: "20px" }}>Sell Your Product</h1>

            {/* Feedback Message */}
            {message && <div className="alert alert-info">{message}</div>}

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            {/* Product Type Dropdown */}
                            <div className="col-sm-6">
                                <label className="form-label">Product Type</label>
                                <select
                                    className="form-control"
                                    name="productype"
                                    value={data.productype}
                                    onChange={inputHandler}
                                    style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                >
                                    <option value="">Select Product Type</option>
                                    {productTypeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Category Dropdown (Conditional Rendering) */}
                            {data.productype === "Organic Product" && (
                                <div className="col-sm-6">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-control"
                                        name="category"
                                        value={data.category}
                                        onChange={inputHandler}
                                        style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    >
                                        <option value="">Select Category</option>
                                        {categoryOptions.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Seed Category Dropdown (Conditional Rendering) */}
                            {data.productype === "Seeds" && (
                                <div className="col-sm-6">
                                    <label className="form-label">Seed Category</label>
                                    <select
                                        className="form-control"
                                        name="seedcategory"
                                        value={data.seedcategory}
                                        onChange={inputHandler}
                                        style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    >
                                        <option value="">Select Seed Category</option>
                                        {seedCategoryOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Fertilizer Category Dropdown (Conditional Rendering) */}
                            {data.productype === "Fertilizers" && (
                                <div className="col-sm-6">
                                    <label className="form-label">Fertilizer Category</label>
                                    <select
                                        className="form-control"
                                        name="fertilizercategory"
                                        value={data.fertilizercategory}
                                        onChange={inputHandler}
                                        style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    >
                                        <option value="">Select Fertilizer Category</option>
                                        {fertilizerCategoryOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Image Field */}
                            <div className="col-sm-6">
                                <label className="form-label">Product Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange={inputHandler}
                                    style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    accept="image/*"
                                />
                            </div>

                            {/* Other Fields */}
                            {Object.keys(data).map((key) => {
                                if (key === "image" || key === "category" || key === "productype" || key === "seedcategory" || key === "fertilizercategory" || key === "deliveryZones") return null;

                                return (
                                    <div className="col-sm-6" key={key}>
                                        <label className="form-label">
                                            {key === 'pname' ? 'Product Name' :
                                             key === 'discription' ? 'Description' :
                                             key.charAt(0).toUpperCase() + key.slice(1)}
                                        </label>
                                        {key === 'details' ? (
                                            <textarea
                                                className="form-control"
                                                name={key}
                                                value={data[key]}
                                                onChange={inputHandler}
                                                style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                                placeholder="Enter product details"
                                                rows="4"
                                            />
                                        ) : (
                                            <input
                                                type={key === 'price' || key === 'quantity' || key === 'discountPercentage' ? 'number' : 'text'}
                                                className="form-control"
                                                name={key}
                                                value={data[key]}
                                                onChange={inputHandler}
                                                style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                            />
                                        )}
                                    </div>
                                );
                            })}

                            {/* Postal Code Input */}
                            <div className="col-sm-6">
                                <label className="form-label">Postal Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div className="col-12">
                                <button onClick={addPostalCode} className="btn btn-primary">Add Postal Code</button>
                            </div>

                            {/* Display Added Postal Codes */}
                            {data.deliveryZones.length > 0 && (
                                <div className="col-12">
                                    <h4>Added Postal Codes:</h4>
                                    <ul>
                                        {data.deliveryZones.map((code, index) => (
                                            <li key={index}>{code}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Add Product Button */}
                            <div className="col-12">
                                <br />
                                <button onClick={readValue} className="btn btn-success">ADD PRODUCT</button>
                            </div>
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