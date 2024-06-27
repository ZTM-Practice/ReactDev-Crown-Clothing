import { categoryReducer, INITIAL_STATE } from "../category.reducer";

import { fetchCategoriesStart, fetchCategoriesFailed, fetchCategoriesSuccess } from "../category.action";

import { describe, expect, test } from "vitest";

describe('Category reducer action tests', () => {
    test('fetchCategoriesStart', () => {
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(categoryReducer(INITIAL_STATE, fetchCategoriesStart())).toEqual(expectedState);
    });

    test('fetchCategoriesSuccess', () => {
        const mockData = [
            {
              title: 'mens',
              imageUrl: 'test',
              items: [
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' },
              ],
            },
            {
              title: 'womens',
              imageUrl: 'test',
              items: [
                { id: 3, name: 'Product 3' },
                { id: 4, name: 'Product 4' },
              ],
            },
        ];

        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            categories: mockData,
        };

        expect(categoryReducer(INITIAL_STATE, fetchCategoriesSuccess(mockData))).toEqual(expectedState);
    });

    test('fetchCategoriesFailed', () => {
        const mockError = new Error('Error fetching categories');

        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            error: mockError,
        };

        expect(categoryReducer(INITIAL_STATE, fetchCategoriesFailed(mockError))).toEqual(expectedState);
    });
});
