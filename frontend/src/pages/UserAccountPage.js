import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const UserAccountPage = () => {
    const userInfo = useSelector(state => state.user);
    const { loggedInUser } = userInfo;

    return (
        <Container>
            <Link to="/" className="btn btn-outline-primary my-3">Go home</Link>
            <h3>My Account</h3>
            <Row className="my-5">
                <Col md={4} >
                    <h5>My Info</h5>
                    <Card className="my-3">
                        <Card.Body>
                            <Card.Title>{loggedInUser.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{loggedInUser.email}</Card.Subtitle>
                            <Button className="mb-3">Change password</Button>
                            <Card.Text>
                                8464 N 1000 E
                                <br />
                                Lafayette, IN 47905
                            </Card.Text>
                            <Button className="mb-3">Change address</Button>
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
