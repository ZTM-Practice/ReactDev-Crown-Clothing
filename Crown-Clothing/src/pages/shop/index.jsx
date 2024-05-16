import { useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/category.selector";
import CategoryPreview from "../../components/shop/category-preview/category-preview.component";
import LoadingSpinner from "../../components/ui/loading-spinner/loading-spinner.component";
import styles from "./style.module.scss";

const Shop = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);

  return (
    <div className={styles.shopContainer}>
      {
        categoriesIsLoading ? (
          <LoadingSpinner />
        ) : (
          Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return (
              <CategoryPreview key={title} title={title} products={products} />
            )
          })
        )
      }
    </div>
  )
};

export default Shop;
