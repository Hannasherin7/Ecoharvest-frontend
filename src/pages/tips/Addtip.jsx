import axios from 'axios';
import React, { useState } from 'react';
import NavBar from '../../Components/Layout/NavBar';
import { Link } from 'react-router-dom'; // Import Link for footer navigation
  import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

      

export const Addtip = () => {
    const [data, setData] = useState({
        item: "",
        tip: "",
        imaget: null, // Store the file as an object
    });

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const fileHandler = (event) => {
        setData({ ...data, imaget: event.target.files[0] });
    };

    const readValue = () => {
        if (!data.item || !data.tip || !data.imaget) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("item", data.item);
        formData.append("tip", data.tip);
        formData.append("imaget", data.imaget);

        axios.post("http://localhost:7000/addtip", formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Successfully added");
                    setData({ item: "", tip: "", imaget: null });
                } else {
                    alert("Error");
                }
            })
            .catch((error) => {
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
                <h1 style={headerStyle}>Add Tip</h1> {/* Header with headerStyle applied */}
                <div className="row">
                    <div className="col col-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Image</label>
                                <input type="file" className="form-control" onChange={fileHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Item</label>
                                <input type="text" className="form-control" name='item' value={data.item} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Tip</label>
                                <input type="text" className="form-control" name='tip' value={data.tip} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
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
