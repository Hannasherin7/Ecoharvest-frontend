import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Navbaradmin = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
    navigate('/'); 
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler text-white border-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/adminhome">Home</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/users">Sellers</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/buyer">Buyers</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/orders">Orders</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/products">Products</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/tips">Tips</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/recipes">Recipes</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/complaintList">Complaints</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/acom">buyer complaints</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/senda">send anoouncement</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/vcontact">contacts</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/cfr">Confirm farmer</a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <button className="btn btn-danger text-white nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbaradmin;
