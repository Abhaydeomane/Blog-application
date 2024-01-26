// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateBlog from './CreateBlog';
import BlogDetailsPage from './BlogDetailsPage';
import Homepage from './Homepage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blogs/:id" element={<BlogDetailsPage />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
