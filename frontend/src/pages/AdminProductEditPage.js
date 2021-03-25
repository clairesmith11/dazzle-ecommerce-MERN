import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AdminProductEditPage = () => {
    return (
        <div>
            <h2>Edit product</h2>
            <Form className="form-container">
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter price" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Number in Stock</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter number in stock" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter image URL" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>On Sale?</Form.Label>
                    <Form.Control as="select">
                        <option>No</option>
                        <option>Yes</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sale Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter sale price" />
                </Form.Group>
                <Button variant="primary">Update</Button>
            </Form>
        </div>
    );
};

export default AdminProductEditPage;
