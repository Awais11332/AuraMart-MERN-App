// backend/server.js

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './src/routes/productRoutes.js';
import userRoutes from './src/routes/userRoutes.js'; 

// Load environment variables from .env file
dotenv.config();

// 🚨 CRUCIAL: Define the Express application instance 🚨
const app = express(); 

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors()); // Allows frontend to make requests
app.use(express.json()); // Allows parsing of JSON body in requests

// --- DATABASE CONNECTION ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- ROUTES ---
// Product Routes (Catalog View)
app.use('/api/products', productRoutes); 

// User/Auth Routes (Login/Register)
app.use('/api/users', userRoutes); 

// Simple Test Route
app.get('/', (req, res) => {
    res.send('AuraMart Backend is running!');
});

// Error Handling Middleware (Catches errors thrown in async controllers)
app.use((err, req, res, next) => {
    // Check if status code was already set by a controller (e.g., 404, 401)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    res.status(statusCode);
    res.json({
        message: err.message,
        // Only show stack trace in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, 
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
