import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import Message from './Message';
import LoadingSpinner from './LoadingSpinner';
import { listProductDetails } from '../actions/productActions';

const Review = ({ product }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user);
    const { user } = userInfo;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState('');
    const [message, setMessage] = useState(null);

    //Submit user review and display message to confirm
    const submitReviewHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`/api/products/${product}/reviews`, {
                rating,
                comment
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            });
            setLoading(false);
            setMessage('Your review has been submitted!');
            dispatch(listProductDetails(product));
        } catch (err) {
            setMessage(err);
            setLoading(false);
        }

    };

    return (
        <Form onSubmit={(e) => submitReviewHandler(e)}>
            {message && <Message type="success" message={message} />}
            <p className="mt-5"><strong>Submit a Review</strong></p>
            <Form.Group>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter your rating"
                    min={0}
                    max={5}
                    value={rating}
                    onChange={(e) => setRating(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Enter your review"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />
            </Form.Group>
            <Button type="submit">{loading ? <LoadingSpinner /> : 'Submit'}</Button>
        </Form>
    );
};

export default Review;
