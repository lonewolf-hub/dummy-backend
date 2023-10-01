const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  subcategory: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: String,
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
