import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import StripePayment from '../components/StripePayment';

const CompletedOrderPage = ({ match }) => {
    const userDetails = useSelector(state => state.user);
    const { user } = userDetails;
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isShipped, setIsShipped] = useState(false);

    const stripePromise = loadStripe(
        'pk_test_51IbsjLFEAqxYQIXj2yLrHQp52SwzauS1fq1Nx6C1Ry05RcSIRcTsO8SzarDsqNcDOYGcWIHDTfQjyS5kPZobze9O00zNmIpAB9'
    );

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            //Fetch order from database
            try {
                const { data } = await axios.get(`/api/orders/${match.params.id}`, {
                    headers:
                        { Authorization: `Bearer ${user.token}` }
                });
                setOrderData(data);
                setIsShipped(data.isShipped);
                //Check if signed in user is the same as the user who placed this order
                if (data.user._id !== user.id && !user.isAdmin) {
                    setError('Not authorized');
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(error.response && error.response.data.message ? error.response.data.message : error.message);
            }

        };
        fetchOrder();
    }, [match, user, error]);

    //Admin button for updating item to shipped status
    const updateToShippedHandler = () => {
        try {
            axios.patch(`/api/orders/${match.params.id}/shipped`, {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setIsShipped(true);
        } catch (err) {
            setError(error.response && error.response.data.message ? error.response.data.message : error.message);
        }

    };

    return (
        <div>
            {loading ? <LoadingSpinner size="large" />
                : !loading && !error && orderData ?
                    <Row className="my-5 gy-5">
                        <h2 className="my-3">Order {match.params.id.toUpperCase()}</h2>
                        <Col md={6}>
                            <ListGroup>
                                <h5 className="my-3">Shipping Details</h5>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    <p className="m-0"><strong>Name: </strong>{orderData.user.name}</p>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    <p className="m-0"><strong>Shipping to: </strong><br />
                                        <p>{orderData.shippingAddress.address}<br />
                                            {orderData.shippingAddress.city}, {orderData.shippingAddress.usState} {orderData.shippingAddress.zipCode}
                                        </p>
                                    </p>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    <p className="m-0"><strong>Payment Method: </strong>{orderData.paymentMethod}</p>
                                </ListGroup.Item>

                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    <p className="m-0 d-flex"><strong>Payment Status: </strong>
                                        {orderData.isPaid
                                            ? <p className="text-success mx-1">Payment received!</p>
                                            : <p className="text-danger mx-1">Awaiting payment</p>}
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    <p className="m-0 d-flex"><strong>Shipping Status: </strong>
                                        {isShipped
                                            ? <p className="text-success mx-1">Order has shipped!</p>
                                            : <p className="text-danger mx-1">Preparing your order</p>}
                                    </p>
                                    {user.isAdmin && <Button disabled={isShipped} className="btn-sm" onClick={updateToShippedHandler} variant="secondary">Update to shipped</Button>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={6}>
                            <ListGroup>
                                <h5 className="my-3">Order Items</h5>
                                {orderData.products && orderData.products.map(product => {
                                    return (

                                        <ListGroup.Item key={product._id} className="d-flex justify-content-between align-items-center">
                                            <p className="m-0"><strong>{product.name}</strong></p>
                                            {product.quantity} x ${product.price} = {(product.quantity * product.price)}
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                            <ListGroup>
                                <h5 className="my-3">Price Summary</h5>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    <p className="m-0"><strong>Shipping price: </strong></p>
                                ${orderData.shippingPrice}
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    <p className="m-0"><strong>Tax: </strong></p>
                                ${orderData.tax.toFixed(2)}
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    <p className="m-0"><strong>Total price: </strong></p>
                                ${(orderData.totalPrice).toFixed(2)}
                                </ListGroup.Item>
                            </ListGroup>
                            <ListGroup>
                                <h5 className="my-3">Make payment</h5>
                                <Elements stripe={stripePromise}>
                                    <StripePayment order={match.params.id} />
                                </Elements>
                            </ListGroup>
                        </Col>
                    </Row>
                    : error && <Message type="warning" message={error} />}
        </div>
    );
};

export default CompletedOrderPage;
