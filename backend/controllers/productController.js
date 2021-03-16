import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';


/////GET ALL PRODUCTS/////
//All users: No authentication//
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

/////GET SINGLE PRODUCT BY ID/////
//All users: No authentication//
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    //Check whether the product was found for the supplied ID
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }

});

/////CREATE NEW PRODUCT/////
//Admin users only//
export const createProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);

    res.json({ product: newProduct });
});

/////DELETE EXISTING PRODUCT/////
//Admin users only//
export const deleteProduct = asyncHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
        message: 'Item deleted'
    });
});
