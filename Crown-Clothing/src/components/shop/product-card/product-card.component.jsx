import { useContext } from 'react';
import Button from '../../ui/button/button.component';
import { CartContext } from '../../../contexts/cart.context';
import styles from './style.module.scss';

const ProductCard = ({product}) => {
    const { name, price, imageUrl } = product;
    const { addCartItem } = useContext(CartContext);

    const addItemToCart = () => {
        addCartItem(product);
    }
    
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
