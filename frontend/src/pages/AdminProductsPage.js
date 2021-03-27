import React, { useEffect, useState } from 'react';
import { Table, Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { listProducts, createProduct } from '../actions/productActions';
import { CLEAR_PRODUCT_CREATE } from '../constants/productConstants';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const AdminProductsPage = ({ history, match }) => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const productCreate = useSelector(state => state.productCreate);

    const { loading, error, products, page, pages } = productList;
    const { loading: loadingCreate, error: errorCreate, success: successfulCreate, product: createdProduct } = productCreate;

    const userInfo = useSelector(state => state.user);
    const { user } = userInfo;

    const [successfulDelete, setSuccessfulDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState(null);

    const pageNumber = match.params.pageNumber || 1;

    useEffect(() => {
        dispatch({ type: CLEAR_PRODUCT_CREATE });

        if (!user.isAdmin) {
            history.push('/login');
        }

        if (successfulCreate) {
            history.push(`/admin/product/${createdProduct.product._id}/edit`);
        } else {
            dispatch(listProducts('', pageNumber));
        }

    }, [dispatch, successfulDelete, successfulCreate, createdProduct, history, user, pageNumber]);

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    const deleteProductHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                setSuccessfulDelete(true);
            } catch (err) {
                setErrorDelete(err.response.data.message);
            }
        }

    };

    return (
        <div>
            <Row className="d-flex justify-content-between my-5">
                <h2>Products</h2>
                <Button variant="primary" onClick={createProductHandler}>{loadingCreate ? <LoadingSpinner /> : '+ Create product'}</Button>
            </Row>
            <Table striped bordered hover>
                {loading ? <LoadingSpinner size="large" /> :
                    error ? <Message type="danger" message={error} /> :
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Sale</th>
                                <th>Category</th>
                            </tr>
                        </thead>}
                <tbody>
                    {errorDelete && <Message type="danger" message={errorDelete} />}
                    {products &&
                        products.map(product => {
                            return (
                                <tr>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.salePrice ? `$${product.salePrice}` : `$${product.price}`}</td>
                                    <td>{product.salePrice ? <p className="m-0 text-success">&#10003;</p> : <p className="m-0 text-danger">&times;</p>}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            className="mx-1"
                                            onClick={() => history.push(`/admin/product/${product._id}/edit`)}>&#9998;</Button>
                                        <Button
                                            variant="danger"
                                            className="mx-1"
                                            onClick={() => deleteProductHandler(product._id)}>&#128465;</Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
    );
};

export default AdminProductsPage;
