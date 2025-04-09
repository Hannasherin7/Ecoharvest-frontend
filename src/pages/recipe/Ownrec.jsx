import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import NavBar from "../../Components/Layout/NavBar";
import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";



export const Ownrec = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored
      const response = await axios.get("http://localhost:7000/getUserRecipes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      alert(error.message);
    }
  };

  const handleDelete = async (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:7000/deleterec",
          { recipeId }, // Send recipeId in the request body
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.status === "success") {
          alert("Recipe deleted successfully!");
          fetchData(); // Refresh the list after deletion
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting recipe:", error.message);
        alert("Failed to delete the recipe.");
      }
    }
  };

  const filteredData = data.filter((item) =>
    item.titler.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h1 className="text-center">My Recipes</h1>
        <input
          type="text"
          placeholder="Search Recipe"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-3"
        />
        <div className="row">
          {filteredData.map((recipe) => (
            <div key={recipe._id} className="col-md-4">
              <div className="card">
                <img
                  src={`http://localhost:7000/${recipe.imager.replace(
                    /^\//,
                    ""
                  )}`}
                  alt={recipe.titler}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.titler}</h5>
                  <p className="card-text">
                    Ingredients: {recipe.incredientsr}
                  </p>
                  <p className="card-text">
                    Description: {recipe.descriptionr}
                  </p>
                  <p className="card-text">Type: {recipe.typer}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(recipe._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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