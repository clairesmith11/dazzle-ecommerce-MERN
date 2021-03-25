import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, productDetailsReducer, productCreateReducer } from './reducers/productReducers';
import { bagReducer } from './reducers/bagReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { orderCreateReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    bag: bagReducer,
    user: userLoginReducer,
    newUser: userRegisterReducer,
    order: orderCreateReducer
});

const storedBag = localStorage.getItem('bagItems')
    ? JSON.parse(localStorage.getItem('bagItems'))
    : [];

const storedUser = localStorage.getItem('loggedInUser')
    ? JSON.parse(localStorage.getItem('loggedInUser'))
    : null;

const storedShippingAddress = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};


const initialState = {
    bag: { bagItems: storedBag, shippingAddress: storedShippingAddress },
    user: { user: storedUser },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;