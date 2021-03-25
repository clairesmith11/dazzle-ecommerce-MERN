import express from 'express';

import * as orderController from '../controllers/orderController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware.protectRoute, orderController.createOrder);
router.get('/my-orders', authMiddleware.protectRoute, orderController.getUserOrders);
router.get('/:id', authMiddleware.protectRoute, orderController.getOrderById);
router.patch('/:id/pay', authMiddleware.protectRoute, orderController.updateOrderToPaid);


export default router;