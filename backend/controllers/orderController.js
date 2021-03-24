import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';


/////GET SINGLE ORDER BY ID/////
//Protected route//
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    //Check whether the order was found for the supplied ID
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }

});

/////CREATE NEW Order/////
//Protected route//
export const createOrder = asyncHandler(async (req, res) => {
    const newOrder = await Order.create(req.body);

    res.status(201).json({ order: newOrder });
});