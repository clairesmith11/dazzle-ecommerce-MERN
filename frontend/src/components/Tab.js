import React from 'react';
import { Tabs } from 'react-bootstrap';

import Rating from './Rating';
import Review from './Review';

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
                                <div className="my-3" key={review._id}>
                                    <div className="d-flex align-items-center">
                                        <p className="my-0 mr-3"><strong>{review.name}</strong></p>
                                        <Rating rating={review.rating} />
                                    </div>
                                    <p>{review.comment}</p>
                                </div>

                            );
                        })}
                    <Review product={product._id} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default Tab;
