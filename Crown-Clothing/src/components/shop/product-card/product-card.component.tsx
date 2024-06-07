import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../../store/cart/cart.selector';
import { addCartItem } from '../../../store/cart/cart.action';
import Button, { BUTTON_TYPE_CLASSES } from '../../ui/button/button.component';
import { CategoryItem } from '../../../store/categories/category.type';
import styles from './style.module.scss';
import { FC } from 'react';

type ProductCardProps = {
    product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({product}) => {
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
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addItemToCart}>Add To Cart</Button>
        </div>
    )
};

export default ProductCard;
