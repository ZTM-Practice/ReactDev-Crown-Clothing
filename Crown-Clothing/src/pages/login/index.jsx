import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";

const login = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
        console.log(userDocRef)
    }
    
    return (
        <div>
            <h1>I'm the LOGIN PAGE</h1>
            <button onClick={logGoogleUser}>
                Login with Google
            </button>
        </div>
    );
};

export default login;
