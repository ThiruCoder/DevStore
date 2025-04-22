// src/redux/actions/productActions.js

import axios from "axios";
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, SEARCH_PRODUCTS } from "./ReducerType";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    try {
        const response = await axios.get(`${backendUrl}/products/getProducts`);
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response?.data });
    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
    }
};

