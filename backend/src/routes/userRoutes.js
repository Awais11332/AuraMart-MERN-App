// backend/src/routes/userRoutes.js

import express from 'express';
import { authUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

// POST /api/users for registration
router.route('/').post(registerUser); 
// POST /api/users/login for login
router.post('/login', authUser); 

export default router;