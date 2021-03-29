import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addItemToBag } from '../actions/bagActions';
import { getUserWishlist } from '../actions/wishlistActions';
import axios from 'axios';

const WishlistItem = ({ item, history }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user);
    const { user } = userInfo;

    const addToBagHandler = () => {
        dispatch(addItemToBag(item._id, 1));
        removeFromWishlistHandler();
        setTimeout(() => {
            history.push('/bag');
        }, 1000);
    };

    const removeFromWishlistHandler = async () => {
        try {
            await axios.delete(`/api/users/${item._id}/wishlist`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            dispatch(getUserWishlist());
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <tr>
            <th scope="row" style={{ width: '33%' }}>
                <img className="fluid" src={item.image} alt={item.name} style={{ width: '100%' }} />
            </th>
            <td>
                <Link to={`/product/${item._id}`}><h4>{item.name}</h4></Link>
                <h4 className="text-right">${item.price.toFixed(2)}</h4>
                <div className="row d-flex align-items-center">
                    <Button className="ml-3" onClick={addToBagHandler}>Add to cart</Button>
                    <Button variant="link" onClick={removeFromWishlistHandler}>Remove</Button>
                </div>
            </td>
        </tr>
    );
};

export default withRouter(WishlistItem);
