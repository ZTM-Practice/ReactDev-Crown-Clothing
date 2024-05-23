import { AnyAction } from "redux";
import { 
    Categories } from "./category.type";
import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from "./category.action";

export type CategoriesState = {
    categories: Categories[];
    isLoading: boolean;
    error: Error | null;
}

const INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
};

export const categoryReducer = (state = INITIAL_STATE, action = {} as AnyAction): CategoriesState => {
    if(fetchCategoriesStart.match(action)){
        return {
            ...state,
            isLoading: true,
        };
    };

    if(fetchCategoriesSuccess.match(action)){
        return {
            ...state,
            categories: action.payload,
            isLoading: false,
        };
    };

    if(fetchCategoriesFailed.match(action)){
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        };
    };

    return state;
};
