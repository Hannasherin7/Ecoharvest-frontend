import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>All Complaints</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Resolution Request</th>
            <th style={styles.th}>Evidence</th>
            <th style={styles.th}>Seller Response</th>
            <th style={styles.th}>User Name</th>
            <th style={styles.th}>User Email</th>
            <th style={styles.th}>Product Name</th>
            <th style={styles.th}>Product Image</th>
            <th style={styles.th}>Seller Name</th>
            <th style={styles.th}>Seller Email</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id} style={styles.tr}>
              <td style={styles.td}>{complaint.description}</td>
              <td style={styles.td}>{complaint.category}</td>
              <td style={styles.td}>{complaint.status}</td>
              <td style={styles.td}>{complaint.resolutionRequest}</td>
              <td style={styles.td}>
                {complaint.evidence && (
                  <img
                    src={`http://localhost:7000/${complaint.evidence}`}
                    alt="Evidence"
                    style={styles.evidenceImage}
                  />
                )}
              </td>
              <td style={styles.td}>{complaint.sellerResponse}</td>
              <td style={styles.td}>{complaint.userId?.name}</td>
              <td style={styles.td}>{complaint.userId?.email}</td>
              <td style={styles.td}>{complaint.productId?.pname}</td>
              <td style={styles.td}>
                <img
                  src={`http://localhost:7000/${complaint.productId?.image}`}
                  alt={complaint.productId?.pname}
                  style={styles.productImage}
                />
              </td>
              <td style={styles.td}>{complaint.productId?.userId?.name}</td>
              <td style={styles.td}>{complaint.productId?.userId?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse", // Ensures borders are merged
    marginBottom: "20px",
  },
  th: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    border: "1px solid #ddd", // Border for header cells
    textAlign: "left",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd", // Border for data cells
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #ddd", // Optional: Adds a bottom border to each row
  },
  productImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  evidenceImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "5px",
  },
};

export default AdminComplaints;