import React, { useEffect, useState } from "react";
import axios from "axios";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:7000/blogs/all",
            {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            ); 
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>All Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <img src={`http://localhost:7000/${blog.image}`} alt={blog.title} />
          <p>{blog.content}</p>
          <p>By: {blog.userId.name}</p>
        </div>
      ))}
    </div>
  );
};

export default AllBlogs;