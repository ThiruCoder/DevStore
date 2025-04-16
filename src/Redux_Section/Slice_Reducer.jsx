import { createSlice } from "@reduxjs/toolkit";

const initialProduct = {
    data: []
};

export const FilterReducer = createSlice({
    name: 'fillProducts',
    initialState: initialProduct,
    reducers: {
        GetProducts: (state, action) => {
            // Append items to the existing data array
            state.data = [...state.data, ...action.payload];
        },
        Searching: (state, action) => {
            const value = action.payload.toLowerCase();
            // Filter the data based on the search value
            state.data = state.data.filter((product) =>
                product.name?.toLowerCase().includes(value)
            );
        }
    }
});

export const { GetProducts, Searching } = FilterReducer.actions;

export default FilterReducer.reducer;