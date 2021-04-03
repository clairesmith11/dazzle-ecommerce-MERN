import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

import Product from './Product';
import LoadingSpinner from './LoadingSpinner';

const TopProducts = () => {
    const [topProducts, setTopProducts] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get('/api/products/top');
                setTopProducts(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }

        };
        fetchProducts();

    }, []);

    return (
        <Row>
            {loading && <LoadingSpinner size="large" />}
            {topProducts && topProducts.map(product => {
                return (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                        <Product product={product} />
                    </Col>);
            })}
        </Row>
    );
};

export default TopProducts;
