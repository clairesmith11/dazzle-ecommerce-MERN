import React from 'react';
import { Button } from 'react-bootstrap';

const QuantityButton = ({ clickable, clicked, type }) => {
    return (
        <div>
            <Button
                variant="outline-primary"
                className="mx-2"
                disabled={clickable}
                onClick={clicked}>
                {type === 'add' ? '+' : '-'}
            </Button>
        </div>
    );
};

export default QuantityButton;
