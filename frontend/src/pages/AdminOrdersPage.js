import React, { useEffect, useState } from 'react';
import { Table, Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { listOrders } from '../actions/orderActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

const AdminOrdersPage = ({ history }) => {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;
    const userInfo = useSelector(state => state.user);
    const { user } = userInfo;

    useEffect(() => {
        if (!user.isAdmin) {
            history.push('/login');
        } else {
            dispatch(listOrders());
        }

    }, [dispatch, history, user]);

    return (
        <div>
            <Row className="d-flex justify-content-between my-5">
                <h2>Orders</h2>
            </Row>
            <Table striped bordered hover>
                {loading ? <LoadingSpinner size="large" /> :
                    error ? <Message type="danger" message={error} /> :
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Total Price</th>
                                <th>Paid</th>
                                <th>Shipped</th>
                            </tr>
                        </thead>}
                <tbody>
                    {orders &&
                        orders.map(order => {
                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${(order.totalPrice).toFixed(2)}</td>
                                    <td>{order.isPaid ? <p className="m-0 text-success">&#10003;</p> : <p className="m-0 text-danger">&times;</p>}</td>
                                    <td>{order.isShipped ? <p className="m-0 text-success">&#10003;</p> : <p className="m-0 text-danger">&times;</p>}</td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            className="mx-1 btn-sm"
                                            onClick={() => history.push(`/orders/${order._id}`)}>View Order</Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminOrdersPage;
