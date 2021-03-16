import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { bagReducer } from './reducers/bagReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    bag: bagReducer
});

const storedBag = localStorage.getItem('bagItems')
    ? JSON.parse(localStorage.getItem('bagItems'))
    : [];

const initialState = {
    bag: { bagItems: storedBag }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;