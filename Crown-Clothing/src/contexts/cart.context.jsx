import { createContext, useEffect, useState } from "react";

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

export const CartProvider = ({ children }) => {
    const [showCartMenu, setShowCartMenu] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartPrice, setCartPrice] = useState(0);

    useEffect(() => {
        setCartTotal(cartItems.reduce((total, item) => {
            return total +  item.quantity
          }, 0));
    }, [cartItems]);

    useEffect(() => {
        setCartPrice(cartItems.reduce((total, item) => {
            return total += item.quantity * item.price
        }, 0));
    }, [cartItems]);

    const addCartItem = (itemToAdd) => {
        setCartItems(addItemToCart(cartItems, itemToAdd));
    };

    const removeCartItem = (itemToRemove) => {
        setCartItems(removeItemFromCart(cartItems, itemToRemove));
    }

    const clearCartItem = (itemToClear) => {
        setCartItems(clearItemFromCart(cartItems, itemToClear));
    };

    const value = { 
        showCartMenu, setShowCartMenu, cartItems, addCartItem, cartTotal, removeCartItem, clearCartItem, cartPrice
     };
    
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
