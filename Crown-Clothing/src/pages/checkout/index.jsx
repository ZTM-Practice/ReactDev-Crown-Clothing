import { useSelector } from "react-redux";
import { selectCartItems, selectCartPrice } from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout/checkout-item/checkout-item.component";
import styles from "./style.module.scss";

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartPrice = useSelector(selectCartPrice);

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.checkoutHeader}>
                <div className={styles.headerBlock}>
                    <span>Product</span>
                </div>
                <div className={styles.headerBlock}>
                    <span>Description</span>
                </div>
                <div className={styles.headerBlock}>
                    <span>Quantity</span>
                </div>
                <div className={styles.headerBlock}>
                    <span>Price</span>
                </div>
                <div className={styles.headerBlock}>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((item) => {
                return <CheckoutItem key={item.id} cartItem={item} />
            })}
            <span className={styles.total}>Total: ${cartPrice}</span>
        </div>
    )
};

export default Checkout;
