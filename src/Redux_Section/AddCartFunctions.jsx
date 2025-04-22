import axios from "axios";
import Swal from "sweetalert2";
import { ADD_CART_FAILURE, ADD_CART_SUCCESS, GET_ADD_CART_REQUEST, GET_SINGLE_PRODUCT_FAILURE, GET_SINGLE_PRODUCT_SUCCESS, REMOVE_CART_ITEM } from "./ReducerType";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchCartProducts = () => async (dispatch) => {
    dispatch({ type: GET_ADD_CART_REQUEST });
    try {
        const response = await axios.get(`${backendUrl}/products/getAddCarts`);
        dispatch({ type: ADD_CART_SUCCESS, payload: response?.data?.data });
    } catch (error) {
        dispatch({ type: ADD_CART_FAILURE, payload: error.message });
    }
};

export const CreateToCart = (product) => async (dispatch) => {
    try {
        const response = await axios.post(`${backendUrl}/products/createAddCart`, product, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        // const quantityItems={ id:product?.id, quantityChange:product?.quantity, priceChange:product?.price, name:product?.name }
        dispatch({ type: ADD_CART_SUCCESS, payload: response.data.data });
        if (response?.data?.message === 'Cart created successfully') {
            Swal.fire({
                toast: true,
                position: 'top-end', // top-right corner
                icon: 'success', // 'success', 'error', 'warning', 'info', or 'question'
                title: response?.data?.message,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.style.top = '60px'; // 👈 set custom top distance
                }
            });
        }
        if (response?.data?.message === 'Cart quantity is increased successfully') {
            Swal.fire({
                toast: true,
                position: 'top-end', // top-right corner
                icon: 'success', // 'success', 'error', 'warning', 'info', or 'question'
                title: response?.data?.message,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.style.top = '60px'; // 👈 set custom top distance
                }
            });
        }
        if (response?.data?.message === 'Product not found with that ID.') {
            Swal.fire({
                toast: true,
                position: 'top-end', // top-right corner
                icon: 'error', // 'success', 'error', 'warning', 'info', or 'question'
                title: response?.data?.message,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.style.top = '60px'; // 👈 set custom top distance
                }
            });
        }

    } catch (error) {
        console.error('Failed to add product to cart:', error);
    }
};

export const removeCartItem = (id) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
}

export const GetSingleProduct = (id) => async (dispatch) => {
    dispatch({ type: GET_ADD_CART_REQUEST });

    try {
        const response = await axios.get(`${backendUrl}/products/getProductsById/${id}`);
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_SINGLE_PRODUCT_FAILURE, payload: error.message });
    }
}
