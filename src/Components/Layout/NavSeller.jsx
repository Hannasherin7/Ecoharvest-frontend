import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaBoxOpen, 
  FaCommentDots, 
  FaComments, 
  FaBullhorn, 
  FaChartBar, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaStore 
} from 'react-icons/fa';
import { GiFarmer } from 'react-icons/gi';

const NavSeller = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 300);
  };

  const handleProtectedNav = (path) => {
    if (!isLoggedIn) {
      alert('Please login to access this feature');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/sellerhome">
          <GiFarmer className="me-2" style={{ fontSize: '1.8rem', color: '#4CAF50' }} />
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>Seller Dashboard</span>
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
           
            
            <li className="nav-item mx-1">
              <a className="nav-link d-flex align-items-center py-3 px-2 rounded hover-effect" 
                 href="/frmr">
                <FaBoxOpen className="me-2" style={{ fontSize: '1.2rem' }} />
                <span>Sell Your Products</span>
              </a>
            </li>
            
            <li className="nav-item dropdown mx-1">
              <a className="nav-link dropdown-toggle d-flex align-items-center py-3 px-2 rounded hover-effect" 
                 href="#" 
                 role="button" 
                 data-bs-toggle="dropdown" 
                 aria-expanded="false">
                <FaCommentDots className="me-2" style={{ fontSize: '1.2rem' }} />
                <span>Complaints</span>
              </a>
              <ul className="dropdown-menu shadow" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <li>
                  <a className="dropdown-item d-flex align-items-center py-2 text-white hover-effect" 
                     href="/complaintadd">
                    <FaCommentDots className="me-2" />
                    <span>Submit Complaint</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center py-2 text-white hover-effect" 
                     href="/sellercom">
                    <FaComments className="me-2" />
                    <span>View Complaints</span>
                  </a>
                </li>
              </ul>
            </li>
            
            <li className="nav-item mx-1">
              <a className="nav-link d-flex align-items-center py-3 px-2 rounded hover-effect" 
                 href="/viewa">
                <FaBullhorn className="me-2" style={{ fontSize: '1.2rem' }} />
                <span>Announcements</span>
              </a>
            </li>
            
            <li className="nav-item mx-1">
              <button className="nav-link d-flex align-items-center py-3 px-2 rounded hover-effect bg-transparent border-0" 
                 onClick={() => handleProtectedNav('/ml')}>
                <FaChartBar className="me-2" style={{ fontSize: '1.2rem' }} />
                <span>Crop Yield Prediction</span>
              </button>
            </li>
          </ul>
          
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-1">
              <a className="nav-link d-flex align-items-center py-3 px-2 rounded hover-effect" 
                 href="/sellerprofile">
                <FaUserCircle style={{ fontSize: '1.4rem' }} />
                <span className="ms-2 d-none d-lg-inline">My Profile</span>
              </a>
            </li>
            
            {isLoggedIn && (
              <li className="nav-item mx-1">
                <button 
                  className="btn d-flex align-items-center py-3 px-3 rounded hover-effect" 
                  onClick={handleLogout}
                  style={{ 
                    background: '#333',
                    border: '1px solid #444',
                    color: 'white'
                  }}>
                  <FaSignOutAlt className="me-2" />
                  <span className="d-none d-lg-inline">Logout</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .hover-effect {
          transition: all 0.3s ease;
        }
        .hover-effect:hover {
          background-color: #333;
          color: #4CAF50 !important;
        }
        .dropdown-item.hover-effect:hover {
          background-color: #333 !important;
          color: #4CAF50 !important;
        }
        .navbar {
          border-bottom: 1px solid #333;
        }
      `}</style>
    </nav>
  );
};

export default NavSeller;