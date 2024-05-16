import styles from "./style.module.scss";
import ButtonLoadingSpinner from "../button-loading-spinner/button-loading-spinner.component";

export const BUTTON_TYPE_CLASSES = {
    google: 'googleSignIn',
    inverted: 'inverted',
}

const Button = ({ children, buttonType, isLoading, ...props }) => {
    const buttonTypeClass = BUTTON_TYPE_CLASSES[buttonType]
    return (
        <button
            {...props}
            className={`${styles.buttonContainer} ${styles[buttonTypeClass]}`}
            disabled={isLoading}
        >
            {isLoading ? <ButtonLoadingSpinner /> : children}
        </button>
    )
}

export default Button;