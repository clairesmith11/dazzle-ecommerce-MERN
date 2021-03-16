import express from 'express';

import Product from '../models/productModel.js';
import * as productController from '../controllers/productController.js';

const router = express.Router();

/////PRODUCT ROUTES/////
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProduct);

export default router;