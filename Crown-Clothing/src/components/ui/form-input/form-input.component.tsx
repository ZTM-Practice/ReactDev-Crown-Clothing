import { InputHTMLAttributes, FC } from 'react';
import styles from './style.module.scss';

type FormInputProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...props }) => {
    return (
        <div className={styles.group}>
            <input
                className={styles.formInput}
                {...props}
            />
            {label && (
            <label
                className={`${props.value && typeof props.value === 'string' && props.value.length ? styles.shrink : ''} ${styles.formInputLabel}`}
            >
                {label}
            </label>)}
        </div>
    )
};

export default FormInput;
