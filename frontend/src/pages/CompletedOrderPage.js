import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';

const CompletedOrderPage = ({ match }) => {
    const userDetails = useSelector(state => state.user);
    const { user } = userDetails;

    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isShipped, setIsShipped] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
        //Get paypal client id from server
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        //Fetch order from database
        const fetchOrder = async () => {
            setLoading(true);
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
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            }

        };

        if (!orderData || isPaid) {
            fetchOrder();
        } else if (!orderData.isPaid) {
            if (!window.paypal) {
                try {
                    addPaypalScript();
                } catch (err) {
                    setError(err);
                }

            }
        } else {
            setSdkReady(true);
        }

    }, [match, user, error, isPaid, orderData]);

    //Admin button for updating item to shipped status
    const updateToShippedHandler = async () => {
        setLoading(true);
        try {
            await axios.patch(`/api/orders/${match.params.id}/shipped`, {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setLoading(false);
            setIsShipped(true);
        } catch (err) {
            setLoading(false);
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }

    };

    //Handle successuful payment
    const successPaymentHandler = (paymentResult) => {
        try {
            axios.patch(`/api/orders/${orderData._id}/pay`, { paymentResult }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setIsPaid(true);
        } catch (err) {
            setError(err);
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
                                <ListGroup.Item className="d-flex">
                                    <p className="mr-1"><strong>Name: </strong></p>
                                    <p>{orderData.user.name}</p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-flex">
                                        <p className="mr-1"><strong>Shipping to: </strong></p>
                                        <p>{orderData.shippingAddress.address}<br />
                                            {orderData.shippingAddress.city}, {orderData.shippingAddress.usState} {orderData.shippingAddress.zipCode}
                                        </p>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex">
                                    <p className="mr-1"><strong>Payment Method: </strong>{orderData.paymentMethod}</p>
                                </ListGroup.Item>

                                <ListGroup.Item className="d-flex">
                                    <p className="mr-1"><strong>Payment Status: </strong></p>
                                    {orderData.isPaid
                                        ? <p className="text-success">Payment received!</p>
                                        : <p className="text-danger">Awaiting payment</p>}

                                </ListGroup.Item>

                                <ListGroup.Item className="d-flex">
                                    <p className="mr-1"><strong>Shipping Status: </strong></p>
                                    {isShipped
                                        ? <p className="text-success mr-5">Order has shipped!</p>
                                        : <p className="text-danger mr-5">Preparing your order</p>}

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
                                {!orderData.isPaid && (
                                    <ListGroup.Item>
                                        {!sdkReady ? <LoadingSpinner /> : (
                                            <PayPalButton amount={orderData.totalPrice} onSuccess={successPaymentHandler} />
                                        )}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>

                        </Col>
                    </Row>
                    : error && <Message type="warning" message={error} />}
        </div>
    );
};

export default CompletedOrderPage;
