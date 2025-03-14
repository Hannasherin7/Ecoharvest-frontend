import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/Layout/NavBar';
import NavSeller from '../Components/Layout/NavSeller';

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
            <footer style={{ backgroundColor: "black", color: "white", textAlign: "center", padding: "20px", marginTop: "auto", width: "100%" }}>
                <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
                <p>
                    Follow us on
                    <a href="https://facebook.com" style={{ color: "white", textDecoration: "none", margin: "0 5px" }}>
                        {" "}
                        Facebook
                    </a>
                    ,
                    <a href="https://instagram.com" style={{ color: "white", textDecoration: "none", margin: "0 5px" }}>
                        {" "}
                        Instagram
                    </a>
                    , and
                    <a href="https://twitter.com" style={{ color: "white", textDecoration: "none", margin: "0 5px" }}>
                        {" "}
                        Twitter
                    </a>
                    .
                </p>
                <p>
                    <Link to="/contact" style={{ color: "white", textDecoration: "none", margin: "0 5px" }}>
                        Contact Us
                    </Link>{" "}
                    |
                    <Link to="/about" style={{ color: "white", textDecoration: "none", margin: "0 5px" }}>
                        {" "}
                        About Us
                    </Link>
                </p>
            </footer>
        </div>
    );
};