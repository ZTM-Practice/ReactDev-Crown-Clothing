import { useState } from "react";
import { createAuthUserFromEmailAndPassword, createUserDocFromAuth } from "../../../utils/firebase/firebase.utils";
import FormInput from "../../ui/form-input/form-input.component";
import Button from "../../ui/button/button.component";
import styles from "./style.module.scss";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFieldNames = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Password and Confirmed Password are not matching');
            return;
        }

        try {
            const { user } = await createAuthUserFromEmailAndPassword(email, password);
            await createUserDocFromAuth(user, { displayName });
            resetFieldNames();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    return (
        <div className={styles.signUpContainer}>
            <h2>Do not have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="User Name"
                    type="text" 
                    required 
                    name="displayName" 
                    value={displayName} 
                    onChange={handleChange}
                />
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
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={handleChange}
                />
                <Button type="submit">Sign Up</Button>        
            </form>
        </div>
    )
};

export default SignUpForm;