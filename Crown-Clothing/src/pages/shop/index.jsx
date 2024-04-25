import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import CategoryPreview from "../../components/shop/category-preview/category-preview.component";
import styles from './style.module.scss';

const Shop = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

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
