import React from "react";

const AboutUsF = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <h1 style={styles.heading}>About Us</h1>
        <p style={styles.paragraph}>
          Welcome to <strong>EcoHarvest</strong>, your trusted partner in
          sustainable agriculture. We are dedicated to providing high-quality
          seeds, fertilizers, and farming solutions to help farmers and
          gardeners grow healthier crops and contribute to a greener planet.
        </p>
        <p style={styles.paragraph}>
          Our mission is to empower farmers with the best agricultural products
          and knowledge, ensuring sustainable farming practices and improved
          yields. With years of experience in the industry, we understand the
          challenges faced by farmers and strive to offer innovative solutions
          tailored to their needs.
        </p>
        <p style={styles.paragraph}>
          At EcoHarvest, we believe in the power of nature and technology
          working hand in hand. Our team of experts is committed to delivering
          products that are eco-friendly, affordable, and effective. Join us in
          our journey to create a better future for agriculture.
        </p>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  contentContainer: {
    maxWidth: "800px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#4caf50",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "20px",
  },
};

export default AboutUsF;