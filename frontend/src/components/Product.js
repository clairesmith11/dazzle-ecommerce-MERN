import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
    return (
        <Card className="shadow my-3">
            {product.sale && <span className="product-badge badge badge-secondary">Sale</span>}
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
                </Link>
                {product.salePrice
                    ? <p><s>${product.price}</s> <strong>${product.salePrice}</strong></p>
                    : <p>${product.price}</p>
                }

            </Card.Body>
        </Card>
    );
};

export default Product;
