const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const userRoutes = require('./routes/userRoutes');
const categoriesRouter = require('./routes/categoryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'LearnWithUs API',
        version: '1.0.0',
        description: 'LearnWithUs API documentation'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server'
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // Optional, for clarity
            },
        },
    }
};

// Options for swagger-jsdoc
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/user', userRoutes);
app.use('/category', categoriesRouter);

module.exports = app;