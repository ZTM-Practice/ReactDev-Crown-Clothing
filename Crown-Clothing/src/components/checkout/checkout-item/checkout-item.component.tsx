import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../../store/cart/cart.selector";
import { addCartItem, removeCartItem, clearCartItem } from "../../../store/cart/cart.action";
import { CartItem } from "../../../store/cart/cart.type";
import styles from "./style.module.scss";

type CheckoutItemProps = {
    cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, quantity, price, imageUrl } = cartItem; 

    const addItemHandler = () => {
        dispatch(addCartItem(cartItems, cartItem))
    };

    const removeItemHandler = () => {
        dispatch(removeCartItem(cartItems, cartItem))
    };

    const clearItemHandler = () => {
        dispatch(clearCartItem(cartItems, cartItem))
    };

    return (
        <div className={styles.checkoutItemContainer}>
            <div className={styles.imageContainer}>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className={styles.name}>{name}</span>
            <span className={styles.quantity}>
                <div className={styles.arrow} onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className={styles.value}>{quantity}</span>
                <div className={styles.arrow} onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className={styles.price}>{price}</span>
            <div className={styles.removeButton} onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;
