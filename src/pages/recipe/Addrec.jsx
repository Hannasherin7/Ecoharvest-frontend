import axios from 'axios';
import React, { useState } from 'react';
import NavBar from '../../Components/Layout/NavBar';
import { Link } from 'react-router-dom'; // Import Link for footer navigation
  import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

      

export const Addrec = () => {
    const [data, setData] = useState({
        imager: null, // Store file
        incredientsr: "",
        titler: "",
        descriptionr: "",
        typer: "Veg" // Default value for dropdown
    });

    const inputHandler = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file") {
            setData({ ...data, [name]: files[0] }); // Store file object
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const readValue = () => {
        console.log("Form Data: ", data);

        // Create FormData object to send file and other details
        const formData = new FormData();
        formData.append("imager", data.imager);
        formData.append("incredientsr", data.incredientsr);
        formData.append("titler", data.titler);
        formData.append("descriptionr", data.descriptionr);
        formData.append("typer", data.typer);

        axios.post("http://localhost:7000/addrec", formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then(response => {
            console.log(response.data);
            if (response.data.status === "success") {
                alert("Successfully added");
                setData({
                    imager: null,
                    incredientsr: "",
                    titler: "",
                    descriptionr: "",
                    typer: "Veg"
                });
            } else {
                alert("Error");
            }
        }).catch(error => {
            console.log(error.message);
            alert(error.message);
        });
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
            <NavBar />
            <div className="container mt-4">
                <h1 style={headerStyle}>UPLOAD YOUR RECIPE</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            {/* Input fields */}
                            <div className="col-md-6">
                                <label htmlFor="imager" className="form-label">Image</label>
                                <input type="file" className="form-control" name='imager' onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="incredientsr" className="form-label">Ingredients</label>
                                <input type="text" className="form-control" name='incredientsr' value={data.incredientsr} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="titler" className="form-label">Title</label>
                                <input type="text" className="form-control" name='titler' value={data.titler} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="descriptionr" className="form-label">Description</label>
                                <input type="text" className="form-control" name='descriptionr' value={data.descriptionr} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="typer" className="form-label">Type</label>
                                <select className="form-control" name="typer" value={data.typer} onChange={inputHandler}>
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <br /><br />
                                <button onClick={readValue} className="btn btn-success">ADD</button>
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
