import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../../store/cart/cart.selector';
import { addCartItem } from '../../../store/cart/cart.action';
import Button from '../../ui/button/button.component';
import styles from './style.module.scss';

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, price, imageUrl } = product;

    const addItemToCart = () => {
        dispatch(addCartItem(cartItems, product));
    };
    
    return (
        <div className={styles.productCardContainer}>
            <img src={imageUrl} alt={`${name}`}/>
            <div className={styles.footer}>
                <span className={styles.name}>{name}</span>
                <span className={styles.price}>{price}</span>
            </div>
            <Button buttonType={'inverted'} onClick={addItemToCart}>Add To Cart</Button>
        </div>
    )
};

export default ProductCard;
