import React from 'react';
import NavBar from '../Components/Layout/NavBar';
import { Link } from 'react-router-dom';
 import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

         

const WhyOrganicSustainable = () => {
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
    //margin: "20px 0",
  };

  return (
    <div style={containerStyle}>
      <NavBar />

      <div style={headerStyle}>
      <h1>Why Organic is Sustainable</h1>
      <p>Discover the benefits of organic farming for a healthier planet and future generations.</p>
      </div>

      <div style={sectionStyle}>
        <div style={glassStyle}>
          
        <p>
              Organic farming is not just a method of food production; it's a holistic approach to agriculture that prioritizes environmental health, social equity, and economic viability. Unlike conventional farming, which often relies on synthetic fertilizers and pesticides, organic farming utilizes natural methods to enhance soil fertility and combat pests. This sustainable practice helps preserve biodiversity, protects ecosystems, and promotes a healthier planet for future generations.
            </p>

            <h2>Healthy Soils</h2>
            <p>
              One of the key principles of organic farming is the emphasis on maintaining healthy soils. Organic farmers use techniques such as crop rotation, cover cropping, and composting to improve soil structure and fertility. These practices not only enhance the nutrient content of the soil but also reduce erosion and runoff, leading to cleaner water sources. By fostering a diverse soil ecosystem, organic farming contributes to greater resilience against climate change and environmental degradation.
            </p>

            <h2>Biodiversity and Ecosystem Health</h2>
            <p>
              Additionally, organic farming promotes biodiversity by providing habitats for various species, including beneficial insects and wildlife. This approach minimizes monoculture—the cultivation of a single crop over a large area—which is detrimental to the environment. By diversifying crops, organic farms can improve ecosystem health, reduce pest outbreaks, and enhance resilience to diseases. This biodiversity is crucial for sustainable food systems and plays a vital role in ensuring food security.
            </p>

            <h2>Community and Ethical Impact</h2>
            <p>
              Organic farming practices also prioritize the well-being of local communities. By supporting small farmers and local economies, organic agriculture fosters a more equitable food system. Consumers are increasingly seeking products that are not only healthy but also ethically produced. Organic farms often sell directly to consumers through farmers' markets, community-supported agriculture (CSA), and online platforms, allowing consumers to connect with the source of their food and make informed choices.
            </p>

            <h2>Conclusion</h2>
            <p>
              In conclusion, organic farming is a sustainable alternative that addresses the pressing challenges of our time, including climate change, biodiversity loss, and food insecurity. By choosing organic, consumers support practices that are beneficial to both the planet and their communities. Embracing organic agriculture means investing in a healthier future for ourselves, our environment, and the generations to come.
            </p>
        </div>
      </div>

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

export default WhyOrganicSustainable;
