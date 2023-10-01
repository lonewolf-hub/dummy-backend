const Subcategory = require('../models/subcategoryModel');

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { subcategory, category, title, image } = req.body;
    const newSubcategory = new Subcategory({ subcategory, category, title, image });
    await newSubcategory.save();

    // Push the subcategory reference to the associated category
    await Category.findByIdAndUpdate(category, { $push: { subcategories: newSubcategory._id } });

    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(500).json({ error: 'Error creating subcategory' });
  }
};

// Get all subcategories
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subcategories' });
  }
};

// Get a single subcategory by ID
exports.getSubcategoryById = async (req, res) => {
  const subcategoryId = req.params.id;
  try {
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subcategory' });
  }
};

// Update a subcategory by ID
exports.updateSubcategory = async (req, res) => {
  const subcategoryId = req.params.id;
  try {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      req.body,
      { new: true }
    );
    if (!updatedSubcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ error: 'Error updating subcategory' });
  }
};

// Delete a subcategory by ID
exports.deleteSubcategory = async (req, res) => {
  const subcategoryId = req.params.id;
  try {
    const deletedSubcategory = await Subcategory.findByIdAndRemove(subcategoryId);
    if (!deletedSubcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    // Remove the subcategory reference from the associated category
    await Category.findByIdAndUpdate(deletedSubcategory.category, {
      $pull: { subcategories: deletedSubcategory._id },
    });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting subcategory' });
  }
};
