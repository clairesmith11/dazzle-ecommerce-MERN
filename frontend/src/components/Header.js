import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import { userLogout } from '../actions/userActions';
import SearchBar from '../components/SearchBar';

const Header = ({ history, location }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user);
    const { user } = userInfo;

    //Log user out and redirect to sign in page
    const logOutHandler = () => {
        dispatch(userLogout());
        history.push('/login');
    };

    return (
        <header>
            <Navbar className="navbar" bg="light" variant="light" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Dazzle</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBar history={history} />} />
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
