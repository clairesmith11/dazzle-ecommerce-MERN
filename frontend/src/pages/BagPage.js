import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToBag } from '../actions/bagActions';
import Message from '../components/Message';

const BagPage = ({ match, location, history }) => {
    const productId = match.params.id;
    const quantity = location.search ? location.search.split('=')[1] : 1;
    const bag = useSelector(state => state.bag);
    const { bagItems } = bag;

    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addItemToBag(productId, quantity));
        }

    }, [dispatch, productId, quantity]);

    return (
        <div className="container my-3">
            <h3>My Shopping Bag</h3>
            <div className="my-4">
                <table className="table">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">Image</th>
                            <th scope="col">Details</th>
                            <th scope="col" className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bagItems.map(item => {
                            return (
                                <tr>
                                    <th scope="row" style={{ width: '33%' }}>
                                        <img className="fluid" src={item.image} alt={item.name} style={{ width: '100%' }} />
                                    </th>
                                    <td>
                                        <h4>{item.name}</h4>
                                        <p>${item.price}</p>
                                        <div className="row d-flex align-items-center">
                                            <p>Quantity: {item.quantity}</p>
                                            <button className="btn btn-outline-primary btn-sm mx-3">Remove</button>
                                        </div>

                                    </td>
                                    <td>
                                        <h4 className="text-right">${item.price * item.quantity}</h4></td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tr class="table-light">
                        <td></td>
                        <td></td>
                        <td className="text-right">
                            <h3>Total price:</h3>
                            <button className="btn btn-primary my-2">Check out</button>
                        </td>
                    </tr>
                </table>
            </div >
        </div >
    );
};

export default BagPage;
