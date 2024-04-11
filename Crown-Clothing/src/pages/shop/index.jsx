import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/shop/product-card/product-card.component";
import styles from './style.module.scss';

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className={styles.productsContainer}>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
     ))}
    </div>
  )
};

export default Shop;
