import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Image } from 'react-bootstrap';

import Rating from '../components/Rating';
import Tab from '../components/Tab';
import products from '../products';

const ProductPage = ({ match }) => {
    const product = products.find(p => p._id === +match.params.id);

    const addItems = () => {

    };
    return (
        <div>
            <Link to="/" className="btn btn-outline-primary my-3">Go back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={6}>
                    <h2>{product.name}</h2>
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                    {product.salePrice ? <h3>${product.salePrice}</h3> : <h3>${product.price}</h3>}
                    <div className="d-flex my-3">
                        <button type="button" class="btn btn-outline-primary py-0 mr-3">-</button>
                        <h4>1</h4>
                        <button type="button" class="btn btn-outline-primary py-0 mx-3">+</button>
                        <button type="button" class="btn btn-primary" disabled={product.inStock === 0}>Add to bag</button>
                    </div>
                    <p>Availability: {product.inStock > 0
                        ? <span className="text-success">In Stock</span>
                        : <span className="text-danger">Out of Stock</span>}</p>
                    <Tab product={product} />
                </Col>
            </Row>
        </div>
    );
};

export default ProductPage;
