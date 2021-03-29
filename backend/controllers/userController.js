import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { createToken } from '../utils/token.js';


/////LOGIN EXISTING USERS/////
//All users: No authentication//
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //Check if user email address exists in DB
    if (!user) {
        res.status(404);
        throw new Error('Invalid email address');
    }

    //Compare entered password to hashed password in DB
    const matchedPassword = await (bcrypt.compare(password, user.password));
    if (!matchedPassword) {
        res.status(404);
        throw new Error('Invalid password');
    }

    res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        wishlist: user.wishlist,
        token: createToken(user._id)
    });
});

/////REGISTER NEW USERS/////
//All users: No authentication//
export const registerNewUser = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error('A user with this email already exists. Please log in.');
    }

    const newUser = await User.create({
        name,
        email,
        password
    });

    res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        wishlist: newUser.wishlist,
        token: createToken(newUser._id)
    });

});

/////SHOW USER'S PROFILE/////
//Protected route: only user with valid token//
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    res.send(req.user);
});

/////UPDATE USER'S PROFILE/////
//Protected route: only user with valid token//
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.password = req.body.password;
    } else {
        res.status(404);
        throw new Error('Could not find user with that ID');
    }

    const updatedUser = await user.save();

    res.json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: createToken(updatedUser._id)
    });
});

export const getUserWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    } else {
        res.json(user.wishlist);
    }
});

/////ADD ITEM TO USER WISHLIST/////
//Protected route//
//api/user/:productId/wishlist
export const addItemToWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const product = await Product.findById(req.params.productId);

    if (product) {
        const wishlistedProduct = user.wishlist.find(item => item._id.toString() === req.params.productId.toString());
        if (wishlistedProduct) {
            res.status(400);
            throw new Error('You have already added this product to your list');
        }
        const newWishlistItem = {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image
        };

        user.wishlist.push(newWishlistItem);
        await user.save();
        res.status(201).json(newWishlistItem);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }

});

/////DELETE EXISTING PRODUCT/////
//Admin users only//
export const deleteProductFromWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(item => item._id.toString() !== req.params.productId.toString());
    console.log(req.params.productId);
    user.save();
    res.json({
        message: 'Item deleted'
    });
});