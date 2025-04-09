import React, { useEffect, useState } from 'react';
import videoFile from './video.mp4'; 

export default function Video() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!videoLoaded) {
        console.log("Video is taking too long to load.");
      }
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timeout);
  }, [videoLoaded]);

  const styles = {
    body: {
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#f4f4f9',
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
      padding: '25px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    },
    navbarBrand: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    logo: {
      height: '50px',
      marginRight: '15px',
    },
    title: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#fff',
      textAlign: 'center',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      flex: 1,
      marginTop: '120px',
    },
    videoContainer: {
      backgroundColor: '#fff',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      padding: '25px',
      textAlign: 'center',
      marginBottom: '40px',
    },
    videoTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '2.5rem',
      color: '#4caf50',
      marginBottom: '20px',
      fontWeight: '700',
    },
    videoPlayer: {
      width: '100%',
      height: 'auto',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    loadingMessage: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '1.2rem',
      color: '#666',
      marginTop: '20px',
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
        <div style={styles.navbarBrand}>
          <img
            src="https://t3.ftcdn.net/jpg/02/58/62/36/240_F_258623607_a31m59gQNxn3lhw7OuuAlJwmqeeEQ90q.jpg"
            alt="EcoHarvest Logo"
            style={styles.logo}
          />
          <span style={styles.title}>
            EcoHarvest : Marketplace for organic goods with yield forecasting tools
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Video Section */}
        <div style={styles.videoContainer}>
          <h1 style={styles.videoTitle}>Tutorial Video</h1>
          <video
            style={styles.videoPlayer}
            controls
            onCanPlay={() => setVideoLoaded(true)}
            onError={(e) => console.error("Video failed to load", e)}
          >
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!videoLoaded && <p style={styles.loadingMessage}>Loading video...</p>}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
        <div style={styles.footerLinks}>
          <a
            href="https://facebook.com"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = '#fff')}
            onMouseLeave={(e) => (e.target.style.color = '#4caf50')}
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = '#fff')}
            onMouseLeave={(e) => (e.target.style.color = '#4caf50')}
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = '#fff')}
            onMouseLeave={(e) => (e.target.style.color = '#4caf50')}
          >
            Twitter
          </a>
        </div>
        <div style={styles.footerLinks}>
          <a
            href="/contact"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = '#fff')}
            onMouseLeave={(e) => (e.target.style.color = '#4caf50')}
          >
            Contact Us
          </a>
          |
          <a
            href="/about"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = '#fff')}
            onMouseLeave={(e) => (e.target.style.color = '#4caf50')}
          >
            About Us
          </a>
        </div>
      </footer>
    </div>
  );
}