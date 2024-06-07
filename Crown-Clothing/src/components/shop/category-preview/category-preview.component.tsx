import { FC } from 'react';
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';
import { CategoryItem } from '../../../store/categories/category.type';
import styles from './style.module.scss';

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
    return (
        <div className={styles.categoryPreviewContainer}>
            <h2>
                <Link className={styles.title} to={`category/${title}`}>{title.toUpperCase()}</Link>
            </h2>
            <div className={styles.preview}>
                {products
                .filter((_, i) => i < 4)
                .map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default CategoryPreview;
