const express = require('express');
const router = express.Router();

const {
    ValidationError,
    UniqueConstraintError
} = require('sequelize');

const authenticateToken = require('../middlewares/authenticateToken');
const categoryController = require('../controllers/categoryController');

// Create category
router.post('/', authenticateToken, (req, res) => { categoryController.createCategory(req, res) });

// Get category by ID
router.get('/:id', authenticateToken, (req, res) => { categoryController.getCategory(req, res) });

// List category by ID
router.get('/', authenticateToken, (req, res) => { categoryController.listCategories(req, res) });


module.exports = router;