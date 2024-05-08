import { call, all, takeLatest, put } from "redux-saga/effects";
import { CATEGORY_ACTION_TYPES } from "./category.type";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export function* fetchCategoriesAsync(){
    try {
        const categoryArray = yield call(getCategoriesAndDocuments);
        yield put(fetchCategoriesSuccess(categoryArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories(){
    yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga(){
    yield all([call(onFetchCategories)]);
}
