import {addItemToCart, reduceItemQuantity} from "../../utils/cart.utils";

const INITIAL_STATE = {
    cartHidden: true,
    cartItems: []
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
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }
        case 'REDUCE_QUANTITY_IN_CART':
            return {
                ...state,
                cartItems: reduceItemQuantity(state,action.payload)
            }
        default:
            return state
    }
}