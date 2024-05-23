import { CART_ACTION_TYPES, CartItem } from "./cart.type";
import { CategoryItem } from "../categories/category.type";
import { createAction, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

const addItemToCart = (cartItems: CartItem[], itemToAdd: CategoryItem): CartItem[] => {
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

const clearItemFromCart = (cartItems: CartItem[], itemToClear: CartItem): CartItem[] => {
    return cartItems.filter((item) => item.id !== itemToClear.id);
};

const removeItemFromCart = (cartItems: CartItem[], itemToRemove: CartItem): CartItem[] => {
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

export const setShowCartMenu = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
});

export const addCartItem = (cartItems: CartItem[], itemToAdd: CategoryItem) => {
    const newCartItems = addItemToCart(cartItems, itemToAdd);
    return setCartItems(newCartItems);
};

export const removeCartItem = (cartItems: CartItem[], itemToRemove: CartItem) => {
    const newCartItems = removeItemFromCart(cartItems, itemToRemove);
    return setCartItems(newCartItems);
};

export const clearCartItem = (cartItems: CartItem[], itemToClear: CartItem) => {
    const newCartItems = clearItemFromCart(cartItems, itemToClear);
    return setCartItems(newCartItems);
};

export const clearCart = () => setCartItems([]);
