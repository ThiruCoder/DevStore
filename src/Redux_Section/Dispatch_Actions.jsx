// src/redux/actions/productActions.js

import axios from "axios";
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, SEARCH_PRODUCTS } from "./ReducerType";



export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const backendUrl = 'https://mern-ecom-backend-q7di.onrender.com'
    const backendTrilUrl = 'http://localhost:5000'

    try {
        const response = await axios.get(`${backendUrl}/products/getProducts`);
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response?.data });
    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const searchProducts = (searchTerm) => ({
    type: SEARCH_PRODUCTS,
    payload: searchTerm,
});