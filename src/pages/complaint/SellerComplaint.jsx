import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerComplaints = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [sellerMessage, setSellerMessage] = useState("");

  const userId = localStorage.getItem("userid"); // Get seller's userId from localStorage

  useEffect(() => {
    const fetchSoldProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/soldproduct?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Filter products to only include those with complaints
        const productsWithComplaints = response.data.filter(
          (product) => product.complaints && product.complaints.length > 0
        );
        setProducts(productsWithComplaints);
      } catch (err) {
        console.error("Error fetching sold products:", err);
        setError("Could not fetch sold products. Please try again later.");
      }
    };

    fetchSoldProducts();
  }, [userId]);

  const handleUpdateComplaint = async (complaintId) => {
    try {
      const response = await axios.put(
        `http://localhost:7000/update-complaintstatus/${complaintId}`,
        { status, sellerMessage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        alert("Complaint updated successfully!");
        setSelectedComplaint(null); // Close the update form
        setStatus("");
        setSellerMessage("");

        // Refresh the product list
        const updatedProducts = products.map((product) => ({
          ...product,
          complaints: product.complaints.map((complaint) =>
            complaint._id === complaintId ? response.data.complaint : complaint
          ),
        }));
        setProducts(updatedProducts);
      }
    } catch (err) {
      console.error("Error updating complaint:", err);
      alert("Failed to update complaint. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Seller Complaints</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <img
                src={`http://localhost:7000/${product.image}`}
                alt={product.name}
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px", marginRight: "10px" }}
              />
              <div>
                <h2>{product.pname}</h2>
                <p>{product.discription}</p>
                <p>price:${product.price}</p>
              </div>
            </div>

            <h3>Complaints</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>User Email</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Description</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Category</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Resolution Request</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Seller Response</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Evidence</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {product.complaints.map((complaint) => (
                  <tr key={complaint._id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {complaint.userId?.email}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {complaint.description}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {complaint.category}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {complaint.resolutionRequest}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {complaint.status}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {complaint.sellerResponse || "No response yet"}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {complaint.evidence && (
                        <img
                          src={`http://localhost:7000/${complaint.evidence}`}
                          alt="Evidence"
                          style={{ width: "100px", height: "auto" }}
                        />
                      )}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button
                        onClick={() => setSelectedComplaint(complaint._id)}
                        style={{
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Update
                      </button>
                      {selectedComplaint === complaint._id && (
                        <div style={{ marginTop: "10px" }}>
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <textarea
                            placeholder="Enter your response"
                            value={sellerMessage}
                            onChange={(e) => setSellerMessage(e.target.value)}
                            style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
                          />
                          <button
                            onClick={() => handleUpdateComplaint(complaint._id)}
                            style={{
                              backgroundColor: "#4CAF50",
                              color: "white",
                              border: "none",
                              padding: "5px 10px",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => setSelectedComplaint(null)}
                            style={{
                              backgroundColor: "#f44336",
                              color: "white",
                              border: "none",
                              padding: "5px 10px",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No products with complaints found.</p>
      )}
    </div>
  );
};

export default SellerComplaints;