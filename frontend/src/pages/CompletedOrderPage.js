import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';

const CompletedOrderPage = ({ match }) => {
    const userDetails = useSelector(state => state.user);
    const { user } = userDetails;
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

                //Check if signed in user is the same as the user who placed this order
                if (data.user !== user.id) {
                    setError('Not authorized');
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.response.data.message);
            }

        };

        fetchOrder();

    }, [match, user]);

    return (
        <div>
            {loading ? <LoadingSpinner />
                : !loading && !error && orderData ?
                    <Row className="my-5 gy-5">
                        <h2 className="my-3">Order {match.params.id.toUpperCase()}</h2>
                        <Col md={6}>
                            <ListGroup>
                                <h5 className="my-3">Shipping Details</h5>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    <p className="m-0"><strong>Name: </strong>{user.name}</p>
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
                                    <p className="m-0 d-flex"><strong>Status: </strong>
                                        {orderData.isShipped
                                            ? <p className="text-success mx-1">Your order has shipped!</p>
                                            : <p className="text-danger mx-1">We are still preparing your order</p>}
                                    </p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={6}>
                            <ListGroup>
                                <h5 className="my-3">Order Items</h5>
                                {orderData.products.map(product => {
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
                                ${orderData.tax}
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    <p className="m-0"><strong>Total price: </strong></p>
                                ${(orderData.totalPrice).toFixed(2)}
                                </ListGroup.Item>
                            </ListGroup>

                        </Col>
                    </Row>
                    : <Message type="warning" message={error} />}
        </div>
    );
};

export default CompletedOrderPage;
