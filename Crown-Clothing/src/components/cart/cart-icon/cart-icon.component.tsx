/// <reference types="vite-plugin-svgr/client" />
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount, selectShowCartMenu } from '../../../store/cart/cart.selector';
import { setShowCartMenu } from '../../../store/cart/cart.action';
import ShoppingBagIcon from '../../../public/shopping-bag.svg?react';
import styles from './style.module.scss';

const CartIcon = () => {
    const dispatch = useDispatch();
    const showCartMenu = useSelector(selectShowCartMenu);
    const cartCount = useSelector(selectCartCount);

    const toggleCartMenu = () => {
        dispatch(setShowCartMenu(!showCartMenu));
    }

    return (
        <div className={styles.cartIconContainer} onClick={toggleCartMenu}>
            <ShoppingBagIcon className={styles.shoppingIcon} />
            <span className={styles.itemCount}>{cartCount}</span>
        </div>
    )
}

export default CartIcon;