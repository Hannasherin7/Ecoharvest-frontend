import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const NavSeller = () => {
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
                <a className="nav-link text-white" href="/sellerhome">Home</a>
              </li>
            <ul className="navbar-nav">
              
              
             
              <li className="nav-item">
                <a className="nav-link text-white" href="/frmr">sell your products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/complaintadd">Complaints</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/sellercom">product complaint</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/viewa">announcements</a>
              </li>
             
              <li className="nav-item">
                <a className="nav-link text-white" href="/ml">crop yield prediction</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/sellerprofile">Profile</a>
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
export default NavSeller;
