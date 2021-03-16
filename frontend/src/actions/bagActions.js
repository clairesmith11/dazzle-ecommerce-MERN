import axios from 'axios';
import { BAG_ADD_ITEM } from '../constants/bagConstants';

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
            quantity
        }
    });

    localStorage.setItem('bagItems', JSON.stringify(getState().bag.bagItems));
};