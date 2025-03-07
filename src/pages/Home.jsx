import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const styles = {
    body: {
      fontFamily: "'Open Sans', sans-serif",
      backgroundColor: '#f4f4f9',
      color: '#333',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    heroSection: {
      backgroundImage: 'url(https://images.unsplash.com/photo-1592293544084-7c21bcee66d4)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
      padding: '100px 20px',
      textAlign: 'center',
      borderRadius: '10px',
    },
    heading1: {
      fontFamily: "'Lora', serif",
      color: '#4caf50', // Green color for EcoHarvest
      fontSize: '4rem',
      marginBottom: '10px',
    },
    heading3: {
      fontFamily: "'Lora', serif",
      color: '#4caf50', // Green color for the subheading
      fontSize: '1.8rem',
      marginBottom: '20px',
    },
    tutorialLink: {
      color: '#4caf50',
      textDecoration: 'underline',
      display: 'block',
      marginTop: '10px',
      fontSize: '1rem',
    },
    image: {
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
      height: '150px',
      width: '150px',
      display: 'block',
      margin: '20px auto',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginLeft: '10px',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#388e3c',
    },
    featureSection: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      marginTop: '30px',
    },
    featureCard: {
      backgroundColor: '#fff',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      padding: '20px',
      textAlign: 'center',
      width: '250px',
      margin: '10px',
      transition: 'transform 0.3s ease',
    },
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

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <h1 style={styles.heading1}>EcoHarvest</h1>
          <h3 style={styles.heading3}>Marketplace for organic goods with yield forecasting tools</h3>
          <Link to="/video" style={styles.tutorialLink}>
            Click here to watch the tutorial on this
          </Link>
        </section>

        {/* Key Features */}
        <div style={styles.featureSection}>
          <div style={styles.featureCard}>
            <h3>Crop Yield Prediction</h3>
            <p>Advanced ML algorithms for accurate crop yield prediction.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Organic Products</h3>
            <p>Fresh, nutritious organic produce directly from local farmers.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Recipe Sharing</h3>
            <p>Share and discover delicious recipes made from fresh produce.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Storage Tips Sharing</h3>
            <p>Learn how to store produce to maintain freshness and nutrition.</p>
          </div>
        </div>

        {/* Sign In and Sign Up Buttons */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
    </div>
  );
};

export default Home;
