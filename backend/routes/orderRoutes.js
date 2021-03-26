import express from 'express';

import * as orderController from '../controllers/orderController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(authMiddleware.protectRoute, authMiddleware.isAdmin, orderController.getAllOrders)
    .post(authMiddleware.protectRoute, orderController.createOrder);
router.get('/my-orders', authMiddleware.protectRoute, orderController.getUserOrders);
router.get('/:id', authMiddleware.protectRoute, orderController.getOrderById);
router.patch('/:id/pay', authMiddleware.protectRoute, authMiddleware.isAdmin, orderController.updateOrderToPaid);
router.patch('/:id/shipped', authMiddleware.protectRoute, authMiddleware.isAdmin, orderController.updateOrderToShipped);


export default router;