export const toggleCart = () => {
    return {
        type: 'TOGGLE_CART',
    }
}

export const addItem = item => ({
    type: 'ADD_TO_CART',
    payload: item
})

export const removeFromCart = item => ({
    type: 'REMOVE_FROM_CART',
    payload: item
})