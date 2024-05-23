import { CATEGORY_ACTION_TYPES, Categories } from "./category.type";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";

export type FetchCategoriesStart = Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Categories[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);
});

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Categories[]): FetchCategoriesSuccess => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);
});

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
});
