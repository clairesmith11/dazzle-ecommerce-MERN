import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import CheckoutItem from './CheckoutItem';

const CheckoutSummary = () => {
    const bag = useSelector(state => state.bag);
    const { bagItems } = bag;

    const itemsPrice = bagItems.reduce((acc, cur) => (acc + (cur.price * cur.quantity)), 0);
    const shippingPrice = itemsPrice < 200 ? 9.99 : 0;
    const taxesPrice = +(itemsPrice * 0.07).toFixed(2);
    const totalPrice = +(itemsPrice + shippingPrice + taxesPrice).toFixed(2);

    return (
        <Col md={5} className="bg-light p-4 ml-5">
            <div>
                {bagItems.map(item => <CheckoutItem item={item} key={item.product} />)}
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <p>Subtotal</p>
                <p>${itemsPrice}</p>
            </div>
            <div className="d-flex justify-content-between">
                <p>Taxes</p>
                <p>${taxesPrice}</p>
            </div>
            <div className="d-flex justify-content-between">
                <p>Shipping</p>
                <p>${shippingPrice}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <h5>Total</h5>
                <h5><strong>${totalPrice}</strong></h5>
            </div>
        </Col>
    );
};

export default CheckoutSummary;
