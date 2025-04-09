import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const NavAdmin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    navigate('/'); 
  };

  const handleNavigation = (e, path) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to access this page');
      navigate('/login');
      return;
    }
    navigate(path);
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
                <a className="nav-link text-white" href="/adminhome" onClick={(e) => handleNavigation(e, '/adminhome')}>Home</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/users" onClick={(e) => handleNavigation(e, '/users')}>Sellers</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/buyer" onClick={(e) => handleNavigation(e, '/buyer')}>Buyers</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/orders" onClick={(e) => handleNavigation(e, '/orders')}>Orders</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/products" onClick={(e) => handleNavigation(e, '/products')}>Products</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/tips" onClick={(e) => handleNavigation(e, '/tips')}>Tips</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/recipes" onClick={(e) => handleNavigation(e, '/recipes')}>Recipes</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/complaintList" onClick={(e) => handleNavigation(e, '/complaintList')}>Complaints</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/acom" onClick={(e) => handleNavigation(e, '/acom')}>buyer complaints</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/senda" onClick={(e) => handleNavigation(e, '/senda')}>send announcement</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/vcontact" onClick={(e) => handleNavigation(e, '/vcontact')}>contacts</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="/cfr" onClick={(e) => handleNavigation(e, '/cfr')}>Confirm seller</a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {isAuthenticated ? (
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

export default NavAdmin;