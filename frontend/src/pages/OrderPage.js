import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs from '../components/Breadcrumbs';
import CheckoutSummary from '../components/CheckoutSummary';
import { createOrder } from '../actions/orderActions';

const OrderPage = ({ history }) => {
    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.user);
    const { user } = userInfo;

    const bag = useSelector(state => state.bag);
    const { bagItems } = bag;
    const { shippingAddress, paymentMethod } = bag;

    const newOrder = useSelector(state => state.order);
    const { order, loading, success, error } = newOrder;

    //Set and format prices
    const itemsPrice = bagItems.reduce((acc, cur) => (acc + (cur.price * cur.quantity)), 0);
    const shippingPrice = itemsPrice < 200 ? 9.99 : 0;
    const taxesPrice = +(itemsPrice * 0.07).toFixed(2);
    const totalPrice = +(itemsPrice + shippingPrice + taxesPrice).toFixed(2);

    const formattedAddress = `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.usState} ${shippingAddress.zipCode}`;

    //Dispatch action to add user order to DB
    const placeOrderHandler = () => {
        dispatch(createOrder({
            user: user.id,
            products: bag.bagItems,
            shippingAddress: bag.shippingAddress,
            paymentMethod: bag.paymentMethod,
            tax: taxesPrice,
            shippingPrice,
            totalPrice
        }));

    };

    //If order was successfully placed, redirect to the completed order page 
    useEffect(() => {
        if (success && !loading) {
            setTimeout(() => {
                history.push(`/orders/${order.order._id}`);
            }, 2000);

        }
    }, [history, success, order, loading]);

    return (
        <div>
            <h2>Place Order</h2>
            <Row className="gy-5">
                <Col md={6}>
                    <div className="d-flex mb-4">
                        <Breadcrumbs page='placeOrder' />
                    </div>
                    {error && <Message type="warning" message={error} />}
                    <ListGroup>
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <p className="m-0"><strong>Name: </strong>{user.name}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <p className="m-0"><strong>Ship to: </strong>{formattedAddress}</p>
                            <Link to="/checkout"><Button variant="link" size="sm" className="m-0">Change</Button></Link>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <p className="m-0"><strong>Payment Method: </strong>{paymentMethod}</p>
                            <Link to="/payment"><Button variant="link" size="sm" className="m-0">Change</Button></Link>
                        </ListGroup.Item>
                    </ListGroup>
                    <Button
                        variant="primary"
                        type="submit"
                        className="my-3"
                        onClick={placeOrderHandler}
                    >{loading ? <LoadingSpinner /> : 'Place Order'}</Button>

                </Col>
                <CheckoutSummary />
            </Row>
        </div>
    );
};

export default OrderPage;
