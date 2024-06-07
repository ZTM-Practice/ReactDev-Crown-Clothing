import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

type CategoryItemProps = {
  category: {
    id: number;
    title: string;
    imageUrl: string;
    route: string;
  };
};

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
    const { title, imageUrl, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <div className={styles.categoryContainer} onClick={onNavigateHandler}>
          <div className={styles.backgroundImage} style={{backgroundImage: `url(${imageUrl})`}}/>
          <div className={styles.categoryBodyContainer}>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
    )
};

export default CategoryItem;
