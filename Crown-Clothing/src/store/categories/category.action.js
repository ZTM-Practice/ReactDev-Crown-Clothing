import { CATEGORY_ACTION_TYPES } from "./category.type";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategories = (categoriesArray) => {
    return createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
};
