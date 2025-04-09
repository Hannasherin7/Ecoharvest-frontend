import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import NavBar from "../Components/Layout/NavBar";
 import {  FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

          
import axios from "axios";

const Userhome = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3; // Number of blogs to show per page

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://media.istockphoto.com/id/1371705013/photo/3d-illustration-of-smart-farming-concept-tractor-on-a-smartphone-farm-online-management-ads.jpg?s=612x612&w=0&k=20&c=fD_RrwKligg6_W1qw3CS9h8clfUy9_8mCLAVL8H3T3o=",
    "https://png.pngtree.com/thumb_back/fh260/background/20240610/pngtree-concept-use-of-the-smart-farmer-system-came-to-help-analysis-image_15746624.jpg",
  ];

  // Automatically change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    navigate("/own/:id");
  };

  // Fetch blogs from the server
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:7000/blogs/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Sort blogs in descending order by createdAt date
        const sortedBlogs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Function to load more blogs
  const loadMoreBlogs = () => {
    setCurrentPage(currentPage + 1);
  };

  // Get the blogs to display based on the current page
  const displayedBlogs = blogs.slice(0, currentPage * blogsPerPage);

  return (
    <div style={styles.body}>
      <NavBar />
      <header style={styles.header}>
        <h1>Welcome to EcoHarvest</h1>
        <p>Your gateway to organic farming and fresh produce</p>
      </header>

      {/* Carousel Section */}
      <div style={styles.carouselContainer}>
        <img
          src={images[currentImageIndex]}
          alt="Carousel"
          style={styles.carouselImage}
        />
        <div style={styles.carouselOverlay}>
          <h1 style={styles.title}>EcoHarvest</h1>
          <h2 style={styles.subtitle}>
            Marketplace for organic goods with yield forecasting tools
          </h2>
        </div>
      </div>

      {/* Blog Cards Section */}
      <h2 style={styles.blogSectionHeading}>🌿 Latest Blogs from Our Community 🌱</h2>
      <div style={styles.cardsContainer}>
        {displayedBlogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          displayedBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        )}
      </div>

      {blogs.length > displayedBlogs.length && (
        <div style={styles.loadMoreContainer}>
          <button onClick={loadMoreBlogs} style={styles.loadMoreButton}>
            Read More Blogs
          </button>
        </div>
      )}

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

// BlogCard Component
const BlogCard = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxContentLength = 150; // Maximum characters to show before truncating

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedContent =
    blog.content.length > maxContentLength
      ? blog.content.slice(0, maxContentLength) + "..."
      : blog.content;

  return (
    <div style={styles.card}>
      <h3>{blog.title}</h3>
      <p style={styles.author}>By: {blog.userId?.name}</p>
      <img
        src={`http://localhost:7000/${blog.image.replace(/^\//, "")}`}
        alt={blog.title}
        style={styles.blogImage}
      />
      <p>
        {isExpanded ? blog.content : truncatedContent}
        {blog.content.length > maxContentLength && (
          <button onClick={toggleExpand} style={styles.readMoreButton}>
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </p>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textAlign: "center",
    padding: "20px",
     borderRadius: "10px",
    // margin: "20px",
  },
  carouselContainer: {
    position: "relative",
    width: "100%",
    height: "500px",
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  carouselOverlay: {
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
  },
  title: {
    fontSize: "48px",
    margin: "10px 0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  subtitle: {
    fontSize: "24px",
    margin: "10px 0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "300px",
    textAlign: "center",
  },
  blogImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  author: {
    fontSize: "14px",
    color: "#555",
    marginTop: "10px",
  },
  readMoreButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#4caf50",
    cursor: "pointer",
    fontSize: "14px",
    marginLeft: "5px",
  },
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    marginTop: "30px",
  },
  link: {
    color: "#4caf50",
    textDecoration: "none",
    marginLeft: "5px",
  },
  blogSectionHeading: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "30px 0 20px",
    color: "#2c3e50",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
  },
  loadMoreContainer: {
    textAlign: "center",
    margin: "20px 0",
  },
  loadMoreButton: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Userhome;