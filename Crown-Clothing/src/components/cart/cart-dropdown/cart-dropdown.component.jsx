import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../../contexts/cart.context';
import styles from './style.module.scss';

const CartDropdownMenu = () => {
    const { cartItems, setShowCartMenu, showCartMenu } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        setShowCartMenu(!showCartMenu);
        navigate('/checkout');
    }

    return (
        <div className={styles.cartDropdownContainer}>
            <div className={styles.cartItems}>
            {cartItems.map((item) => {
                return (
                    <CartItem key={item.id} cartItem={item} />
                )
            })}
            </div>
            <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
        </div>
    )
};

export default CartDropdownMenu;