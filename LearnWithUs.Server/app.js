const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const categoriesRouter = require('./routes/categoryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/category', categoriesRouter);

module.exports = app;