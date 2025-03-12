import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavAdmin from "../../Components/Layout/NavAdmin";

export const Tip = () => {
  const [data, changeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const fetchData = () => {
    axios
      .get("http://localhost:7000/viewtips")
      .then((response) => {
        changeData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message); // Show error message
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle tip deletion
  const handleDeleteTip = async (tipId) => {
    if (window.confirm("Are you sure you want to delete this tip?")) {
      try {
        const response = await axios.post(
          "http://localhost:7000/deletetipbyadmin",
          { id: tipId } // Send tipId in the request body
        );

        if (response.data.status === "success") {
          alert("Tip deleted successfully!");
          fetchData(); // Refresh the tip list after deletion
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting tip:", error);
        alert("Failed to delete the tip.");
      }
    }
  };

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term state
  };

  // Filter the tips based on the search term
  const filteredData = data.filter((item) =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 style={headerStyle}>Explore Storage Tips</h1>{" "}
        {/* Header with headerStyle applied */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search Tip"
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
                      src={`http://localhost:7000/${value.imaget.replace(
                        /^\//,
                        ""
                      )}`}
                      alt={value.item}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <p className="card-text">Item: {value.item}</p>
                      <p className="card-text">Tip: {value.tip}</p>
                      {/* Delete button */}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteTip(value._id)}
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
    
    </div>
  );
};