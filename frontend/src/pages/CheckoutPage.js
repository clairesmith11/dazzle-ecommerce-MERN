import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import StateSelector from '../components/StateSelector';
import CheckoutSummary from '../components/CheckoutSummary';
import { saveShippingAddress } from '../actions/bagActions';
import Breadcrumbs from '../components/Breadcrumbs';
import Message from '../components/Message';

const CheckoutPage = ({ history }) => {
    const bag = useSelector(state => state.bag);
    const { shippingAddress } = bag;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [usState, setUsState] = useState(shippingAddress.usState);
    const [zipCode, setZipCode] = useState(shippingAddress.zipCode);
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (address && city && usState && zipCode) {
            dispatch(saveShippingAddress({ address, city, usState, zipCode }));
            history.push('/payment');
        } else {
            setMessage('You must fill out all fields to continue.');
        }

    };

    return (
        <div>
            <h2>Check out</h2>
            <Row className="gy-5">
                <Col md={6}>
                    <div className="d-flex mb-4">
                        <Breadcrumbs page='info' />
                    </div>
                    <h5>Shipping address</h5>
                    {message && <Message type="danger" message={message} />}
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
                                    placeholder="Enter zip"
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
                <CheckoutSummary />
            </Row>
        </div>
    );
};

export default CheckoutPage;
