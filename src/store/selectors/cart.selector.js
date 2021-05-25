import {createSelector} from "reselect";

const selectCart = state => state.cartReducer;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const selectCartItemsQuantity = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((total,currentItem) => total + currentItem.quantity,0)
)
