import { describe, expect, test } from "vitest";
import { selectCategories, selectCategoriesMap, selectCategoriesIsLoading } from "../category.selector";

const mockState = {
    categories: {
        isLoading: false,
        categories: [
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
        ],
    },
};

describe('Categories selector tests', () => {
    test('selectCategories should return the categories data', () => {
        const categoriesData = selectCategories(mockState);

        expect(categoriesData).toEqual(mockState.categories.categories);
    });

    test('selectCategoriesIsLoading should return isLoading state', () => {
        const isLoading = selectCategoriesIsLoading(mockState);
    
        expect(isLoading).toEqual(mockState.categories.isLoading);
    });

    test('selectCategoriesMap should convert the items array into the appropriate map', () => {
        const expectedCategoriesMap = {
            mens: [
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' },
              ],
            womens: [
                { id: 3, name: 'Product 3' },
                { id: 4, name: 'Product 4' },
              ],
        };

        expect(selectCategoriesMap(mockState)).toEqual(expectedCategoriesMap);
    })
})
