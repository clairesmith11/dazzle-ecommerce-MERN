import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';

import { listProducts } from '../actions/productActions';
import BannerCarousel from '../components/BannerCarousel';
import Product from '../components/Product';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const Home = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products, pages, page } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <div>
            <BannerCarousel />
            <Container>
                <h1>Latest Products</h1>
                {loading ? <LoadingSpinner size="large" /> : error ? <Message message={error} type="danger" heading="Error" /> :
                    <React.Fragment>
                        <Row>
                            {products.map(product => {
                                return (
                                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                        <Product product={product} />
                                    </Col>);
                            })}
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                    </React.Fragment>
                }
            </Container>
        </div>
    );
};

export default Home;
