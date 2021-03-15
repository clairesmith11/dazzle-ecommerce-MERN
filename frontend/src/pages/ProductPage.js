import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

import Rating from '../components/Rating';
import Tab from '../components/Tab';

const ProductPage = ({ match }) => {
    const [product, setProduct] = useState({});
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`);
            setProduct(data);
        };
        fetchProduct();
    }, [match]);

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
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
                        <button type="button" className="btn btn-outline-primary py-0 mr-3">-</button>
                        <h4>1</h4>
                        <button type="button" className="btn btn-outline-primary py-0 mx-3">+</button>
                        <button type="button" className="btn btn-primary" disabled={product.inStock === 0}>Add to bag</button>
                        <button
                            type="button"
                            className="btn btn-outline-primary py-0 mx-1"
                            onClick={toggleWishlist}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}>
                            {isWishlisted
                                ? <i className="fas fa-heart"></i>
                                : <i className="far fa-heart"></i>}
                        </button>
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
