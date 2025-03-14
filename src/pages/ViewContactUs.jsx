import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbaradmin from "../Components/Layout/Navbaradmin";

const ViewContactUs = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:7000/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Navbaradmin />
      <div style={styles.contentContainer}>
        <h1 style={styles.heading}>Contact Submissions</h1>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Message</th>
              <th style={styles.tableHeader}>Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} style={styles.tableRow}>
                <td style={styles.tableData}>{contact.name}</td>
                <td style={styles.tableData}>{contact.email}</td>
                <td style={styles.tableData}>{contact.message}</td>
                <td style={styles.tableData}>
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  contentContainer: {
    maxWidth: "1200px",
    width: "100%",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    margin: "20px auto",
  },
  heading: {
    fontSize: "2rem",
    color: "#4caf50",
    marginBottom: "20px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeaderRow: {
    backgroundColor: "#4caf50",
  },
  tableHeader: {
    padding: "12px",
    color: "#fff",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  },
  tableData: {
    padding: "12px",
    textAlign: "left",
  },
};

export default ViewContactUs;