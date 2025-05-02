const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    ValidationError,
    UniqueConstraintError
} = require('sequelize');

const db = require('../models');
const User = db.User;

const config = require('../config/config');
const e = require('express');


/// <summary>
/// Creates a new user
/// </summary>
exports.createUser = async (req, res) => {

    const { username, password, role, firstName, lastName } = req.body;
    const hash = await bcrypt.hash(password, 10);

    if (role === 'Admin' && !req.user?.isAdmin) {
        return res.status(403).json({ error: 'You are not authorized to create an admin user' });
    }

    try {
        const user = await User.create(
            {
                username: username,
                role: role,
                password: hash,
                firstName: firstName,
                lastName: lastName,
            }
        );
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
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    isAdmin: user.role === 'Admin'
                },
                config.jwt.secret,
                { expiresIn: config.jwt.expiresIn }
            );
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to find the user' });
    }
};

/// <summary>
/// Finds a user by ID
/// </summary>
exports.getUserById = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User was not found' });
        }

        // if (user.id !== req.user.id && !req.user.isAdmin) {
        //     return res.status(403).json({ error: 'You are not authorized to view this user' });
        // }

        res.status(200).json(user.toJSON());

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to find the user' });
    }
}

/// <summary>
/// Finds all users
/// </summary>
exports.getAllUsers = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const users = await User.findAll();
        res.status(200).json(users.map(u => u.toJSON()));

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to find the users' });
    }
}