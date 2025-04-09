import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaLeaf, FaHome, FaSeedling, FaShoppingBag, FaBook, FaQuestionCircle, FaUtensils, FaLightbulb } from 'react-icons/fa';

const NavBar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiration');
    
    // Optionally: Clear any other session data
    localStorage.removeItem('cart');
    
    // Redirect to login page
    navigate('/');
    
    // Force reload to clear any cached state
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success bg-gradient shadow-sm">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/userhome">
            <FaLeaf className="me-2" style={{ fontSize: '1.5rem' }} />
            <span className="fw-bold">Organic Haven</span>
          </a>
          
          <button
            className="navbar-toggler"
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
            <ul className="navbar-nav me-auto">
            
              
              <li className="nav-item">
                <a className="nav-link d-flex align-items-center" href="/why">
                  <FaQuestionCircle className="me-1" />
                  <span className="d-none d-lg-inline">Why Organic</span>
                </a>
              </li>
              
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaUtensils className="me-1" />
                  <span className="d-none d-lg-inline">Eat And Be Well</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><a className="dropdown-item d-flex align-items-center" href="/viewrec"><FaUtensils className="me-2" />Recipes</a></li>
                  <li><a className="dropdown-item d-flex align-items-center" href="/viewtips"><FaLightbulb className="me-2" />Storage Tips</a></li>
                </ul>
              </li>
              
              <li className="nav-item">
                <a className="nav-link d-flex align-items-center" href="/seeds">
                  <FaSeedling className="me-1" />
                  <span className="d-none d-lg-inline">Seeds</span>
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link d-flex align-items-center" href="/buy">
                  <FaShoppingBag className="me-1" />
                  <span className="d-none d-lg-inline">Organic Products</span>
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="/fertilizers">Fertilizers</a>
              </li>
              
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaBook className="me-1" />
                  <span className="d-none d-lg-inline">Blogs</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><a className="dropdown-item d-flex align-items-center" href="/addblog"><FaBook className="me-2" />Upload Blog</a></li>
                  <li><a className="dropdown-item d-flex align-items-center" href="/myblog"><FaBook className="me-2" />Your Blogs</a></li>
                </ul>
              </li>
            </ul>
            
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link position-relative" href="/cart">
                  <FaShoppingCart style={{ fontSize: '1.2rem' }} />
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  <FaUser style={{ fontSize: '1.2rem' }} />
                </a>
              </li>
              
              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <button 
                    className="btn btn-link nav-link d-flex align-items-center" 
                    onClick={handleLogout}
                    style={{ color: 'rgba(255,255,255,.75)' }}
                  >
                    <FaSignOutAlt className="me-1" />
                    <span className="d-none d-lg-inline">Logout</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;