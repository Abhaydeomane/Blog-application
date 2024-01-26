// BlogList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // Fetch all blogs when the component mounts
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blog/all');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Function to navigate to the CreateBlogForm page
  const goToCreateBlog = () => {
    navigate('/create');
  };

  return (
    <div>
      <h1>Blog Post Application</h1>
      {/* Button to navigate to the CreateBlogForm page */}
      <button onClick={goToCreateBlog}>Create Blog</button>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <Link to={`/blogs/${blog._id}`}>
              <h5>{blog.title}</h5>
            </Link>
            {/* <p>{blog.description}</p>
            <img src={blog.image} alt={blog.title} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
