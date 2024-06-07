import { AnyAction } from "redux";
import { CartItem } from "./cart.type";
import { 
    setShowCartMenu, 
    setCartItems
} from "./cart.action";

export type CartState = {
    readonly showCartMenu: boolean;
    readonly cartItems: CartItem[];
}

const INITIAL_STATE: CartState = {
    showCartMenu: false,
    cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action: AnyAction): CartState => {
    if(setShowCartMenu.match(action)){
        return {
            ...state,
            showCartMenu: action.payload,
        }; 
    }

    if(setCartItems.match(action)){
        return {
            ...state,
            cartItems: action.payload,
        };
    }

    return state;
};
