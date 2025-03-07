import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const NavBar = () => {
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
          <li className="nav-item">
                <a className="nav-link text-white" href="/userhome">Home</a>
              </li>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  About Us
                </a>
                <ul className="dropdown-menu bg-white">
                  <li><a className="dropdown-item text-dark" href="/abt">Our Farm</a></li>
                  <li><a className="dropdown-item text-dark" href="/why">Why Organic & Sustainable</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Eat And Be Well
                </a>
                <ul className="dropdown-menu bg-white">
                  <li><a className="dropdown-item text-dark" href="/viewrec">Recipes</a></li>
                  <li><a className="dropdown-item text-dark" href="/viewtips">Storage Tips</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  What would you like to do?
                </a>
                <ul className="dropdown-menu bg-white">
                  <li><a className="dropdown-item text-dark" href="/frmr">Sell Your Product</a></li>
                  <li><a className="dropdown-item text-dark" href="/buy">Browse Available Products</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Blogs
                </a>
                <ul className="dropdown-menu bg-white">
                  <li><a className="dropdown-item text-dark" href="/addblog">Upload Your Blogs</a></li>
                  <li><a className="dropdown-item text-dark" href="/myblog">View Your Blogs</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/complaintadd">Complaints</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/own/:id">Profile</a>
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
export default NavBar;
