import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';


/////GET ALL PRODUCTS/////
//All users: No authentication//
export const getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = +req.query.pageNumber || 1;
    // Check for keyword search term and allow for partial word match
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};
    //Get number of documents for pagination and find products that match the keyword
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

/////GET PRODUCTS BY CATEGORY/////
//All users: No authentication//
export const getProductsByCategory = asyncHandler(async (req, res) => {
    //Check for a category and set page size limit
    const cat = req.query.category ? req.query.category : {};
    const pageSize = 8;
    const page = +req.query.pageNumber || 1;
    //Return documents matching the searched category and limit results per page
    const count = await Product.countDocuments({ category: cat });
    const products = await Product.find({ category: cat }).limit(pageSize).skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

/////GET TOP RATED PRODUCTS/////
//All users: No authentication//
export const getTopRatedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
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
    //Create a dummy product for admin to update
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
    //Check for product and upate with new information supplied by user
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

    res.send({
        message: 'Item deleted'
    });
});

/////CREATE NEW REVIEW/////
//Protected route//
export const createReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    //Check whether there is a product with that ID and whether user has already reviewed it
    if (product) {
        const submittedReview = product.reviews.find(review => review.user.toString() === req.user._id.toString());
        if (submittedReview) {
            res.status(400);
            throw new Error('You have already submitted a review for this product');
        }
        // Create new review instance
        const review = {
            name: req.user.name,
            rating: +rating,
            comment,
            user: req.user._id
        };
        // Add the new review to the array of reviews on the product
        product.reviews.push(review);
        // Calculate the average rating based on the number of reviews
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, cur) => cur.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }

});