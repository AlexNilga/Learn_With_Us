const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const userRoutes = require('./routes/userRoutes');
const categoriesRouter = require('./routes/categoryRoutes');
const contentsRouter = require('./routes/contentRoutes');

const app = express();
// Enable CORS with exposed headers to make 'Content-Disposition' accessible to the client
app.use(cors({exposedHeaders: ['Content-Disposition']}));
app.use(express.json({ encoding: 'utf-8' }));
app.use(express.urlencoded({ extended: true, encoding: 'utf-8' }));

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
app.use('/content', contentsRouter);

module.exports = app;