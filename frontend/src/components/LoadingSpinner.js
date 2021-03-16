import { Spinner } from 'react-bootstrap';

import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="large-box container d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
        </div>
    );
};

export default LoadingSpinner;
