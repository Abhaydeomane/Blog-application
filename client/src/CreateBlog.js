// CreateBlogForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const CreateBlogForm = ({ fetchBlogs }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleCreateBlog = async () => {
    try {
      if (!title.trim()) {
        window.alert('Please provide a title for the blog.');
        return; // Exit the function if the title is empty
      }    
      // const formData = new FormData(); // Create a FormData object to send the image file
      // formData.append("title", title);
      // formData.append("description", description);
      // formData.append('Image', image);
      // console.log(formData)
      axios.post('https://blog-application-server-eight.vercel.app/create_blog', {title,description,image});

      // Clear the form fields
      // console.log(formData)
      setTitle('');
      setDescription('');
      setImage('');
      
      // Navigate to the home page after successful blog creation
      navigate('/');
    } catch (error) {
      console.error('Error creating blog:', error);
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

  const goToHomepage = () => {
    // Navigate to the home page
    navigate('/');
  };

  return (
    <div>
      <h2>Create a Blog</h2>
      <label>Title:</label>
      <textarea value={title} onChange={(e) => setTitle(e.target.value)}/>
      <br />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <br />
      {/* Input for image upload */}
      <label>Image:</label>
      <input type="file" onChange={handleImageChange} />
      <br />
      <button onClick={handleCreateBlog}>Create Blog</button>
      {/* Button to go to the homepage */}
      <button onClick={goToHomepage}>Go to Homepage</button>
    </div>
  );
};

export default CreateBlogForm;
