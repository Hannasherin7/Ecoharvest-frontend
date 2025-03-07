import React, { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import NavBar from "../Components/Layout/NavBar";
import axios from "axios";

const Userhome = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3; // Number of blogs to show per page

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

      {/* Background Image Section */}
      <div style={styles.imageContainer}>
        <img
          src="https://w0.peakpx.com/wallpaper/109/313/HD-wallpaper-farming-nature-sky-agriculture.jpg"
          alt="Farming Background"
          style={styles.image}
        />
        <div style={styles.imageStackedContainer}>
          <div style={styles.bgImage}>
            <div style={styles.textOverlay}>
              <h1 style={styles.title}>EcoHarvest</h1>
              <h2 style={styles.subtitle}>
                Marketplace for organic goods with yield forecasting tools
              </h2>
            </div>
            <div style={styles.textOverlayBottom}>
              <h3 style={styles.welcomeMessage}>Welcome to the Marketplace!</h3>
              <p style={styles.subMessage}>
                Your one-stop shop for all things organic.
              </p>
            </div>
          </div>
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
      <footer style={styles.footer}>
        <p>&copy; 2025 EcoHarvest. All rights reserved.</p>
        <p>
          Follow us on
          <a href="https://facebook.com" style={styles.link}>
            {" "}
            Facebook
          </a>
          ,
          <a href="https://instagram.com" style={styles.link}>
            {" "}
            Instagram
          </a>
          , and
          <a href="https://twitter.com" style={styles.link}>
            {" "}
            Twitter
          </a>
          .
        </p>
        <p>
          <Link to="/contact" style={styles.link}>
            Contact Us
          </Link>{" "}
          |
          <Link to="/about" style={styles.link}>
            About Us
          </Link>
        </p>
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
    margin: "20px",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "500px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  textOverlay: {
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
  },
  textOverlayBottom: {
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: "translateX(-50%)",
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
  welcomeMessage: {
    fontSize: "30px",
    margin: "10px 0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  subMessage: {
    fontSize: "18px",
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
