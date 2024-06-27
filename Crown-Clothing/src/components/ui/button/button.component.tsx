import styles from "./style.module.scss";
import ButtonLoadingSpinner from "../button-loading-spinner/button-loading-spinner.component";
import { ButtonHTMLAttributes, FC } from "react";

export enum BUTTON_TYPE_CLASSES {
    google = 'googleSignIn',
    inverted = 'inverted',
};

export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType = null, isLoading, ...props }) => {
    return (
        <button
            {...props}
            className={buttonType ? `${styles[buttonType]} ${styles.buttonContainer}` : `${styles.buttonContainer}`}
            disabled={isLoading}
        >
            {isLoading ? <ButtonLoadingSpinner /> : children}
        </button>
    )
}

export default Button;