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