import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../../ui/form-input/form-input.component";
import Button from "../../ui/button/button.component";
import { googleSignInStart, emailSignInStart } from "../../../store/user/user.action";
import styles from "./style.module.scss";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const resetFieldNames = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogleUser = () => {
        dispatch(googleSignInStart());
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            dispatch(emailSignInStart(email, password))
            resetFieldNames();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                  alert('incorrect password for email');
                  break;
                case 'auth/user-not-found':
                  alert('no user associated with this email');
                  break;
                default:
                  alert('Something went wrong. Check the console for the error')  
                  console.log(error);
              }
        }
    };

    return (
        <div className={styles.signInContainer}>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    name="email" 
                    value={email} 
                    onChange={handleChange}
                />
                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    name="password" 
                    value={password} 
                    onChange={handleChange}
                />
                <div className={styles.buttonsContainer}>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={'google'} type="button" onClick={signInWithGoogleUser}>Google Sign In</Button>
                </div>     
            </form>
        </div>
    )
}

export default SignInForm;