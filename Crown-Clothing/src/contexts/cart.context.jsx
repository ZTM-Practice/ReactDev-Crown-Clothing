import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
    showCartMenu: false,
    setShowCartMenu: () => null,
    cartItems: [],
    addCartItem: () => null,
    cartTotal: 0,
    removeCartItem: () => null,
    clearCartItem: () => null,
    cartPrice: 0,
});

const CART_ACTION_TYPES = {
    TOGGLE_CART_MENU: 'TOGGLE_CART_MENU',
    UPDATE_CART_ITEMS: 'UPDATE_CART_ITEMS',
};

const INITIAL_STATE = {
    showCartMenu: false,
    cartItems: [],
    cartTotal: 0,
    cartPrice: 0,
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type){
        case CART_ACTION_TYPES.UPDATE_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.TOGGLE_CART_MENU:
            return {
                ...state,
                showCartMenu: payload,
            };
        default:
            throw new Error(`Unhandled Action Type in Cart Reducer: ${type}`);
    }
};

export const CartProvider = ({ children }) => {
    const [{ cartItems, cartTotal, cartPrice, showCartMenu }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartReducer = (newCartItems) => {
        const newCartTotal = newCartItems.reduce((total, item) => {
            return total +  item.quantity
          }, 0);
        const newCartPrice = newCartItems.reduce((total, item) => {
            return total += item.quantity * item.price
        }, 0);

        dispatch(createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartPrice: newCartPrice,
            })
        );
    };

    const addCartItem = (itemToAdd) => {
        const newCartItems = addItemToCart(cartItems, itemToAdd);
        updateCartReducer(newCartItems);
    };

    const removeCartItem = (itemToRemove) => {
        const newCartItems = removeItemFromCart(cartItems, itemToRemove);
        updateCartReducer(newCartItems);
    };

    const clearCartItem = (itemToClear) => {
        const newCartItems = clearItemFromCart(cartItems, itemToClear);
        updateCartReducer(newCartItems);
    };
    
    const setShowCartMenu = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_MENU, bool));
    };

    const value = { 
        showCartMenu, 
        setShowCartMenu, 
        cartItems, 
        addCartItem, 
        cartTotal, 
        removeCartItem, 
        clearCartItem,
        cartPrice,
     };
    
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
