import axios from 'axios';

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILURE,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        //Dispatch request to set loading state and empty products array
        dispatch({ type: ORDER_CREATE_REQUEST });
        //Get user token
        const userAuth = getState().user.user;
        //Send request to backend for products data 
        const { data } = await axios.post(
            '/api/orders',
            order,
            {
                'Content-Type': 'application/json',
                headers:
                    { Authorization: `Bearer ${userAuth.token}` }
            });

        //Dispatch success to end loading and set products array contents
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        //Dispatch failure to end loading and set error state
        dispatch({
            type: ORDER_CREATE_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const listOrders = () => async (dispatch, getState) => {
    try {
        //Dispatch request to set loading state and empty products array
        dispatch({ type: ORDER_LIST_REQUEST });
        //Get user token
        const userAuth = getState().user.user;
        //Send request to backend for products data 
        const { data } = await axios.get(
            '/api/orders',
            {
                headers:
                    { Authorization: `Bearer ${userAuth.token}` }
            });

        //Dispatch success to end loading and set products array contents
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        //Dispatch failure to end loading and set error state
        dispatch({
            type: ORDER_LIST_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};