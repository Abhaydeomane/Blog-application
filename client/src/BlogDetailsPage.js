// BlogDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UpdateBlogForm from './UpdateBlogForm.js'; // Import the UpdateBlogForm component

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    // Fetch the specific blog when the component mounts
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blog/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog details:', error);
      // Navigate to home page if the blog is not found
      navigate('/');
    }
  };

  const handleUpdateBlog = () => {
    // Implement the update functionality (navigate to the UpdateBlogForm)
    navigate(`/blogs/${id}/update`);
  };

  const handleDeleteBlog = async () => {
    try {
      await axios.delete(`http://localhost:5000/delete_blog/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleHomepage = async () => {
    try {
      navigate('/');
    } catch (error) {
      console.error('Error going home page:', error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.description}</p>
      <img
        src={`http://localhost:5000/${blog.image}`}
        alt={"No Image"}
        style={{ width: '300px', height: '200px' }} // Set the width and height here
      />
      <br />
      <button onClick={handleDeleteBlog}>Delete</button>
      <button onClick={handleHomepage}>Homepage</button>
      {/* Render the UpdateBlogForm component */}
      <UpdateBlogForm />
    </div>
  );
};

export default BlogDetailsPage;
