const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Blog = require('./model/blog'); // Import the Blog schema
const { put } = require('@vercel/blob'); // Import the put function from @vercel/blob


const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
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
    console.log(req.body);

    let imageUrl = ''; // Default to empty string for imageUrl
    console.log("2");
    // Check if image data is provided
    if (image) {
      // Convert base64 image data to a buffer
      const imageData = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

      // Generate a unique filename using uuidv4
      const uniqueFilename = uuidv4();
      // Assume the image is PNG format for simplicity
      const fileExtension = 'png';

      // Construct the filename with extension
      const filename = `${uniqueFilename}.${fileExtension}`;

      // Upload image to Vercel Blob
      const { url } = await put(`images/${filename}`, imageData, { access: 'public'});

      imageUrl = url; // Set the imageUrl if image data is provided
    }

    // Create a new blog instance
    const newBlog = new Blog({
      title: title,
      description: description,
      image: imageUrl // Assign the URL of the uploaded image or empty string
    });

    // Save the new blog to the database
    // 
    console.log("3")
    console.log(newBlog)
    await newBlog.save();
    // Respond with the newly created blog
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
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
            image: blog.image
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
    // Convert base64 image data to a buffer
    const imageData = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    // Generate a unique filename using uuidv4
    const uniqueFilename = uuidv4();

    // Extract file extension (optional)
    const fileExtension = 'png'; // Example: Assume the image is PNG format

    // Construct the filename with extension
    const filename = `${uniqueFilename}.${fileExtension}`;

    // Upload the image to Vercel Blob storage
    const { url } = await put(`images/${filename}`, imageData, { access: 'public' });
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