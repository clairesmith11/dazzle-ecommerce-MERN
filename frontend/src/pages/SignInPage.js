import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Form, Button } from 'react-bootstrap';

import { userLogin, userRegister } from '../actions/userActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

const SignInPage = ({ history }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user);
    const { loading, error, user } = userInfo;

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            history.push('/');
        }
    }, [history, user]);

    const toggleLoginMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password));
    };

    const signupHandler = (e) => {
        e.preventDefault();
        dispatch(userRegister(name, email, password));
    };

    return (
        <Container className="my-5">
            <h4 className="text-center">{isLoginMode ? 'Log in to your account' : 'Sign up for a new account'}</h4>

            <div className="d-flex justify-content-center align-items-center my-3">
                <Col md={5}>
                    {error && <Message message={error} type="danger" heading="Error" />}
                    <Form onSubmit={isLoginMode ? (e) => loginHandler(e) : (e) => signupHandler(e)}>
                        {!isLoginMode &&
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                        }
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {loading ? <LoadingSpinner /> : isLoginMode ? 'Sign in' : 'Register'}
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
