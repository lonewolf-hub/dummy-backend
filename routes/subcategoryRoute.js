const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

// Create a new subcategory
router.post('/', subcategoryController.createSubcategory);

// Get all subcategories
router.get('/', subcategoryController.getAllSubcategories);

// Get a single subcategory by ID
router.get('/:id', subcategoryController.getSubcategoryById);

// Update a subcategory by ID
router.put('/:id', subcategoryController.updateSubcategory);

// Delete a subcategory by ID
router.delete('/:id', subcategoryController.deleteSubcategory);

module.exports = router;
