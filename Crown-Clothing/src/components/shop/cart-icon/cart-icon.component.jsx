import { useContext } from 'react';
import { CartContext } from '../../../contexts/cart.context';
import ShoppingBagIcon from '../../../../public/shopping-bag.svg?react';
import styles from './style.module.scss';

const CartIcon = () => {
    const { showCartMenu, setShowCartMenu, cartTotal } = useContext(CartContext);

    const toggleCartMenu = () => {
        setShowCartMenu(!showCartMenu);
    }

    return (
        <div className={styles.cartIconContainer} onClick={toggleCartMenu}>
            <ShoppingBagIcon className={styles.shoppingIcon} />
            <span className={styles.itemCount}>{cartTotal}</span>
        </div>
    )
}

export default CartIcon;