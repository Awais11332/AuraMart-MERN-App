// backend/src/controllers/productController.js

// 🚨 FIX: Ensure the .js extension is included here 
import Product from '../models/ProductModel.js'; 

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        // More descriptive error handling for debugging
        console.error(error); 
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            // Note: Mongoose might throw an error instead of returning null for invalid ID format
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        // More descriptive error handling for debugging
        console.error(error); 
        res.status(500).json({ message: 'Server Error' });
    }
};

export { getProducts, getProductById };