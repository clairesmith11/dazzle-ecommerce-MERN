import express from 'express';
import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';

const router = express.Router();

/////GET ALL PRODUCTS/////
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
}));

/////GET PRODUCT BY ID/////
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    //Check whether the product was found for the supplied ID
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }

}));

/////CREATE NEW PRODUCT/////
router.post('/', asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);

    res.json({ product: newProduct });
}));

export default router;