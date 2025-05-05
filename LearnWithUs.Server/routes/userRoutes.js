const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/authenticateToken');
const userController = require('../controllers/userController');

// Create user
router.post('/', authenticateToken, (req, res) => { userController.createUser(req, res)});

// Profile
router.post('/login', userController.loginUser);

// Get user by ID
router.get('/:id', authenticateToken, (req, res) => { userController.getUserById(req, res) });

// Get all users
router.get('/', authenticateToken, (req, res) => { userController.listUsers(req, res) });


module.exports = router;