import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const WishlistItem = ({ item }) => {
    return (
        <tr>
            <th scope="row" style={{ width: '33%' }}>
                <img className="fluid" src={item.image} alt={item.name} style={{ width: '100%' }} />
            </th>
            <td>
                <Link to={`/product/${item.product}`}><h4>{item.name}</h4></Link>
                <h4 className="text-right">${item.price.toFixed(2)}</h4>
                <div className="row d-flex align-items-center">
                    <Button className="ml-3">Add to cart</Button>
                    <Button variant="link">Remove</Button>
                </div>
            </td>
        </tr>
    );
};

export default WishlistItem;
