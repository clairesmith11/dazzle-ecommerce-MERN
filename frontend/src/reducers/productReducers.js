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
    PRODUCT_CREATE_FAILURE,
    CLEAR_PRODUCT_CREATE
} from '../constants/productConstants';

export const productListReducer = (initialState = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page
            };
        case PRODUCT_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export const productDetailsReducer = (initialState = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...initialState };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAILURE:
            return { loading: false, error: action.payload };
        case CLEAR_PRODUCT_DETAILS:
            return { loading: true, product: { reviews: [] } };
        default:
            return initialState;
    }
};

export const productCreateReducer = (initialState = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAILURE:
            return { loading: false, error: action.payload };
        case CLEAR_PRODUCT_CREATE:
            return {};
        default:
            return initialState;
    }
};