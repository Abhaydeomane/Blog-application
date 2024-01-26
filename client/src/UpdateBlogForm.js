// UpdateBlogForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBlogForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    // Fetch the specific blog when the component mounts
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`https://blog-application-server-eight.vercel.app/blog/${id}`);
      const blogData = response.data;
      setTitle(blogData.title);
      setDescription(blogData.description);
      setImage(blogData.image);
    } catch (error) {
      console.error('Error fetching blog details for update:', error);
      // Navigate to home page if the blog is not found
      navigate('/');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      await axios.put(`https://blog-application-server-eight.vercel.app/update_blog/${id}`,{title,description,image});
      navigate('/');
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div>
      <h2>Update Blog Form</h2>
      <label>Title:</label>
      <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <br />
      {/* Input for image upload */}
      <label>Image:</label>
      <input type="file" onChange={handleImageChange} />
      <br />
      <button onClick={handleUpdateBlog}>Update Blog</button>
    </div>
  );
};

export default UpdateBlogForm;
