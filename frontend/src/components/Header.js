import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';

import { userLogout } from '../actions/userActions';

const Header = ({ history, location }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user);
    const { user } = userInfo;

    const logOutHandler = () => {
        dispatch(userLogout());
        history.push('/login');
    };

    return (
        <header>
            <Navbar bg="light" variant="light" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Dazzle</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="ml-sm-2" />
                            <Button variant="outline-success"><i className="fas fa-search"></i></Button>
                        </Form>
                        <Nav className="ml-auto">
                            <LinkContainer to="/wishlist">
                                <Nav.Link><i className='fas fa-heart mr-1'></i>Wishlist</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/bag">
                                <Nav.Link><i className='fas fa-shopping-bag mr-1'></i>Bag</Nav.Link>
                            </LinkContainer>
                            {user && user.isAdmin && (
                                <NavDropdown title="Admin Panel">
                                    <LinkContainer to="/admin/products">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orders">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            {user ? (
                                <NavDropdown title={user.name}>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>My Account</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logOutHandler}>Log out</NavDropdown.Item>
                                </NavDropdown>
                            ) :
                                <LinkContainer to="/login">
                                    <Nav.Link><i className='fas fa-user mr-1'></i>Sign in</Nav.Link>
                                </LinkContainer>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default withRouter(Header);
