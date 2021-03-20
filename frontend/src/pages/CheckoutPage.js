import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import StateSelector from '../components/StateSelector';
import CheckoutSummary from '../components/CheckoutSummary';
import { saveShippingAddress } from '../actions/bagActions';
import Breadcrumbs from '../components/Breadcrumbs';

const CheckoutPage = ({ history }) => {
    const bag = useSelector(state => state.bag);
    const { bagItems, shippingAddress } = bag;
    const totalPrice = bagItems.reduce((acc, cur) => (acc + (cur.price * cur.quantity)), 0);
    const shippingPrice = totalPrice < 200 ? 9.99 : 0;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [usState, setUsState] = useState(shippingAddress.state);
    const [zipCode, setZipCode] = useState(shippingAddress.zipCode);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, usState, zipCode }));
        history.push('/payment');
    };

    return (
        <div>
            <h2>Check out</h2>
            <div className="d-flex mb-4">
                <Breadcrumbs page='info' />
            </div>
            <Row className="gy-5">
                <Col md={6}>
                    <h5>Shipping address</h5>
                    <Form className="my-3" onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>

                        <div className="d-flex">
                            <Form.Group className="mr-1">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)} />
                            </Form.Group>

                            <StateSelector changed={setUsState} />

                            <Form.Group className="ml-1">
                                <Form.Label>Zip code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter zip code"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)} />
                            </Form.Group>
                        </div>
                        <Button
                            variant="primary"
                            type="submit"
                            className="my-3"
                        >Continue</Button>
                    </Form>
                </Col>
                <Col md={5} className="bg-light p-4 ml-5">
                    <div>
                        {bagItems.map(item => <CheckoutSummary item={item} key={item.product} />)}
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Shipping</p>
                        <p>${shippingPrice}</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h5>Total</h5>
                        <h5><strong>${(totalPrice + shippingPrice).toFixed(2)}</strong></h5>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CheckoutPage;
