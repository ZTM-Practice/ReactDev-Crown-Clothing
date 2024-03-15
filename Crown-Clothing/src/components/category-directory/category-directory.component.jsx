import CategoryItem from '../category-item/category-item.component';
import styles from './style.module.scss';

const CategoryDirectory = ({ categories }) => {
      return (
        <div className={styles.directoryContainer}>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      )
}

export default CategoryDirectory;