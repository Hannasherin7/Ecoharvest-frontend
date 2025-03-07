import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavAdmin from "../../Components/Layout/NavAdmin";

export const Rec = () => {
  const [data, changeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  // Function to handle recipe deletion
  const handleDeleteRecipe = async (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const response = await axios.post(
          "http://localhost:7000/deleterecipebyadmin",
          { id: recipeId } // Send recipeId in the request body
        );

        if (response.data.status === "success") {
          alert("Recipe deleted successfully!");
          fetchData(); // Refresh the recipe list after deletion
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("Failed to delete the recipe.");
      }
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

  // Styles
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

  return (
    <div>
      <NavAdmin />
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
        </div>
        <div className="row">
          <div className="col col-12">
            <div className="row g-3">
              {filteredData.map((value, index) => (
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
                      alt={value.titler}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
                      {/* Delete button */}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteRecipe(value._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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