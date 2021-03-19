import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { bagReducer } from './reducers/bagReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    bag: bagReducer,
    user: userLoginReducer,
    newUser: userRegisterReducer
});

const storedBag = localStorage.getItem('bagItems')
    ? JSON.parse(localStorage.getItem('bagItems'))
    : [];

const storedUser = localStorage.getItem('loggedInUser')
    ? JSON.parse(localStorage.getItem('loggedInUser'))
    : [];


const initialState = {
    bag: { bagItems: storedBag },
    user: { user: storedUser }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;