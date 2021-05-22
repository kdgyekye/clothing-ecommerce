const INITIAL_STATE = {
    cartHidden: true
}

export const cart = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_CART':
        return {
            ...state,
            cartHidden: !state.cartHidden
        }
        default:
            return state
    }
}