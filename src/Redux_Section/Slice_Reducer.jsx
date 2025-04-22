import { createSlice } from "@reduxjs/toolkit";

const initialProduct = {
    allData: [],  // store the original list
    data: [],     // filtered or currently shown list
    addCartItems: [] // store the added cart items

};

export const FilterReducer = createSlice({
    name: 'fillProducts',
    initialState: initialProduct,
    reducers: {
        GetProducts: (state, action) => {
            state.allData = action.payload; // store the original list
            state.data = action.payload; // reset data to allData
        },
        Searching: (state, action) => {
            const value = action.payload.toLowerCase();
            state.data = state.allData.filter((product) =>
                product.name?.toLowerCase().includes(value)
            );
        },
    },
});

export const { GetProducts, Searching, AddCartItems } = FilterReducer.actions;

export default FilterReducer.reducer;