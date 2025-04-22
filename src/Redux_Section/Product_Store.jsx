

import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';
import productReducer from './Product_Reducer';
import FilterReducer from './Slice_Reducer';
import { AddCartReducer } from './AddCart_Reducer';

// Create the Redux store
const store = configureStore({
    reducer: {
        products: productReducer,
        fillProducts: FilterReducer,
        cartItems: AddCartReducer
    }
});

export default store;