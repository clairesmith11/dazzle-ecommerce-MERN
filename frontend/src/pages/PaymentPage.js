import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Breadcrumbs from '../components/Breadcrumbs';
import { savePaymentMethod } from '../actions/bagActions';

const PaymentPage = ({ history }) => {
    const dispatch = useDispatch();
    const bag = useSelector(state => state.bag);
    const { shippingAddress } = bag;
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const savePaymentHandler = () => {
        dispatch(savePaymentMethod(paymentMethod));
        if (!shippingAddress) {
            history.push('/checkout');
        } else {
            history.push('/order');
        }
    };

    return (
        <div>
            <h2>Payment</h2>
            <div className="d-flex mb-4">
                <Breadcrumbs page='payment' />
            </div>
            <Form onSubmit={savePaymentHandler}>
                <Form.Group>
                    <Form.Label><strong>Select Payment Method</strong></Form.Label>
                    <Form.Check
                        type="radio"
                        label="Paypal"
                        name="payment"
                        value="Paypal"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Form.Check
                        type="radio"
                        label="Stripe"
                        name="payment"
                        value="Stripe"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Continue</Button>
            </Form>
        </div>
    );
};

export default PaymentPage;
