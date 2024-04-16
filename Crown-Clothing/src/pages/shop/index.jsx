import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/shop/category-preview/category-preview.component";
import styles from './style.module.scss';

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div className={styles.shopContainer}>
      {
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          )
        })
      }
    </div>
  )
};

export default Shop;
