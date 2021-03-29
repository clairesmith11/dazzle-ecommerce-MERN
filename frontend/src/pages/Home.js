import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { listProducts } from '../actions/productActions';
import BannerCarousel from '../components/BannerCarousel';
import Product from '../components/Product';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const Home = ({ match }) => {
    const keyword = match.params.keyword;
    const cat = match.params.cat;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products, pages, page } = productList;

    //On Component render, fetch all products from the database
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber, cat));
    }, [dispatch, keyword, pageNumber, cat]);

    return (
        <div>
            <BannerCarousel />
            <Container>
                <Row className="d-flex justify-content-around my-5">
                    <LinkContainer to={`/`}><Button className="my-1">All Collections</Button></LinkContainer>
                    <LinkContainer to={`/collections/rings`}><Button className="my-1">Rings</Button></LinkContainer>
                    <LinkContainer to={`/collections/necklaces`}><Button className="my-1">Necklaces</Button></LinkContainer>
                    <LinkContainer to={`/collections/bracelets`}><Button className="my-1">Bracelets</Button></LinkContainer>
                    <LinkContainer to={`/collections/watches`}><Button className="my-1">Watches</Button></LinkContainer>
                </Row>
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
                        <Paginate
                            pages={pages}
                            page={page}
                            keyword={keyword ? keyword : ''}
                            cat={cat ? cat : ''}
                        />
                    </React.Fragment>
                }
            </Container>
        </div>
    );
};

export default Home;
