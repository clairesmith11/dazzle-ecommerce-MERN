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
    const product = new Product({
        name: 'My New Product',
        image: '/images/sample.jpg',
        description: 'My new product',
        category: 'none',
        price: 0,
        inStock: 0,
        rating: 0,
        numReviews: 0,
        sale: false
    });

    const newProduct = await product.save();

    res.status(201).json({ product: newProduct });
});

/////EDIT PRODUCT/////
//Admin users only//
export const editProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, category, sale, inStock, salePrice } = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.category = category;
        product.sale = sale;
        product.salePrice = salePrice;
        product.inStock = inStock;

        const updatedProduct = await product.save();
        res.json({ product: updatedProduct });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }


});

/////DELETE EXISTING PRODUCT/////
//Admin users only//
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.json({
        message: 'Item deleted'
    });
});
