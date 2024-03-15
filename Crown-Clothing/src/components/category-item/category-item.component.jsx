import styles from './style.module.scss';

const CategoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    return (
        <div className={styles.categoryContainer}>
          <div className={styles.backgroundImage} style={{backgroundImage: `url(${imageUrl})`}}/>
          <div className={styles.categoryBodyContainer}>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
    )
};

export default CategoryItem;
