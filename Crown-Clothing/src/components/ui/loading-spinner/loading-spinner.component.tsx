import styles from './style.module.scss';

const LoadingSpinner = () => {
    return (
        <div className={styles.spinnerOverlay} data-testid='spinner'>
            <div className={styles.spinnerContainer} />
        </div>
    )
};

export default LoadingSpinner;
