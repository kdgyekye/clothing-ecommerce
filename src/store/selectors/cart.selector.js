import {createSelector} from "reselect";

const selectCart = state => state.cartReducer;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const selectCartToggle = createSelector(
    [selectCart],
    cart => cart.cartHidden
)
export const selectCartItemsQuantity = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((total,currentItem) => total + currentItem.quantity,0)
)

export const selectItemsTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((total,currentItem) => total + currentItem.quantity*currentItem.price,0)
)
