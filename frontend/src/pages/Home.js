import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';

import Product from '../components/Product';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

const Home = (props) => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <LoadingSpinner /> : error ? <Message message={error} type="danger" heading="Error" /> :
                <Row>
                    {products.map(product => {
                        return (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>);
                    })}
                </Row>
            }
        </div>
    );
};

export default Home;
