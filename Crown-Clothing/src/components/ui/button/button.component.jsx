import styles from "./style.module.scss";

const BUTTON_TYPE_CLASSES = {
    google: 'googleSignIn',
    inverted: 'inverted',
}

const Button = ({ children, buttonType, ...props }) => {
    const buttonTypeClass = BUTTON_TYPE_CLASSES[buttonType]
    return (
        <button
            {...props}
            className={`${styles.buttonContainer} ${styles[buttonTypeClass]}`}
        >
            {children}
        </button>
    )
}

export default Button;