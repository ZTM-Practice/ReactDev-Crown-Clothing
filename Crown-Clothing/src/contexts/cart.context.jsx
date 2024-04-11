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
}

export const CartContext = createContext({
    showCartMenu: false,
    setShowCartMenu: () => null,
    cartItems: [],
    addCartItem: () => null,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [showCartMenu, setShowCartMenu] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        setCartTotal(cartItems.reduce((total, item) => {
            return total +  item.quantity
          }, 0));
    }, [cartItems]);

    const addCartItem = (itemToAdd) => {
        setCartItems(addItemToCart(cartItems, itemToAdd));
    };

    const value = { showCartMenu, setShowCartMenu, cartItems, addCartItem, cartTotal };
    
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
