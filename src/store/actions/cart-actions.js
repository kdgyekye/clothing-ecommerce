export const toggleCart = () => {
    return {
        type: 'TOGGLE_CART',
    }
}

export const addItem = item => ({
    type: 'ADD_TO_CART',
    payload: item
})

export const addItemWithQuantity = item => ({
    type: 'ADD_QUANTITY',
    payload: item
})

export const removeFromCart = item => ({
    type: 'REMOVE_FROM_CART',
    payload: item
})

export const reduceQuantity = item => ({
    type: 'REDUCE_QUANTITY_IN_CART',
    payload: item
})

export const clearAllFromCart = () => ({
    type: 'CLEAR_ALL',
})