import { useContext } from 'react';
import Button from '../../ui/button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../../contexts/cart.context';
import styles from './style.module.scss';

const CartDropdownMenu = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className={styles.cartDropdownContainer}>
            <div className={styles.cartItems}></div>
            {cartItems.map((item) => {
                return (
                    <CartItem key={item.id} cartItem={item} />
                )
            })}
            <Button>Go To Checkout</Button>
        </div>
    )
};

export default CartDropdownMenu;