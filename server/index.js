const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Blog = require('./model/blog'); // Import the Blog schema
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob'); // Import the put function from @vercel/blob


const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(bodyParser.json());
app.use(cors({
      origin: '*'
}));

const CONNECTION =process.env.MONGO_URL;
mongoose
  .connect(CONNECTION)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(`${error} did not connect`));


app.get('/',async(req,res)=>{
  res.status(200).json("server is running");
})

// Route to create a new blog
const { v4: uuidv4 } = require('uuid'); // Import the uuidv4 function to generate unique identifiers

// Route to create a new blog
app.post('/create_blog', async (req, res) => {
  try {
    const { title, description, image } = req.body;

    // Generate a unique filename using uuidv4
    const uniqueFilename = uuidv4();
    // Extract file extension
    const fileExtension = image.substring(image.indexOf('/') + 1, image.indexOf(';base64'));

    // Construct the filename with extension
    const filename = `${uniqueFilename}.${fileExtension}`;

    // Upload image to Vercel Blob
    const { url } = await put(`images/${filename}`, image, { access: 'public' });

    const newBlog = new Blog({
      title: title,
      description: description,
      image: url // Assign the URL of the uploaded image to the Blog model
    });

    await newBlog.save();
    console.log(newBlog);
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

  
// API - get all blogs
app.get('/blog/all', async (req, res) => {
try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
    // res.status(200).json("yeas all blogs");
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
});
  
// specific blog by ID
app.get('/blog/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        // If there's no image, return an empty string for the image field
        const responseData = {
            _id: blog._id,
            title: blog.title,
            description: blog.description,
            image: '' // Return an empty string for the image
        };
        
        // Send the response with the blog details and empty image data
        return res.status(200).json(responseData);
    } catch (error) {
        // If an error occurs, return a 500 status with an error message
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


  
// update a specific blog by ID
app.put('/update_blog/:id', async (req, res) => {
  try {
    const { title, description, image } = req.body;
    let updateData = { title, description };

    // Check if a new image is provided in the request
    if (image) {
      // Generate a unique filename for the new image
      const uniqueFilename = uuidv4();
      // Extract file extension
      const fileExtension = image.substring(image.indexOf('/') + 1, image.indexOf(';base64'));
      // Construct the filename with extension
      const filename = `${uniqueFilename}.${fileExtension}`;

      // Upload the new image to Vercel Blob
      const { url } = await put(`avatars/${filename}`, image, { access: 'public' });
      // Update the image URL in the updateData
      updateData.image = url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData, // Use updateData to update the blog
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


  
//delete a specific blog by ID
app.delete('/delete_blog/:id', async (req, res) => {
try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
    return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
});

app.listen(PORT, () => 
console.log(`Listening at Port ${PORT}`))