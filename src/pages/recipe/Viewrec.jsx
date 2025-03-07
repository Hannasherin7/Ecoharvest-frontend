import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import NavBar from "../../Components/Layout/NavBar";
import { Link } from "react-router-dom";

export const Viewrec = () => {
  const styles = {
    footer: {
      backgroundColor: "#333",
      color: "#fff",
      textAlign: "center",
      padding: "20px",
      marginTop: "30px",
    },
    link: {
      color: "#4caf50",
      textDecoration: "none",
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

  const [data, changeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const fetchData = () => {
    axios
      .get("http://localhost:7000/viewrec")
      .then((response) => {
        changeData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message); // Show the error message
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle dropdown selection
  const handleNavigation = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue); // Navigate to the selected route
    }
  };

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term state
  };

  // Filter the recipes based on the search term
  const filteredData = data.filter((item) =>
    item.titler.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h1 style={headerStyle}>Explore Delicious Recipes</h1>{" "}
        {/* Header with headerStyle applied */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Recipe Search Feature */}
          <input
            type="text"
            placeholder="Search Recipe"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
            style={{ width: "400px" }} // Extended width of the search bar
          />

          {/* Dropdown for navigation */}
          <select
            onChange={handleNavigation}
            className="form-select"
            style={{ width: "200px" }}
          >
            <option value="">More</option>
            <option value="/addrec">Upload Your Recipe</option>
            <option value="/ownrec">view your recipe</option>
          </select>
        </div>
        <div className="row">
          <div className="col col-12">
            <div className="row g-3">
              {filteredData.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="col col-12 col-sm-6 col-md-4 col-lg-3"
                  >
                    <div className="card">
                      <img
                        src={`http://localhost:7000/${value.imager.replace(
                          /^\//,
                          ""
                        )}`}
                      />
                      <div className="card-body">
                        <p className="card-text">Title: {value.titler}</p>
                        <p className="card-text">
                          Ingredient: {value.incredientsr}
                        </p>
                        <p className="card-text">
                          Description: {value.descriptionr}
                        </p>
                        <p className="card-text">Type: {value.typer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
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
