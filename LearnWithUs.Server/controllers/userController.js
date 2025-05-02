const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    ValidationError,
    UniqueConstraintError
} = require('sequelize');

const db = require('../models');
const User = db.User;

const SECRET_KEY = 'supersecretkey'; // Use env vars in production

/// <summary>
/// Creates a new user
/// </summary>
exports.createUser = async (req, res) => {
    const { username, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ username: username, role: role, password: hash });
        res.status(201).json(user.toJSON());
    } catch (err) {

        if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
            const errors = err.errors.map(e => e.message);
            return res.status(400).json({ errors });
        }

        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

/// <summary>
/// Logs in a user and returns a JWT token
/// </summary>
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to find the user' });
    }
};