import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToBag } from '../actions/bagActions';
import Message from '../components/Message';
import BagItem from '../components/BagItem';

const BagPage = ({ match, location, history }) => {
    const productId = match.params.id;
    const quantity = location.search ? location.search.split('=')[1] : 1;
    const bag = useSelector(state => state.bag);
    const { bagItems } = bag;
    const userInfo = useSelector(state => state.user);
    const { user } = userInfo;

    const dispatch = useDispatch();

    const itemsPrice = bagItems.reduce((acc, cur) => (acc + (cur.price * cur.quantity)), 0);

    const roundNumbers = (num) => {
        return num.toFixed(2);
    };

    useEffect(() => {
        if (productId) {
            dispatch(addItemToBag(productId, quantity));
        }

    }, [dispatch, productId, quantity]);

    const checkOutHandler = () => {
        if (user) {
            history.push('/checkout');
        } else {
            history.push('/login');
        }

    };

    return (
        <div className="container my-3">
            <Link to="/" className="btn btn-outline-primary my-3">Go home</Link>
            <h3>My Shopping Bag</h3>
            {bagItems.length === 0 ?
                (<Message
                    type="info"
                    message="Your cart is empty. Go shopping!"
                    heading="" />)
                :
                (<div className="my-4">
                    <table className="table">
                        <thead>
                            <tr className="table-secondary">
                                <th scope="col">Image</th>
                                <th scope="col" className="details-label">Details</th>
                                <th scope="col" className="text-right hide-small">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bagItems.map(item => <BagItem item={item} key={item.product} />)}
                        </tbody>
                        <tfoot>
                            <tr className="table-light">
                                <td className="hide-small"></td>
                                <td></td>
                                <td className="text-right">
                                    <h5>Subtotal: ({bagItems.reduce((acc, cur) => acc + cur.quantity, 0)}) items</h5>
                                    <h3 className="text-secondary">
                                        ${roundNumbers(+itemsPrice)}
                                    </h3>
                                    <p>Shipping fees and taxes will be added at checkout</p>
                                    <button className="btn btn-primary my-2" onClick={checkOutHandler}>Check out</button>
                                </td>
                            </tr>
                        </tfoot>

                    </table>
                </div >)}
        </div>
    );
};

export default BagPage;
