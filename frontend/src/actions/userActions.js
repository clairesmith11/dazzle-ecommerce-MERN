import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGOUT
} from '../constants/userConstants';

export const userLogin = (email, password) => async (dispatch, getState) => {
    try {
        //Dispatch request to set loading state and empty user object
        dispatch({ type: USER_LOGIN_REQUEST });
        //Send request to backend for products data 
        const { data } = await axios.post('/api/users/login', { email, password }, {
            'Content-Type': 'application/json'
        });
        //Dispatch success to end loading and set products array contents
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('loggedInUser', JSON.stringify(getState().user.user));
    } catch (error) {
        //Dispatch failure to end loading and set error state
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const userRegister = (name, email, password) => async (dispatch, getState) => {
    try {
        //Dispatch request to set loading state and empty user object
        dispatch({ type: USER_REGISTER_REQUEST });
        //Send request to backend for products data 
        const { data } = await axios.post('/api/users', { name, email, password }, {
            'Content-Type': 'application/json'
        });
        //Dispatch success to end loading and set products array contents
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('loggedInUser', JSON.stringify(getState().newUser.user));
    } catch (error) {
        //Dispatch failure to end loading and set error state
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const userLogout = () => (dispatch) => {
    localStorage.removeItem('loggedInUser');
    dispatch({
        type: USER_LOGOUT
    });
};