const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const mongoose = require('mongoose');
// // const Blog = require('./model/blog'); // Import the Blog schema
// // const multer = require("multer");
// // const fs = require('fs');
// // const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;
// // dotenv.config();

// // app.use(bodyParser.json());
// // app.use(cors({
// //       origin: '*'
// // }));


// // Serve static files from the 'uploads' directory to client
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// const upload = multer({ dest: "uploads/" });
// // app.post("/upload_files", upload.single('Image'), uploadFiles);
// // function uploadFiles(req, res) {
// //     console.log(req.body);
// //     console.log(req.file);
// //     res.json({ message: "Successfully uploaded files" });
// // }


// const CONNECTION =process.env.MONGO_URL;
// mongoose
//   .connect(CONNECTION)
//   .then(() => console.log("Connected to database"))
//   .catch((error) => console.log(`${error} did not connect`));


app.get('/',async(req,res)=>{
  res.status(200).json("server is running");
})
// // Route to create a new blog
// app.post('/create_blog',upload.single('Image'), async (req, res) => {
//     try {
//       const { title, description } = req.body;
    
//         let imagename = '';
//         if (req.file) {
//             imagename = req.file.path;
//         }
//         const newBlog = new Blog({
//             title: title,
//             description: description,
//             image: imagename // Assign the image path to the Blog model
//         });
//         await newBlog.save();
//         console.log(req.file)
//         console.log(newBlog)
//       res.status(201).json(newBlog);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
// });
  
// // API - get all blogs
// app.get('/blog/all', async (req, res) => {
// try {
//     const blogs = await Blog.find();
//     res.status(200).json(blogs);
// } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
// }
// });
  
// //specific blog by ID
// app.get('/blog/:id', async (req, res) => {
// try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//     return res.status(404).json({ message: 'Blog not found' });
//     }
//     res.status(200).json(blog);
// } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
// }
// });
// //specific blog by ID
// // app.get('/blog/:id', async (req, res) => {
// //     try {
// //         const blog = await Blog.findById(req.params.id);
// //         if (!blog) {
// //             return res.status(404).json({ message: 'Blog not found' });
// //         }
// //         if (blog.image=='') {
// //             // If there's no image, return an empty string for the image field
// //             const responseData = {
// //                 _id: blog._id,
// //                 title: blog.title,
// //                 description: blog.description,
// //                 image: '' // Return an empty string for the image
// //             };
            
// //             // Send the response with the blog details and empty image data
// //             return res.status(200).json(responseData);
// //         }

// //         // Read the image file asynchronously
// //         fs.readFile(blog.image, (err, data) => {
// //             if (err) {
// //                 console.error(err);
// //                 return res.status(500).json({ message: 'Error reading image file' });
// //             }

// //             // Convert the image data to base64
// //             const imageData = Buffer.from(data).toString('base64')
            
// //             // Create a new object containing blog details and image data
// //             const responseData = {
// //                 _id: blog._id,
// //                 title: blog.title,
// //                 description: blog.description,
// //                 image: imageData // Include the base64-encoded image data
// //             };
            
// //             // Send the response with the blog details and image data
// //             res.status(200).json(responseData);
// //         });
// //     } catch (error) {
// //         // If an error occurs, return a 500 status with an error message
// //         console.error(error);
// //         res.status(500).json({ message: 'Internal Server Error' });
// //     }
// // });


  
// //update a specific blog by ID
// app.put('/update_blog/:id', upload.single('Image'), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     let updateData = { title, description };
    
//     // Check if a new image is provided in the request
//     if (req.file) {
//       updateData.image = req.file.path; // Update image path if new image is provided
//     }

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       updateData, // Use updateData to update the blog
//       { new: true }
//     );

//     if (!updatedBlog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }
//     res.status(200).json(updatedBlog);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

  
// //delete a specific blog by ID
// app.delete('/delete_blog/:id', async (req, res) => {
// try {
//     const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
//     if (!deletedBlog) {
//     return res.status(404).json({ message: 'Blog not found' });
//     }
//     res.status(200).json({ message: 'Blog deleted successfully' });
// } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
// }
// });

app.listen(PORT, () => 
console.log(`Listening at Port ${PORT}`))