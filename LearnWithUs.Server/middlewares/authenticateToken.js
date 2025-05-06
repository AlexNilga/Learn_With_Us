const jwt = require('jsonwebtoken');
const config = require('../config/config');

const db = require('../models');
const User = db.User;


module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        req.user = null; // No token, proceed unauthenticated
        return next();
    }

    jwt.verify(
        token,
        config.jwt.secret,
        (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            const tokenUser = User.findByPk(
                user.id,
                { attributes: ['id'] }
            );

            if (!tokenUser) {
                return res.status(401).json({ message: "User is not found" });
            }

            req.user = user;
            next();
        }
    );
};