import { useState } from "react";
import axios from "axios";
import NavSeller from "./Layout/NavSeller"; 
import { Link } from "react-router-dom"; 
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


export default function CropYieldPredictor() {
    const [formData, setFormData] = useState({
        State_Name: "",
        District_Name: "",
        Crop_Year: "",
        Season: "",
        Crop: "",
        Area: ""
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === "Crop_Year" || name === "Area") && value < 0) return;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/predict";  
            const response = await axios.post(API_URL, formData);
            
            if (response.data && response.data.predicted_yield !== undefined) {
                setPrediction(response.data.predicted_yield);
            } else {
                throw new Error("Invalid response from server.");
            }
        } catch (err) {
            console.error("Error fetching prediction:", err);
            setError("⚠️ Failed to fetch prediction. Ensure the backend is running and accessible.");
        }
        setLoading(false);
    };

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
            <NavSeller /> {/* Add NavSeller */}
            <div className="container mt-4">
                <h1 style={headerStyle}>🌾 Crop Yield Prediction</h1>

                <form className="grid grid-cols-2 gap-4 p-4 border rounded-lg shadow-lg bg-white" onSubmit={handleSubmit}>
                    {Object.keys(formData).map((field) => (
                        <input
                            key={field}
                            type={field === "Crop_Year" || field === "Area" ? "number" : "text"}
                            name={field}
                            placeholder={field.split("_").join(" ")}
                            value={formData[field]}
                            onChange={handleChange}
                            className="p-2 border rounded-lg"
                            required
                        />
                    ))}

                    <button 
                        className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? "🔄 Predicting..." : "🌱 Predict Yield"}
                    </button>
                </form>

                {prediction !== null && (
                    <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 rounded-lg">
                        <p className="text-lg font-semibold">🌾 Predicted Yield: <strong>{prediction} tons</strong></p>
                    </div>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}
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
}