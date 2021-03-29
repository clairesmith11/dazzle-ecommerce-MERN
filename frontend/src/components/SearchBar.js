import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    //Search products by keyword
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
        }
    };

    return (
        <Form inline onSubmit={submitHandler}>
            <Form.Control
                type="text"
                placeholder="Search"
                className="ml-sm-2"
                onChange={(e) => setKeyword(e.target.value)} />
            <Button type="submit" variant="outline-success"><i className="fas fa-search"></i></Button>
        </Form>
    );
};

export default SearchBar;
