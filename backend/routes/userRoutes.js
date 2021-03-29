import express from 'express';

import * as userController from '../controllers/userController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', userController.registerNewUser);
router.post('/login', userController.loginUser);

router.route('/profile')
    .get(authMiddleware.protectRoute, userController.getUserById)
    .patch(authMiddleware.protectRoute, userController.updateUser);

router.get('/wishlist', authMiddleware.protectRoute, userController.getUserWishlist);
router.route('/:productId/wishlist')
    .post(authMiddleware.protectRoute, userController.addItemToWishlist)
    .delete(authMiddleware.protectRoute, userController.deleteProductFromWishlist);

export default router;