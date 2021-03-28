import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import { listProductDetails } from '../actions/productActions';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminProductEditPage = ({ match, history }) => {
    const productId = match.params.id;
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productDetails);
    const { loading, error, product } = productList;
    const userDetails = useSelector(state => state.user);
    const { user } = userDetails;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [inStock, setInStock] = useState(0);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [sale, setSale] = useState(false);
    const [salePrice, setSalePrice] = useState(0);

    const [successfulUpdate, setSuccessfulUpdate] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (successfulUpdate) {
            history.push('/admin/products');
        } else {
            if (!product._id || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setCategory(product.category);
                setInStock(product.inStock);
                setImage(product.image);
                setDescription(product.description);
                setSale(product.sale);
                setSalePrice(product.salePrice ? product.salePrice : product.price);
            }
        }
    }, [dispatch, match, product, productId, successfulUpdate, history]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            axios.patch(`/api/products/${productId}`, {
                _id: productId,
                name,
                price,
                category,
                inStock,
                image,
                description,
                sale,
                salePrice
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            });
            setSuccessfulUpdate(true);
        } catch (err) {
            console.log(err);
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);

        } catch (err) {
            console.error(err);
            setUploading(false);
        }
    };

    return (
        <div>
            <h2 className="my-3">Edit product</h2>
            <Link to="/admin/products" className="btn btn-outline-primary my-3">Go back</Link>
            {loading ? <LoadingSpinner /> :
                <Form className="form-container" onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number in Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter number in stock"
                            value={inStock}
                            onChange={(e) => setInStock(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)} />
                        <Form.File
                            id="image-file"
                            label="Choose File"
                            custom
                            onChange={uploadFileHandler}></Form.File>
                        {uploading && <LoadingSpinner />}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>On Sale?</Form.Label>
                        <div key='radio' className="mb-3" onChange={(e) => { e.target.value === "false" ? setSale(false) : setSale(true); }}>
                            <Form.Check
                                type="radio"
                                name="sale"
                                label="No"
                                value="false"
                            />

                            <Form.Check
                                type="radio"
                                name="sale"
                                label="Yes"
                                value="true"
                            />
                        </div>
                    </Form.Group>
                    {sale && <Form.Group>
                        <Form.Label>Sale Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter sale price"
                            value={salePrice}
                            onChange={(e) => setSalePrice(e.target.value)} />
                    </Form.Group>}
                    <Button type="submit" variant="primary">Update</Button>
                </Form>}
        </div>
    );
};

export default AdminProductEditPage;
