import React from 'react';
import { Image } from 'react-bootstrap';

const CheckoutItem = ({ item }) => {
    return (
        <div className="checkout-summary-item d-flex align-items-center justify-content-between my-2">
            <div>
                <Image style={{ width: '120px' }} src={item.image} thumbnail />
                <span className="badge badge-secondary badge-pill">{item.quantity}</span>
            </div>
            <p className="mx-2">{item.name}</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
        </div>
    );
};

export default CheckoutItem;
