import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import CheckoutItem from './CheckoutItem';

const CheckoutSummary = () => {
    const bag = useSelector(state => state.bag);
    const { bagItems } = bag;

    //Function for rounding all prices to two decimal places
    const roundNumbers = (num) => {
        return num.toFixed(2);
    };

    const itemsPrice = bagItems.reduce((acc, cur) => (acc + (cur.price * cur.quantity)), 0);
    const shippingPrice = itemsPrice < 200 ? 9.99 : 0;
    const taxesPrice = roundNumbers((+itemsPrice * 0.07));
    const totalPrice = roundNumbers((+itemsPrice + +shippingPrice + +taxesPrice));

    return (
        <Col md={5} className="checkout-summary bg-light p-4 ml-5">
            <div>
                {bagItems.map(item => <CheckoutItem item={item} key={item.product} />)}
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <p>Subtotal</p>
                <p>${roundNumbers(+itemsPrice)}</p>
            </div>
            <div className="d-flex justify-content-between">
                <p>Taxes</p>
                <p>${roundNumbers(+taxesPrice)}</p>
            </div>
            <div className="d-flex justify-content-between">
                <p>Shipping</p>
                <p>${shippingPrice}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <h5>Total</h5>
                <h5><strong>${roundNumbers(+totalPrice)}</strong></h5>
            </div>
        </Col>
    );
};

export default CheckoutSummary;
