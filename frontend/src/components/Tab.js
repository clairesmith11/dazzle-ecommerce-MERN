import React from 'react';
import { Tabs, Form, Button } from 'react-bootstrap';

import Rating from './Rating';

const Tab = ({ product }) => {
    return (
        <div className="my-4">
            <Tabs defaultActiveKey="description" id="uncontrolled-tab-example">
                <Tab eventKey="description" title="Description">
                    <p className="my-3">{product.description}</p>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    {product.reviews.length === 0 ? <p className="my-3">This product doesn't have any reviews yet!</p>
                        : product.reviews.map(review => {
                            return (
                                <div className="my-3">
                                    <div className="d-flex align-items-center">
                                        <p className="my-0 mr-3"><strong>{review.name}</strong></p>
                                        <Rating rating={review.rating} />
                                    </div>
                                    <p>{review.comment}</p>
                                </div>

                            );
                        })}
                    <Form>
                        <p className="mt-5"><strong>Submit a Review</strong></p>
                        <Form.Group>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter your rating"
                                min={0}
                                max={5} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Enter your review" />
                        </Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Tab>
            </Tabs>
        </div>
    );
};

export default Tab;
