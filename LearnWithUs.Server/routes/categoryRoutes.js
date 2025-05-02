const express = require('express');
const router = express.Router();

const {
    ValidationError,
    UniqueConstraintError
} = require('sequelize');

const categoryController = require('../controllers/categoryController');

// Create category
router.post('/', categoryController.createCategory);

// Get category by ID
router.get('/:id', categoryController.getCategory);


module.exports = router;