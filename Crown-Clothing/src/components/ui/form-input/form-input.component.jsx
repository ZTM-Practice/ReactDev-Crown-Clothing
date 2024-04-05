import styles from './style.module.scss';

const FormInput = ({ label, ...props }) => {
    return (
        <div className={styles.group}>
            <input
                className={styles.formInput}
                {...props}
            />
            {label && (
            <label
                className={`${props.value.length ? styles.shrink : ''} ${styles.formInputLabel}`}
            >
                {label}
            </label>)}
        </div>
    )
};

export default FormInput;
