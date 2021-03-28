import {
    WISHLIST_ADD_ITEM_REQUEST,
    WISHLIST_ADD_ITEM_SUCCESS,
    WISHLIST_ADD_ITEM_FAILURE,
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

export const addItemToWishlist = (productId) => async (dispatch, getState) => {
    const userAuth = getState().user.user;
    try {
        dispatch({ type: WISHLIST_ADD_ITEM_REQUEST });

        const { data } = await axios.post(`/api/users/${productId}/wishlist`, {}, {
            headers: {
                Authorization: `Bearer ${userAuth.token}`
            }
        });

        dispatch({
            type: WISHLIST_ADD_ITEM_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: WISHLIST_ADD_ITEM_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }




};