// api/index.js

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// IMPORTANT: We MUST use the base names of the route files here
import productRoutes from '../backend/src/routes/productRoutes.js';
import userRoutes from '../backend/src/routes/userRoutes.js'; 

// Load environment variables (Vercel sets these automatically)
dotenv.config();

// Initialize Express App
const app = express(); 

const MONGO_URI = process.env.MONGO_URI;

// --- CORS Configuration ---
// This middleware is critical. It allows your Frontend (your Vercel domain) 
// to send requests to this API.
app.use(cors()); 

// Middleware
app.use(express.json()); 

// --- DATABASE CONNECTION (Only connect if not already connected) ---
// Note: Serverless environments require connection checks
if (mongoose.connection.readyState === 0) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB connected successfully for serverless function!'))
        .catch(err => console.error('MongoDB connection error:', err));
}


// --- ROUTES ---
// Vercel Serverless functions run everything under the /api/ prefix
// We map them to the Express router, but the request comes in at /api/products, etc.
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes); 

// Simple Test Route (useful for health checks)
app.get('/api', (req, res) => {
    res.send('AuraMart Vercel API is running!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, 
    });
});

// Export the Express app as a Vercel Serverless function handler
export default app;
// api/index.js

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// IMPORTANT: We MUST use the base names of the route files here
import productRoutes from '../backend/src/routes/productRoutes.js';
import userRoutes from '../backend/src/routes/userRoutes.js'; 

// Load environment variables (Vercel sets these automatically)
dotenv.config();

// Initialize Express App
const app = express(); 

const MONGO_URI = process.env.MONGO_URI;

// --- CORS Configuration ---
// This middleware is critical. It allows your Frontend (your Vercel domain) 
// to send requests to this API.
app.use(cors()); 

// Middleware
app.use(express.json()); 

// --- DATABASE CONNECTION (Only connect if not already connected) ---
// Note: Serverless environments require connection checks
if (mongoose.connection.readyState === 0) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB connected successfully for serverless function!'))
        .catch(err => console.error('MongoDB connection error:', err));
}


// --- ROUTES ---
// Vercel Serverless functions run everything under the /api/ prefix
// We map them to the Express router, but the request comes in at /api/products, etc.
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes); 

// Simple Test Route (useful for health checks)
app.get('/api', (req, res) => {
    res.send('AuraMart Vercel API is running!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, 
    });
});

// Export the Express app as a Vercel Serverless function handler
export default app;
