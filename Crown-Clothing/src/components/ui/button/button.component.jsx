import styles from "./style.module.scss";

const BUTTON_TYPE_CLASSES = {
    google: 'googleSignIn',
    inverted: 'inverted',
}

const Button = ({ children, buttonType, ...props }) => {
    return (
        <button
            {...props}
            className={`${styles.buttonContainer} ${styles[BUTTON_TYPE_CLASSES[buttonType]]}`}
        >
            {children}
        </button>
    )
}

export default Button;