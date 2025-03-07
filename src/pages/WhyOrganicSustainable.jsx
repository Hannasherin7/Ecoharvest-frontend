import React from 'react';
import NavBar from '../Components/Layout/NavBar';
import { Link } from 'react-router-dom';

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
    margin: "20px 0",
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

export default WhyOrganicSustainable;
