import {
    WISHLIST_USER_REQUEST,
    WISHLIST_USER_SUCCESS,
    WISHLIST_USER_FAILURE
} from '../constants/wishListConstants';

export const wishlistReducer = (initialState = { wishlistItems: [] }, action) => {
    switch (action.type) {
        case WISHLIST_USER_REQUEST:
            return {
                loading: true
            };
        case WISHLIST_USER_SUCCESS:
            const items = action.payload;
            return {
                ...initialState,
                wishlistItems: items,
                loading: false
            };
        case WISHLIST_USER_FAILURE:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return initialState;
    }
};

