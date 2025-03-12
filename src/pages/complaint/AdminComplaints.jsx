import React, { useEffect, useState } from "react";
import axios from "axios";
import NavAdmin from "../../Components/Layout/NavAdmin"; // Import NavAdmin for the header

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:7000/all-complaints", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setComplaints(response.data.complaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // Styles
  const pageStyle = {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  };

  const headerStyle = {
    textAlign: "center",
    margin: "20px 0",
    fontSize: "32px",
    color: "#333",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const tableHeaderRowStyle = {
    backgroundColor: "#4CAF50",
    color: "#fff",
  };

  const tableHeaderStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };

  const tableRowStyle = {
    borderBottom: "1px solid #ddd",
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  };

  const tableCellStyle = {
    padding: "12px",
    textAlign: "left",
  };

  const productImageStyle = {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "5px",
  };

  const evidenceImageStyle = {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "5px",
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <NavAdmin />

      {/* Page Title */}
      <h1 style={headerStyle}>All Complaints</h1>

      {/* Complaints Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderRowStyle}>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Category</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Resolution Request</th>
              <th style={tableHeaderStyle}>Evidence</th>
              <th style={tableHeaderStyle}>Seller Response</th>
              <th style={tableHeaderStyle}>User Name</th>
              <th style={tableHeaderStyle}>User Email</th>
              <th style={tableHeaderStyle}>Product Name</th>
              <th style={tableHeaderStyle}>Product Image</th>
              <th style={tableHeaderStyle}>Seller Name</th>
              <th style={tableHeaderStyle}>Seller Email</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id} style={tableRowStyle}>
                <td style={tableCellStyle}>{complaint.description}</td>
                <td style={tableCellStyle}>{complaint.category}</td>
                <td style={tableCellStyle}>{complaint.status}</td>
                <td style={tableCellStyle}>{complaint.resolutionRequest}</td>
                <td style={tableCellStyle}>
                  {complaint.evidence && (
                    <img
                      src={`http://localhost:7000/${complaint.evidence}`}
                      alt="Evidence"
                      style={evidenceImageStyle}
                    />
                  )}
                </td>
                <td style={tableCellStyle}>{complaint.sellerResponse}</td>
                <td style={tableCellStyle}>{complaint.userId?.name}</td>
                <td style={tableCellStyle}>{complaint.userId?.email}</td>
                <td style={tableCellStyle}>{complaint.productId?.pname}</td>
                <td style={tableCellStyle}>
                  <img
                    src={`http://localhost:7000/${complaint.productId?.image}`}
                    alt={complaint.productId?.pname}
                    style={productImageStyle}
                  />
                </td>
                <td style={tableCellStyle}>{complaint.productId?.userId?.name}</td>
                <td style={tableCellStyle}>{complaint.productId?.userId?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminComplaints;