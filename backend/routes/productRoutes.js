import express from 'express';

import Product from '../models/productModel.js';
import * as productController from '../controllers/productController.js';

const router = express.Router();

/////PRODUCT ROUTES/////
router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct);

router.route('/:id')
    .get(productController.getProductById)
    .delete(productController.deleteProduct);

export default router;