import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';

import CheckoutSummary from '../components/CheckoutSummary';


const CompletedOrderPage = ({ match }) => {
    return (
        <div>
            <h2>Order {match.params.id.toUpperCase()}</h2>
            <Row className="my-5 gy-5">
                <Col md={6}>
                    <ListGroup>
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <p className="m-0"><strong>Name: </strong>Your name</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <p className="m-0"><strong>Shipping to: </strong>Your address</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <p className="m-0"><strong>Payment Method: </strong>Your payment method</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <CheckoutSummary />
            </Row>
        </div>
    );
};

export default CompletedOrderPage;
