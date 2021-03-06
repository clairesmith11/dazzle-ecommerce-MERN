import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ page }) => {
    return (
        <ol className="breadcrumb">
            {page === 'info' &&
                <div className='d-flex'>
                    <li className="breadcrumb-item"><Link to="/bag">Bag</Link></li>
                    <li className="breadcrumb-item active">Shipping Info</li>
                    <li className="breadcrumb-item disabled">Payment</li>
                    <li className="breadcrumb-item disabled">Place Order</li>
                </div>
            }

            {page === 'payment' &&
                <div className='d-flex'>
                    <li className="breadcrumb-item"><Link to="/bag">Bag</Link></li>
                    <li className="breadcrumb-item"><Link to="/checkout">Shipping Info</Link></li>
                    <li className="breadcrumb-item active">Payment</li>
                    <li className="breadcrumb-item disabled">Place Order</li>
                </div>
            }

            {page === 'placeOrder' &&
                <div className='d-flex'>
                    <li className="breadcrumb-item"><Link to="/bag">Bag</Link></li>
                    <li className="breadcrumb-item"><Link to="/checkout">Shipping Info</Link></li>
                    <li className="breadcrumb-item"><Link to="/payment">Payment</Link></li>
                    <li className="breadcrumb-item active">Place Order</li>
                </div>
            }
        </ol>
    );
};

export default Breadcrumbs;
