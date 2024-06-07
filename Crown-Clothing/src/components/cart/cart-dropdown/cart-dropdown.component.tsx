import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectShowCartMenu, selectCartItems } from '../../../store/cart/cart.selector';
import { setShowCartMenu } from '../../../store/cart/cart.action';
import Button from '../../ui/button/button.component';
import CartItem from '../cart-item/cart-item.component';
import styles from './style.module.scss';

const CartDropdownMenu = () => {
    const dispatch = useDispatch();
    const showCartMenu = useSelector(selectShowCartMenu);
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        dispatch(setShowCartMenu(!showCartMenu));
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