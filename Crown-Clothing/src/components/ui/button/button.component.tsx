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

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...props }) => {
    let buttonTypeClass: string = '';
    if(buttonType){
        buttonTypeClass = BUTTON_TYPE_CLASSES[buttonType as keyof typeof BUTTON_TYPE_CLASSES]
    }
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