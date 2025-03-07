import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Components/Layout/NavBar";

const Owntip = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetchUserTips();
  }, []);

  // Function to fetch the logged-in user's tips
  const fetchUserTips = async () => {
    try {
      const response = await axios.get("http://localhost:7000/usertips", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTips(response.data.tips);
    } catch (error) {
      console.error("Error fetching tips:", error);
      alert("Failed to load tips.");
    }
  };

  // Function to delete a tip
  const deleteTip = async (tipId) => {
    if (window.confirm("Are you sure you want to delete this tip?")) {
      try {
        const response = await axios.post(
          "http://localhost:7000/deletetip",
          { tipId }, // Send tipId in the request body
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        if (response.data.status === "success") {
          alert("Tip deleted successfully");
          fetchUserTips(); // Refresh tips after deletion
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting tip:", error);
        alert("Failed to delete tip.");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h2 className="text-center">My Added Tips</h2>

        {tips.length === 0 ? (
          <p className="text-center">No tips added yet.</p>
        ) : (
          <div className="row">
            {tips.map((tip) => (
              <div key={tip._id} className="col-md-4">
                <div className="card p-3">
                  <img
                    src={`http://localhost:7000/${tip.imaget.replace(
                      /^\//,
                      ""
                    )}`}
                    alt={tip.item}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <h4>{tip.item}</h4>
                  <p>{tip.tip}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTip(tip._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Owntip;