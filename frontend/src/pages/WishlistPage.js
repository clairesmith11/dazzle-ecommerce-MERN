import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../components/Message';
import WishlistItem from '../components/WishlistItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { getUserWishlist } from '../actions/wishlistActions';

const WishlistPage = () => {
    const dispatch = useDispatch();

    const wishlist = useSelector(state => state.wishlist);
    const { wishlistItems, loading, error } = wishlist;

    //On component render, fetch the user's wishlist from the database
    useEffect(() => {
        dispatch(getUserWishlist());
    }, [dispatch]);

    return (
        <div className="container my-3">
            <Link to="/" className="btn btn-outline-primary my-3">Go home</Link>
            <h3>My Wishlist</h3>
            {loading ? <LoadingSpinner size="large" />
                : error ? <Message type="danger" message={error} />
                    : wishlistItems.length === 0 ?
                        (<Message
                            type="info"
                            message="Your wishlist is empty. Go shopping!"
                            heading="" />)
                        :
                        (<div className="my-4">
                            <table className="table">
                                <tbody>
                                    {wishlistItems.map(item => <WishlistItem item={item} key={item._id} />)}
                                </tbody>
                            </table>
                        </div >)}
        </div>
    );
};

export default WishlistPage;
