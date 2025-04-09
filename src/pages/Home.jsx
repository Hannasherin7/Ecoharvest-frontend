import React from 'react';
import { Link } from 'react-router-dom';
 import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


export const Home = () => {
  const styles = {
    body: {
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#f9f9f9',
      color: '#333',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#4caf50',
      color: '#fff',
      padding: '25px 20px', // Increased padding for a larger navbar
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Center the content
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    },
    navbarBrand: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    logo: {
      height: '50px', // Slightly larger logo
      marginRight: '15px',
    },
    title: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.8rem', // Larger font size
      fontWeight: '700',
      color: '#fff',
      textAlign: 'center', // Center the title
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      flex: 1,
      marginTop: '120px', // Increased margin to avoid overlap with the larger navbar
    },
    heroSection: {
      backgroundImage: 'url(https://www.aces.edu/wp-content/uploads/2020/10/GettyImages-1148006026-scaled.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
      padding: '200px 20px', // Increased padding for a larger hero section
      textAlign: 'center',
      borderRadius: '10px',
      marginBottom: '40px',
      position: 'relative',
      overflow: 'hidden',
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1,
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
    },
    heading1: {
      fontFamily: "'Playfair Display', serif",
      color: '#fff',
      fontSize: '4.5rem',
      marginBottom: '20px',
      fontWeight: '700',
      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
    },
    heading3: {
      fontFamily: "'Poppins', sans-serif",
      color: '#fff',
      fontSize: '2rem', // Larger font size
      marginBottom: '30px',
      fontWeight: '400',
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
    },
    impressiveText: {
      fontFamily: "'Poppins', sans-serif",
      color: '#fff',
      fontSize: '1.5rem',
      fontStyle: 'italic',
      marginBottom: '30px',
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
    },
    tutorialLink: {
      color: '#4caf50',
      textDecoration: 'none',
      fontSize: '1.1rem',
      fontWeight: '600',
      backgroundColor: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    tutorialLinkHover: {
      backgroundColor: '#4caf50',
      color: '#fff',
    },
    featureSection: {
      display: 'flex',
      justifyContent: 'space-between', // Ensure cards are in a single row
      flexWrap: 'wrap',
      marginTop: '40px',
      gap: '20px',
    },
    featureCard: {
      backgroundColor: '#fff',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      padding: '25px',
      textAlign: 'center',
      width: '23%', // Adjusted width for 4 cards in a row
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    featureCardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.15)',
    },
    featureIcon: {
      fontSize: '2.5rem',
      color: '#4caf50',
      marginBottom: '15px',
    },
    featureTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '1.5rem',
      color: '#333',
      marginBottom: '10px',
      fontWeight: '600',
    },
    featureDescription: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '1rem',
      color: '#666',
      lineHeight: '1.6',
    },
    buttonContainer: {
      textAlign: 'center',
      marginTop: '40px',
    },
    button: {
      padding: '12px 30px',
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '0 10px',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#388e3c',
      transform: 'scale(1.05)',
    },
    footer: {
      backgroundColor: '#2c3e50',
      color: '#fff',
      textAlign: 'center',
      padding: '30px 20px',
      marginTop: '60px',
    },
    footerLinks: {
      margin: '10px 0',
    },
    link: {
      color: '#4caf50',
      textDecoration: 'none',
      margin: '0 10px',
      fontWeight: '600',
      transition: 'color 0.3s ease',
    },
    linkHover: {
      color: '#fff',
    },
  };

  return (
    <div style={styles.body}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <Link to="/" style={styles.navbarBrand}>
          <img
            src="https://t3.ftcdn.net/jpg/02/58/62/36/240_F_258623607_a31m59gQNxn3lhw7OuuAlJwmqeeEQ90q.jpg"
            alt="EcoHarvest Logo"
            style={styles.logo}
          />
          <span style={styles.title}>
            EcoHarvest : Marketplace for organic goods with yield forecasting tools
          </span>
        </Link>
      </nav>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroContent}>
            <h3 style={styles.heading1}>Choose the right produce for a healthier future</h3>
            {/* <h3 style={styles.heading3}>Marketplace for organic goods with yield forecasting tools</h3> */}
            <p style={styles.impressiveText}>EcoHarvest connects you with fresh, organic goods and advanced yield forecasting tools. Our platform empowers farmers and consumers alike, ensuring sustainable agriculture and nutritious choices for everyone.</p>
            <Link
              to="/video"
              style={styles.tutorialLink}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#4caf50')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#fff')}
            >
              Watch Tutorial
            </Link>
          </div>
        </section>

        {/* Key Features */}
        <div style={styles.featureSection}>
          <div
            style={styles.featureCard}
            onMouseEnter={(e) => (e.target.style.transform = 'translateY(-10px)')}
            onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
          >
            <div style={styles.featureIcon}>🌾</div>
            <h3 style={styles.featureTitle}>Crop Yield Prediction</h3>
            <p style={styles.featureDescription}>
              Advanced ML algorithms for accurate crop yield prediction.
            </p>
          </div>
          <div
            style={styles.featureCard}
            onMouseEnter={(e) => (e.target.style.transform = 'translateY(-10px)')}
            onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
          >
            <div style={styles.featureIcon}>🥦</div>
            <h3 style={styles.featureTitle}>Organic Products</h3>
            <p style={styles.featureDescription}>
              Fresh, nutritious organic produce directly from local farmers.
            </p>
          </div>
          <div
            style={styles.featureCard}
            onMouseEnter={(e) => (e.target.style.transform = 'translateY(-10px)')}
            onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
          >
            <div style={styles.featureIcon}>🍴</div>
            <h3 style={styles.featureTitle}>Recipe Sharing</h3>
            <p style={styles.featureDescription}>
              Share and discover delicious recipes made from fresh produce.
            </p>
          </div>
          <div
            style={styles.featureCard}
            onMouseEnter={(e) => (e.target.style.transform = 'translateY(-10px)')}
            onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
          >
            <div style={styles.featureIcon}>🧊</div>
            <h3 style={styles.featureTitle}>Storage Tips Sharing</h3>
            <p style={styles.featureDescription}>
              Learn how to store produce to maintain freshness and nutrition.
            </p>
          </div>
        </div>

        {/* Sign In and Sign Up Buttons */}
        <div style={styles.buttonContainer}>
          <Link to="/login">
            <button
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#388e3c')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#4caf50')}
            >
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#388e3c')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#4caf50')}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
   
               <footer style={{
                           backgroundColor: "#2c3e50",
                           color: "#ecf0f1",
                           padding: "50px 0 20px",
                           marginTop: "50px"
                         }}>
                           <div className="container">
                             <div className="row">
                               <div className="col-md-4 mb-4">
                                 <h5 style={{ 
                                   fontFamily: "'Playfair Display', serif",
                                   marginBottom: "20px",
                                   fontWeight: "600"
                                 }}>
                                   EcoHarvest
                                 </h5>
                                 <p style={{ lineHeight: "1.6" }}>
                                   Bringing people together through the joy of organic living and sharing high-quality products from around the world.
                                 </p>
                               </div>
                               <div className="col-md-2 mb-4">
                                 <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Explore</h6>
                                 <ul style={{ listStyle: "none", padding: "0" }}>
                                   <li style={{ marginBottom: "8px" }}><Link to="/" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Home</Link></li>
                                   <li style={{ marginBottom: "8px" }}><Link to="/productlist" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Products</Link></li>
                                   <li style={{ marginBottom: "8px" }}><Link to="/about" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>About</Link></li>
                                   <li style={{ marginBottom: "8px" }}><Link to="/contact" style={{ color: "#bdc3c7", textDecoration: "none", ":hover": { color: "#fff" } }}>Contact</Link></li>
                                 </ul>
                               </div>
                               <div className="col-md-3 mb-4">
                                 <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Legal</h6>
                                 <ul style={{ listStyle: "none", padding: "0" }}>
                                   <li style={{ marginBottom: "8px" }}>Eco-friendly Commitment</li>
                                   <li style={{ marginBottom: "8px" }}>Sustainability Policy</li>
                                   <li style={{ marginBottom: "8px" }}>Organic Certification</li>
                                 </ul>
                               </div>
                               <div className="col-md-3 mb-4">
                                 <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>Connect With Us</h6>
                                 <div className="social-icons" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                                   <a href="https://facebook.com" style={{ color: "#bdc3c7", marginRight: "15px", ":hover": { color: "#3b5998" } }}><FaFacebook /></a>
                                   <a href="https://instagram.com" style={{ color: "#bdc3c7", marginRight: "15px", ":hover": { color: "#e4405f" } }}><FaInstagram /></a>
                                   <a href="https://twitter.com" style={{ color: "#bdc3c7", ":hover": { color: "#1da1f2" } }}><FaTwitter /></a>
                                 </div>
                                
                                 
                               </div>
                             </div>
                             <hr style={{ borderColor: "#34495e", margin: "20px 0" }} />
                             <div className="text-center" style={{ fontSize: "0.9rem" }}>
                               <p style={{ margin: "0" }}>
                                 &copy; {new Date().getFullYear()} EcoHarvest. All rights reserved.
                               </p>
                             </div>
                           </div>
                         </footer>
    </div>
  );
};

export default Home;