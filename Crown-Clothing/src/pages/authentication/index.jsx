import SignInForm from "../../components/sign-in/signInForm.component";
import SignUpForm from "../../components/sign-up/signUpForm.component";
import styles from "./style.module.scss";

const Authentication = () => {
    return (
        <div className={styles.authenticationContainer}>
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;
