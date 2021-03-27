import axios from 'axios';

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
    CLEAR_PRODUCT_DETAILS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAILURE
} from '../constants/productConstants';

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        //Dispatch request to set loading state and empty products array
        dispatch({ type: PRODUCT_LIST_REQUEST });
        //Send request to backend for products data 
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        //Dispatch success to end loading and set products array contents
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        //Dispatch failure to end loading and set error state
        dispatch({
            type: PRODUCT_LIST_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try {
        //Dispatch request to set loading state and empty product object
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        //Dispatch success to end loading and set product object contents
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        //Dispatch failure to end loading and set error state
        dispatch({
            type: PRODUCT_DETAILS_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const clearProductDetails = () => async (dispatch) => {
    dispatch({ type: CLEAR_PRODUCT_DETAILS });
};

export const createProduct = () => async (dispatch, getState) => {
    try {
        //Dispatch request to set loading state and empty product object
        dispatch({ type: PRODUCT_CREATE_REQUEST });
        const userAuth = getState().user.user;
        //Dispatch success to end loading and set product object contents
        const { data } = await axios.post(`/api/products`, {}, {
            headers: {
                Authorization: `Bearer ${userAuth.token}`
            }
        });
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        //Dispatch failure to end loading and set error state
        dispatch({
            type: PRODUCT_CREATE_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};