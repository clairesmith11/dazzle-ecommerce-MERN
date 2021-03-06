import {
    BAG_ADD_ITEM,
    BAG_REMOVE_ITEM,
    BAG_SAVE_SHIPPING_ADDRESS,
    BAG_SAVE_PAYMENT_METHOD,
    BAG_RESET_ITEMS
} from '../constants/bagConstants';

export const bagReducer = (initialState = { bagItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case BAG_ADD_ITEM:
            const item = action.payload;
            //Check if item has already been added to the customer's bag
            const itemInBagAlready = initialState.bagItems.find(x => x.product === item.product);
            //If item is already in the bag, map through the bag items and replace the match with the current item
            if (itemInBagAlready) {
                return {
                    ...initialState,
                    bagItems: initialState.bagItems.map(x => x.product === itemInBagAlready.product ? item : x)
                };
                //If item is new to the bag, push it onto the items array in state and local storage
            } else {
                return {
                    ...initialState,
                    bagItems: [...initialState.bagItems, item]
                };
            }
        case BAG_REMOVE_ITEM:
            return {
                ...initialState,
                bagItems: initialState.bagItems.filter(item => item.product !== action.payload)
            };
        case BAG_SAVE_SHIPPING_ADDRESS:
            return {
                ...initialState,
                shippingAddress: action.payload
            };
        case BAG_SAVE_PAYMENT_METHOD:
            return {
                ...initialState,
                paymentMethod: action.payload
            };
        case BAG_RESET_ITEMS:
            return {
                ...initialState,
                bagItems: [],
                shippingAddress: {}
            };
        default:
            return initialState;
    }
};

//call bag reset when user logs out