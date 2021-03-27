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

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber, cat));
    }, [dispatch, keyword, pageNumber, cat]);

    return (
        <div>
            <BannerCarousel />
            <Container>
                <div className="d-flex justify-content-around my-5">
                    <LinkContainer to={`/`}><Button>All Collections</Button></LinkContainer>
                    <LinkContainer to={`/collections/rings`}><Button>Rings</Button></LinkContainer>
                    <LinkContainer to={`/collections/necklaces`}><Button>Necklaces</Button></LinkContainer>
                    <LinkContainer to={`/collections/bracelets`}><Button>Bracelets</Button></LinkContainer>
                    <LinkContainer to={`/collections/watches`}><Button>Watches</Button></LinkContainer>
                </div>
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
