import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';

import Message from '../components/Message';

const UserAccountPage = () => {
    const userInfo = useSelector(state => state.user);
    const { user } = userInfo;
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [message, setMessage] = useState(null);

    const toggleForm = (formType) => {
        if (formType === 'password') {
            setShowPasswordForm(!showPasswordForm);
        } else {
            setShowAddressForm(!showAddressForm);
        }
    };

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
            <Row className="my-5">
                <Col md={4} >
                    <h5>My Info</h5>
                    <Card className="my-3">
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                            <Button variant="link" className="mb-3" onClick={() => toggleForm('password')}>Change password</Button>
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
                                        className="mb-3">Update</Button>
                                </Form>
                            }
                            <Card.Text>
                                8464 N 1000 E
                                <br />
                                Lafayette, IN 47905
                            </Card.Text>
                            <Button variant="link" className="mb-3" onClick={() => toggleForm('address')}>Change address</Button>
                            {showAddressForm &&
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Street</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter street address" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter city" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter zip code" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Update</Button>
                                </Form>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <h5>My Orders</h5>
                    <Card className="my-3">
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserAccountPage;
