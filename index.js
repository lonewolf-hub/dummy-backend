const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/categoryRoute');
const subcategoryRoutes = require('./routes/subcategoryRoute');

const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());

// Use the Category Routes
app.use('/categories', categoryRoutes);
app.use('/subcategories', subcategoryRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
