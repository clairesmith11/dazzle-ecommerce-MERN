import { Alert } from 'react-bootstrap';

import React, { useState } from 'react';

const Message = ({ message, type }) => {
    return (
        <Alert variant={type}>
            <Alert.Heading>Error</Alert.Heading>
            <p>{message}</p>
        </Alert>
    );
};

export default Message;
