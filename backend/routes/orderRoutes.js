import express from 'express';

import Order from '../models/orderModel.js';
import * as orderController from '../controllers/orderController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware.protectRoute, orderController.createOrder);
router.get('/:id', authMiddleware.protectRoute, orderController.getOrderById);

export default router;