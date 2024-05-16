import { CART_ACTION_TYPES } from "./cart.type";
import { createAction } from "../../utils/reducer/reducer.utils";

const addItemToCart = (cartItems, itemToAdd) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === itemToAdd.id
    );

    if (existingCartItem){
        return cartItems.map((item) => (
            item.id === itemToAdd.id 
                ? {...item, quantity: item.quantity + 1} 
                : item
        ))
    }

    return [...cartItems, {...itemToAdd, quantity: 1}];
};

const clearItemFromCart = (cartItems, itemToClear) => {
    return cartItems.filter((item) => item.id !== itemToClear.id);
};

const removeItemFromCart = (cartItems, itemToRemove) => {
    if(itemToRemove.quantity === 1){
        return cartItems.filter((item) => item.id !== itemToRemove.id);
    } else {
        return cartItems.map((item) => (
            item.id === itemToRemove.id
                ? {...item, quantity: item.quantity - 1}
                : item
        ))
    }
}

export const setShowCartMenu = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addCartItem = (cartItems, itemToAdd) => {
    const newCartItems = addItemToCart(cartItems, itemToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeCartItem = (cartItems, itemToRemove) => {
    const newCartItems = removeItemFromCart(cartItems, itemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearCartItem = (cartItems, itemToClear) => {
    const newCartItems = clearItemFromCart(cartItems, itemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearCart = () => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, []);
