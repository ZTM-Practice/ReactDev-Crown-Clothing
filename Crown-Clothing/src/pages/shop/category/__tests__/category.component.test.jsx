import { screen } from "@testing-library/react";

import Category from "../$category";
import { renderWithProviders } from "../../../../utils/test-utils/test.utils";

import { describe, expect, test, vi } from "vitest";

vi.mock('react-router-dom', async () => {
    const reactRouterDom = await vi.importActual('react-router-dom');

    return { 
        ...reactRouterDom, 
        useParams: () => ({
            category: 'mens',
        }),
    };
});

describe('Category page tests', () => {
    test('It should render a spinner if isLoading is true', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    categories: [],
                },
            },
        });

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    test('It should render categories if isLoading is false', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categories: [{
                        title: 'mens',
                        items: [
                            { id: 1, name: 'Product 1' },
                            { id: 2, name: 'Product 2' },
                        ]
                    }],
                },
            },
        });

        expect(screen.queryByTestId('spinner')).toBeNull();
        expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
});
