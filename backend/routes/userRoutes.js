import express from 'express';

import User from '../models/userModel.js';
import * as userController from '../controllers/userController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', userController.registerNewUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware.protectRoute, userController.getUserById);

export default router;