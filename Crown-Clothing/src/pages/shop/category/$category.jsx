import { useState, useEffect, Fragment } from 'react'; 
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectCategoriesMap } from '../../../store/categories/category.selector'; 
import ProductCard from '../../../components/shop/product-card/product-card.component';
import styles from './style.module.scss';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [categoriesMap, category]);

    return (
        <Fragment>
            <h2 className={styles.categoryTitle}>{category.toUpperCase()}</h2>
            <div className={styles.categoryContainer}>
                {   products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </Fragment>
    )
}

export default Category;
