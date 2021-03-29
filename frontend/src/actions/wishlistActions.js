import {
    WISHLIST_USER_REQUEST,
    WISHLIST_USER_SUCCESS,
    WISHLIST_USER_FAILURE
} from '../constants/wishListConstants';
import axios from 'axios';

export const getUserWishlist = () => async (dispatch, getState) => {
    const userAuth = getState().user.user;
    try {
        dispatch({ type: WISHLIST_USER_REQUEST });

        const { data } = await axios.get('/api/users/wishlist', {
            headers: {
                Authorization: `Bearer ${userAuth.token}`
            }
        });
        dispatch({
            type: WISHLIST_USER_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: WISHLIST_USER_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

