import axios from 'axios';
import { BAG_ADD_ITEM, BAG_REMOVE_ITEM } from '../constants/bagConstants';

export const addItemToBag = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
        type: BAG_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            inStock: data.inStock,
            price: data.salePrice ? data.salePrice : data.price,
            quantity: +quantity
        }
    });

    localStorage.setItem('bagItems', JSON.stringify(getState().bag.bagItems));
};

export const removeItemFromBag = (id) => (dispatch, getState) => {
    dispatch({
        type: BAG_REMOVE_ITEM,
        payload: id
    });

    localStorage.setItem('bagItems', JSON.stringify(getState().bag.bagItems));
};