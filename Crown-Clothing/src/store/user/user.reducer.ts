import { AnyAction } from "redux-saga";
import { UserData } from "../../utils/firebase/firebase.utils.js";
import { 
    signInSuccess,
    signOutSuccess,
    signInFailed,
    signUpFailed,
    signOutFailed,
 } from "./user.action.js";

export type UserState = {
    readonly currentUser: UserData | null,
    readonly isLoading: boolean,
    readonly error: Error | null,
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {
    if(signInSuccess.match(action)){
        return {
            ...state,
            currentUser: action.payload,
        };
    };

    if(signOutSuccess.match(action)){
        return {
            ...state,
            currentUser: null,
        };
    };

    if(signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)){
        return {
            ...state,
            error: action.payload,
        }
    };

    return state;
};
