import { createSlice } from "@reduxjs/toolkit";
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, SEARCH_PRODUCTS, SORT_PRODUCTS } from "./ReducerType";


const initialState = {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                filteredProducts: action.payload, // Initialize filteredProducts with all products
            };
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'FILTER_PRODUCTS':
            const { category, priceRange } = action.payload;
            const filteredProducts = state.products.filter((product) => {
                const matchesCategory = category ? product.category === category : true;
                const matchesPrice = priceRange ? product.price <= priceRange : true;
                return matchesCategory && matchesPrice;
            });
            return {
                ...state,
                filteredProducts: filteredProducts,
            }
        case SORT_PRODUCTS:
            const sortedProducts = [...state.products].sort((a, b) => {
                if (action.payload === 'price-asc') {
                    return a.price - b.price;
                } else if (action.payload === 'price-desc') {
                    return b.price - a.price;
                } else if (action.payload === 'name-asc') {
                    return a.name.localeCompare(b.name);
                } else if (action.payload === 'name-desc') {
                    return b.name.localeCompare(a.name);
                }
                return 0;
            });
            return {
                ...state,
                products: sortedProducts,
            };
        case SEARCH_PRODUCTS:
            const searchedProducts = state.products.filter((product) =>
                product.name.toLowerCase().includes(action.payload.toLowerCase())
            );
            return {
                ...state,
                products: searchedProducts,
            };
        default:
            return state;
    }
};

export default productReducer;

