import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';

/////GET ALL ORDERS/////
//Admins only//
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

/////GET SINGLE ORDER BY ID/////
//Protected route//
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'id name');

    //Check whether the order was found for the supplied ID
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }

});

/////GET USER ORDERS BY USER ID/////
//Protected route//
export const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    //Check whether the order was found for the supplied ID
    if (orders) {
        res.status(200).json(orders);
    } else {
        res.status(404);
        throw new Error('Orders not found');
    }

});

/////CREATE NEW Order/////
//Protected route//
export const createOrder = asyncHandler(async (req, res) => {
    const newOrder = await Order.create(req.body);

    res.status(201).json({ order: newOrder });
});

/////Update Order to paid/////
//Admin only//
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    // Add payment details to order instance
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            updateTime: req.body.update_time,
            email: req.body.payer.email_address
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }

});

/////Update Order to shipped/////
//Admin only//
export const updateOrderToShipped = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    //Add shipping info to order instance
    if (order) {
        order.isShipped = true;
        order.shippedAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }

});