const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());
//data  base connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
const projectRoutes = require('./routes/project');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');

//use routes
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contactme', contactRoutes);
//server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
