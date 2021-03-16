import { STATES } from 'mongoose';
import { BAG_ADD_ITEM } from '../constants/bagConstants';

export const bagReducer = (initialState = { bagItems: [] }, action) => {
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
        default:
            return initialState;
    }
};