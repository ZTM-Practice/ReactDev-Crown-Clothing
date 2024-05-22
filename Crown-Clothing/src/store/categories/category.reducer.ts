import { CATEGORY_ACTION_TYPES, Categories } from "./category.type";
import { CategoryActions } from "./category.action";

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

export const categoryReducer = (state = INITIAL_STATE, action = {} as CategoryActions) => {
    switch (action.type){
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true,
            };
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                isLoading: false,
            };
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};
