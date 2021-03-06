import express from 'express';

import Product from '../models/productModel.js';
import * as productController from '../controllers/productController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/////PRODUCT ROUTES/////
router.route('/')
    .get(productController.getAllProducts)
    .post(authMiddleware.protectRoute, authMiddleware.isAdmin, productController.createProduct);

router.get('/collections', productController.getProductsByCategory);
router.get('/top', productController.getTopRatedProducts);

router.post('/:id/reviews', authMiddleware.protectRoute, productController.createReview);

router.route('/:id')
    .get(productController.getProductById)
    .patch(authMiddleware.protectRoute, authMiddleware.isAdmin, productController.editProduct)
    .delete(authMiddleware.protectRoute, authMiddleware.isAdmin, productController.deleteProduct);



export default router;