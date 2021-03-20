import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import QuantityButton from './QuantityButton';
import { addItemToBag, removeItemFromBag } from '../actions/bagActions';

const BagItem = ({ item }) => {
    const dispatch = useDispatch();

    const changeQuantityHandler = (qty) => {
        dispatch(addItemToBag(item.product, qty));
    };

    const removeFromBagHandler = (id) => {
        dispatch(removeItemFromBag(id));
    };

    return (
        <tr>
            <th scope="row" style={{ width: '33%' }}>
                <img className="fluid" src={item.image} alt={item.name} style={{ width: '100%' }} />
            </th>
            <td>
                <Link to={`/product/${item.product}`}><h4>{item.name}</h4></Link>
                <p>${item.price}</p>
                <div className="row d-flex align-items-center">
                    <QuantityButton
                        type="subtract"
                        clickable={item.quantity === 0}
                        clicked={() => changeQuantityHandler(item.quantity - 1)}
                    />
                    <h4>{item.quantity}</h4>
                    <QuantityButton
                        type="add"
                        clickable={item.quantity === item.inStock}
                        clicked={() => changeQuantityHandler(item.quantity + 1)}
                    />
                    <button className="btn btn-link btn-sm" onClick={() => removeFromBagHandler(item.product)}>Remove</button>
                </div>

            </td>
            <td className="hide-small">
                <h4 className="text-right">${(item.price * item.quantity).toFixed(2)}</h4></td>
        </tr>
    );
};

export default BagItem;
