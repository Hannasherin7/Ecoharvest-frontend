import React from 'react';
import NavBar from '../Components/Layout/NavBar';

const AboutUs = () => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const sectionStyle = {
    backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-aerial-view-of-agricultural-sprayer-working-on-the-green-field-on-image_15689448.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '50px',
    color: '#fff',
  };

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px 0',
    textAlign: 'center',
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
    <div style={containerStyle}>
      <NavBar />

      <div style={headerStyle}>
        <h1>Welcome to Our Farm: Nurturing Nature, Empowering Farmers</h1>
      </div>

      <div style={sectionStyle}>
        <div style={glassStyle}>
          
          <p>
            Our farm is dedicated to providing fresh, organic produce grown with care, respect for the environment, and a passion for sustainable farming. We believe in producing food that is not only healthy but also beneficial to the community. Our offerings range from vibrant vegetables to fresh fruits, all cultivated without harmful chemicals or pesticides. We are committed to ensuring the highest quality, purity, and taste in everything we grow.
          </p>
          <p>
            At the heart of our farm is a dedication to connecting small farmers directly with consumers. We provide a platform where farmers can list their products and sell them directly to buyers, eliminating the need for intermediaries. This means farmers can set their prices, negotiate fair deals, and retain full control over their produce. By supporting this direct relationship, we ensure that local farmers, especially small-scale ones, benefit economically and sustainably from their hard work.
          </p>
          <p>
            We understand the challenges small farmers face, and our goal is to empower them by giving them a digital marketplace that broadens their reach to customers who appreciate fresh, organic products. Through our platform, farmers can showcase their produce and engage with a wider community of buyers, from local consumers to restaurants and grocery stores. This not only helps farmers sell more but also fosters a transparent, fair-trade ecosystem.
          </p>
          <p>
            Our farm offers a wide variety of products, including poisonless fish, fresh vegetables, fruits, and meats, all grown and raised using eco-friendly, sustainable methods. We are proud to provide food that is not only safe and nutritious but also promotes healthier lifestyles. Our customers can enjoy the freshest, toxin-free options, knowing they are supporting responsible farming and fishing practices that respect both the environment and the farmers who produce them.
          </p>
          <p>
            By eliminating intermediaries, we make it easier for farmers to sell directly to consumers and receive the full value for their hard work. This direct-to-consumer model creates a more transparent and equitable marketplace, where buyers get the best organic products, and farmers can focus on what they do best: growing and raising healthy, natural food. At our farm, we aim to build a community where trust and sustainability are at the forefront, benefiting both the farmers and the consumers.
          </p>
        </div>
      </div>

      <footer style={{ 
        backgroundColor: 'black', 
        color: 'white', 
        textAlign: 'center', 
        padding: '10px', 
        borderTop: '1px solid #444' 
      }}>
        <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
        <p>
          Follow us on 
          <a href='https://facebook.com' style={{ color: '#fff', textDecoration: 'none' }}> Facebook</a>, 
          <a href='https://instagram.com' style={{ color: '#fff', textDecoration: 'none' }}> Instagram</a>, and 
          <a href='https://twitter.com' style={{ color: '#fff', textDecoration: 'none' }}> Twitter</a>.
        </p>
        <p>
          <a href='/contact' style={{ color: '#fff', textDecoration: 'none' }}>Contact Us</a> | 
          <a href='/about' style={{ color: '#fff', textDecoration: 'none' }}> About Us</a>
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
