import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';

const UserAccountPage = ({ history }) => {
    const userInfo = useSelector(state => state.user);
    const { user } = userInfo;

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userOrders, setUserOrders] = useState(null);

    //On component render, fecth the user's orders from the database
    useEffect(() => {
        //If no user is logged in, redirect to sign in page
        if (!user) {
            history.push('/login');
        } else {
            setLoading(true);
            const fetchUserOrders = async () => {
                try {
                    const { data } = await axios.get('/api/orders/my-orders', {
                        headers:
                            { Authorization: `Bearer ${user.token}` }
                    });
                    setUserOrders(data);
                    setLoading(false);
                } catch (err) {
                    setError(err.response.data.message);
                }

            };
            fetchUserOrders();
        }
    }, [history, user]);

    //Button to toggle the password update form
    const toggleForm = (formType) => {
        if (formType === 'password') {
            setShowPasswordForm(!showPasswordForm);
        } else {
            setShowAddressForm(!showAddressForm);
        }
    };

    //User update password
    const updatePassword = async (e) => {
        e.preventDefault();
        try {
            await axios.patch('/api/users/profile',
                { password: updatedPassword },
                {
                    'Content-Type': 'application/json',
                    headers:
                        { Authorization: `Bearer ${user.token}` }
                });
            setMessage('Password successfully changed!');
        } catch (error) {
            setMessage(error.response.data.message);
        }

    };

    return (
        <Container>
            <Link to="/" className="btn btn-outline-primary my-3">Go home</Link>
            <h3>My Account</h3>
            {user &&
                <Row className="my-5">
                    <Col md={4} >
                        <h5>My Info</h5>
                        <Card className="my-3">
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                                <Button variant="link" className="mb-3 btn-sm" onClick={() => toggleForm('password')}>Change password</Button>
                                {message &&
                                    <Message
                                        type={message === 'Password successfully changed!' ? 'success' : 'danger'}
                                        message={message} />
                                }
                                {showPasswordForm &&
                                    <Form onSubmit={(e) => updatePassword(e)}>
                                        <Form.Group>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter new password"
                                                value={updatedPassword}
                                                onChange={(e) => setUpdatedPassword(e.target.value)} />
                                        </Form.Group>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="mb-3 btn-sm">Update</Button>
                                    </Form>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <h5>My Orders</h5>
                        <Card className="my-3">
                            {loading ?
                                <LoadingSpinner /> :
                                !error && userOrders ?
                                    <Card.Body>
                                        <ListGroup>
                                            {userOrders.map(order => {
                                                return (
                                                    <ListGroup.Item key={order._id}>
                                                        <p><strong>Order number: </strong><Link to={`/orders/${order._id}`}>{order._id}</Link></p>
                                                        <p><strong>Order date: </strong>{order.createdAt.split('T')[0]}</p>
                                                    </ListGroup.Item>
                                                );
                                            })}
                                        </ListGroup>
                                    </Card.Body>
                                    : !error && !userOrders ?
                                        <p>You have not made any orders yet</p>
                                        : <Message type="warning" message={error} />
                            }
                        </Card>
                    </Col>
                </Row>
            }
        </Container>
    );
};

export default UserAccountPage;
