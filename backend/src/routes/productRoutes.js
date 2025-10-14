// backend/src/routes/productRoutes.js

import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// Define routes using the controller functions
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;