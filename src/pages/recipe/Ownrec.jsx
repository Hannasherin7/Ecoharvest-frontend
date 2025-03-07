import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Layout/NavBar";

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
    </div>
  );
};