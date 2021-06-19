export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    )
    if (existingItem) {
        console.log(existingItem)
        return cartItems.map( cartItem =>
            cartItem.id === cartItemToAdd.id ? {...cartItem, quantity:cartItem.quantity+1}
                :
                cartItem
        )
    }
    console.log(cartItemToAdd)
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}
export const addItemToCartWithQuantity = (cartItems, cartItemToAdd) => {
    return [...cartItems, cartItemToAdd]
}

export const reduceItemQuantity = (cartItems, itemToRemove) => {
    if (itemToRemove.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id)
    }

    return cartItems.map(cartItem =>
        cartItem.id === itemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
             : cartItem
     );
}
