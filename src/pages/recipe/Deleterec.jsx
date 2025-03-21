import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../../Components/Layout/NavBar';
import { Link } from 'react-router-dom'; // Import Link for footer navigation

export const Deleterec = () => {
    const [data, setData] = useState({
        titler: "", // Changed from "item" to "titler"
    });

    const [result, setResult] = useState([]);

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        console.log(data);
        // Ensure you're using the correct endpoint for searching recipes
        axios.post("http://localhost:7000/searchrec", data)
            .then((response) => {
                setResult(response.data);
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
    };

    const deleteValue = (id) => {
        console.log(id);
        let input = { "_id": id };
        axios.post("http://localhost:7000/deleterec", input)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Successfully deleted");
                    // Refresh the search results here to reflect the deletion
                    readValue(); 
                } else {
                    alert("Error deleting");
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    // Styles
    const styles = {
        footer: {
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            padding: '20px',
            marginTop: '30px',
        },
        link: {
            color: '#4caf50',
            textDecoration: 'none',
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
            <NavBar />
            <div className="container mt-4">
                <h1 style={headerStyle}>DELETE RECIPE</h1> {/* Header with headerStyle applied */}
                <div className="row">
                    <div className="col col-12">
                        <div className="row">
                            <div className="col col-12 col-sm-6">
                                <label htmlFor="" className="form-label">Title</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name='titler' 
                                    value={data.titler} 
                                    onChange={inputHandler} 
                                />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <br /><br />
                                <button onClick={readValue} className="btn btn-primary">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-12">
                        <div className="row g-3">
                            {result.map((value, index) => (
                                <div className="col col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                                    <div className="card">
                                        <img src={value.imager} alt="recipe" />
                                        <div className="card-body">
                                            <p className="card-text">Ingredients: {value.incredientsr}</p>
                                            <p className="card-text">Title: {value.titler}</p>
                                            <p className="card-text">Description: {value.descriptionr}</p>
                                            <p className="card-text">Type: {value.typer}</p>
                                            <p>
                                                <button className="btn btn-danger" onClick={() => { deleteValue(value._id) }}>Delete</button>
                                            </p>
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
                    <a href="https://facebook.com" style={styles.link}> Facebook</a>,
                    <a href="https://instagram.com" style={styles.link}> Instagram</a>, and
                    <a href="https://twitter.com" style={styles.link}> Twitter</a>.
                </p>
                <p>
                    <Link to="/contact" style={styles.link}>Contact Us</Link> |
                    <Link to="/about" style={styles.link}> About Us</Link>
                </p>
            </footer>
        </div>
    );
};