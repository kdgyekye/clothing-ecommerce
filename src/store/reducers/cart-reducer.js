import {addItemToCart, addItemToCartWithQuantity, reduceItemQuantity} from "../../utils/cart.utils";

const INITIAL_STATE = {
    cartHidden: true,
    cartItems: [],
}

export const cart = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_CART':
            return {
                ...state,
                cartHidden: !state.cartHidden
            }
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems,action.payload)
            }
        case 'ADD_WITH_QUANTITY':
            return {
                ...state,
                cartItems: addItemToCartWithQuantity(state.cartItems, action.payload)
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }
        case 'REDUCE_QUANTITY_IN_CART':
            return {
                ...state,
                cartItems: reduceItemQuantity(state.cartItems,action.payload)
            }
        case 'CLEAR_ALL':
            return {
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}