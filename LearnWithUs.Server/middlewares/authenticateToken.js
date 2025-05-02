const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        req.user = null; // No token, proceed unauthenticated
        return next();
    }

    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    });
};