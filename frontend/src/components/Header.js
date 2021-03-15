import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => {
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
                            <LinkContainer to="/login">
                                <Nav.Link><i className='fas fa-user mr-1'></i>Sign in</Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
