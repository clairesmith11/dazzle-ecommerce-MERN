import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

import Meta from '../components/meta';
import Rating from '../components/Rating';
import Tab from '../components/Tab';
import QuantityButton from '../components/QuantityButton';
import { listProductDetails, clearProductDetails } from '../actions/productActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import { getUserWishlist } from '../actions/wishlistActions';

const ProductPage = ({ history, match }) => {
    const productId = match.params.id;
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productDetails);
    const { loading, error, product } = productList;

    const userInfo = useSelector(state => state.user);
    const { user } = userInfo;

    const wishlist = useSelector(state => state.wishlist);
    const { wishlistItems } = wishlist;

    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantitySelected, setQuantitySelected] = useState(1);
    const [loadingWishlist, setLoadingWishlist] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        dispatch(listProductDetails(productId));

        const isOnWishlist = wishlistItems ? wishlistItems.filter(item => item._id === productId) : [];
        if (isOnWishlist.length === 1) {
            setIsWishlisted(true);
        } else {
            setIsWishlisted(false);
        }

        return () => {
            dispatch(clearProductDetails());
        };

    }, [dispatch, productId, wishlistItems]);

    const wishListHandler = async () => {
        if (!isWishlisted) {
            setLoadingWishlist(true);
            try {
                await axios.post(`/api/users/${productId}/wishlist`, {}, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                setIsWishlisted(true);
                setLoadingWishlist(false);
                dispatch(getUserWishlist());
            } catch (err) {
                setErrorMessage(error.response && error.response.data.message ? error.response.data.message : error.message);
                setLoadingWishlist(false);
            }
        } else {
            try {
                await axios.delete(`/api/users/${productId}/wishlist`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                dispatch(getUserWishlist());
            } catch (err) {
                console.error(err);
            }
        }

    };

    const addQuantity = () => {
        if (quantitySelected < product.inStock) {
            setQuantitySelected(quantitySelected + 1);
        }
    };

    const subtractQuantity = () => {
        if (quantitySelected > 1) {
            setQuantitySelected(quantitySelected - 1);
        }
    };

    const addToCartHandler = () => {
        history.push(`/bag/${match.params.id}/?quantity=${quantitySelected}`);
    };

    return (
        <div>
            <Link to="/" className="btn btn-outline-primary my-3">Go back</Link>
            {loading ? <LoadingSpinner />
                : error ? <Message type="danger" message={error} />
                    : errorMessage ? <Message type="danger" message={errorMessage} />
                        :
                        <Row>
                            <Meta title={product.name} />
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={6}>
                                <h2>{product.name}</h2>
                                <Rating rating={product.rating} numReviews={product.numReviews} />
                                {product.salePrice
                                    ? <h3>${product.salePrice}
                                        <span className="badge badge-secondary ml-2">
                                            {`Save ${Math.round(100 - ((product.salePrice / product.price * 100)))}%!`}
                                        </span>
                                    </h3>
                                    : <h3>${product.price}</h3>}
                                <div className="d-flex my-3">
                                    {/* Add and subtract quantity buttons */}
                                    <QuantityButton
                                        type="subtract"
                                        clickable={product.inStock === 0}
                                        clicked={subtractQuantity} />
                                    <h4>{quantitySelected}</h4>
                                    <QuantityButton
                                        type="add"
                                        clickable={product.inStock === 0}
                                        clicked={addQuantity} />
                                    {/* Add to cart button */}
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        disabled={product.inStock === 0}
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title={product.inStock === 0 ? "Out of Stock" : ''}
                                        onClick={addToCartHandler}>Add to bag</button>
                                    {/* Wishlist button */}
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary py-0 mx-1"
                                        onClick={wishListHandler}
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}>
                                        {loadingWishlist
                                            ? <LoadingSpinner />
                                            : isWishlisted
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
            }
        </div>
    );
};

export default ProductPage;
