import mongoose from 'mongoose';
import dotenv from 'dotenv';

import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        //Clear out existing data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        //Seed data from data files
        await User.insertMany(users);
        await Product.insertMany(products);

        console.log('Imported your data!');
        process.exit();

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        //Clear out existing data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Deleted your data!');
        process.exit();

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}