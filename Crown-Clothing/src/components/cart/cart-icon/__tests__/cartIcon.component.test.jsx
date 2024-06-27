import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { renderWithProviders } from "../../../../utils/test-utils/test.utils";
import CartIcon from "../cart-icon.component";

describe('Cart Icon tests', () => {
    test('uses preloaded state to render', () => {
        const initialCartItems = [
            {
                id: 1,
                name: 'ItemA',
                imageUrl: 'test',
                price: 25,
                quantity: 3,
            },
        ];
        
        renderWithProviders(<CartIcon />, {
            preloadedState: {
                cart: {
                    cartItems: initialCartItems,
                },
            },
            needRouter: true,
        });

        const cartIconElement = screen.getByText(3);
        expect(cartIconElement).toBeInTheDocument();
    });
});
