import { Spinner } from 'react-bootstrap';

import React from 'react';

const LoadingSpinner = ({ size }) => {
    return (
        <div className={size === 'large' ? "large-box container d-flex justify-content-center align-items-center" : ''}>
            <Spinner animation="border" variant="primary" />
        </div>
    );
};

export default LoadingSpinner;
