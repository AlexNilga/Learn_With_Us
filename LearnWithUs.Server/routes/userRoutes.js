const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');


// Create user
router.post('/', userController.createUser);

// Login
router.post('/login', userController.loginUser);

// Get user by ID
router.get('/:id', authenticateToken, (req, res) => { userController.getUserById(req, res) });

// Get all users
router.get('/', authenticateToken, (req, res) => { userController.getAllUsers(req, res) });


module.exports = router;