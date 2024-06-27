import { testSaga, expectSaga } from "redux-saga-test-plan";
import { call } from "typed-redux-saga";
import { throwError } from "redux-saga-test-plan/providers";
import { describe, test } from "vitest"

import {
    fetchCategoriesAsync,
    onFetchCategories,
    categoriesSaga,
} from '../category.saga';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "../category.action";
import { CATEGORY_ACTION_TYPES } from "../category.type";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";

const mockCategoriesArray = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
];

describe('category saga tests', () => {
    // test('categoriesSaga', () => {
    //     testSaga(categoriesSaga)
    //       .next()
    //       .all([call(onFetchCategories)])
    //       .next()
    //       .isDone();
    //   });

    test('onFetchCategories should takeLatest FETCH_CATEGORIES_START and call fetchCategoriesAsync', () => {
        testSaga(onFetchCategories)
          .next()
          .takeLatest(
            CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
            fetchCategoriesAsync
          )
          .next()
          .isDone();
    });

    // test('fetchCategoriesAsync success', () => {
    //   return expectSaga(fetchCategoriesAsync)
    //     .provide([[call(getCategoriesAndDocuments), mockCategoriesArray]])
    //     .put(fetchCategoriesSuccess(mockCategoriesArray))
    //     .run();
    // });
  
    // test('fetchCategoriesAsync failure', () => {
    //   const error = new Error('An error occurred');
    //   return expectSaga(fetchCategoriesAsync)
    //     .provide([[call(getCategoriesAndDocuments), throwError(error)]])
    //     .put(fetchCategoriesFailed(error))
    //     .run();
    // });
});
