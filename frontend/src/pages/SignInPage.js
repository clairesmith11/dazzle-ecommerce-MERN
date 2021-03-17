import React, { useState } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';

const SignInPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const toggleLoginMode = () => {
        setIsLoginMode(!isLoginMode);
    };
    return (
        <Container className="my-5">
            <h4 className="text-center">{isLoginMode ? 'Log in to your account' : 'Sign up for a new account'}</h4>
            <div className="d-flex justify-content-center align-items-center my-3">
                <Col md={5}>
                    <Form>
                        {!isLoginMode &&
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" />
                            </Form.Group>
                        }
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign in
                    </Button>
                        <Button
                            variant="link"
                            className="d-block pl-0"
                            onClick={toggleLoginMode}>
                            {isLoginMode ? 'New user? Register now' : 'Already have an account? Log in'}
                        </Button>
                    </Form>
                </Col>
            </div>
        </Container>
    );
};

export default SignInPage;
