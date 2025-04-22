import { ADD_CART_FAILURE, ADD_CART_SUCCESS, CREATE_ADD_CART, GET_ADD_CART_REQUEST, GET_SINGLE_PRODUCT_FAILURE, GET_SINGLE_PRODUCT_REQUEST, GET_SINGLE_PRODUCT_SUCCESS, REMOVE_CART_ITEM, UPDATE_CART_QUANTITY } from "./ReducerType";


const initialState = {
    addCartItems: [],
    singleProduct: [],
    success: false,
    error: null
};

export const AddCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADD_CART_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_CART_SUCCESS:
            return {
                ...state,
                success: true,
                addCartItems: action.payload,
            };
        case ADD_CART_FAILURE:
            return {
                ...state,
                error: action.payload,
                success: false
            };

        case CREATE_ADD_CART:
            return {
                ...state,
                addCartItems: [...state.addCartItems, action.payload],
            };
        case REMOVE_CART_ITEM:
            return {
                ...state,
                addCartItems: state?.addCartItems.filter((item) => item.id !== action.payload),
            };
        case UPDATE_CART_QUANTITY:
            const { id, quantityChange, priceChange, name } = action?.payload?.quantityItems;
            return {
                ...state,
                addCartItems: state.addCartItems.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            quantity: item.quantity + quantityChange,
                            price: item.price + priceChange,
                        };
                    }
                    return item;
                }),
            }
        case GET_SINGLE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                singleProduct: action.payload,
            };
        case GET_SINGLE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}