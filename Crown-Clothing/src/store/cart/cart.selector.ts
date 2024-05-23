import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";

const selectCartReducer = (state): CartState => state.cart;

export const selectShowCartMenu = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice.showCartMenu
);

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice.cartItems 
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, item) => {
        return total +  item.quantity
      }, 0)
);

export const selectCartPrice = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, item) => {
        return total += item.quantity * item.price
    }, 0)
);
