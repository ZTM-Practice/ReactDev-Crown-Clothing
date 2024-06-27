import { screen, fireEvent } from "@testing-library/react";
import * as reactRedux from "react-redux";

import Navigation from "../navigation";
import { renderWithProviders } from "../../../utils/test-utils/test.utils";
import { describe, expect, test, vi } from "vitest";
import { signOutStart } from "../../../store/user/user.action";

// Mock the import:
vi.mock("react-redux", async (getModule) => {
    const original = await getModule()
  
    return {
      ...original,
      useDispatch: vi.fn().mockImplementation(original.useDispatch),
    }
});

describe('Navigation tests', () => {
    test('It should render a Sign In and not a Sign Out if there is no currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: null,
                },
            },
            needRouter: true,
        });

        const signInLinkElement = screen.getByText(/sign in/i);
        expect(signInLinkElement).toBeInTheDocument();

        const signOutLinkElement = screen.queryByText(/sign out/i);
        expect(signOutLinkElement).toBeNull();
    });

    test('It should render a Sign Out and not a Sign In if there is a currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {},
                },
            },
            needRouter: true,
        });

        const signInLinkElement = screen.queryByText(/sign in/i);
        expect(signInLinkElement).toBeNull();

        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();
    });

    test('It should render the Cart Dropdown Menu when showCartMenu is true', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    showCartMenu: true,
                    cartItems: [],
                },
            },
            needRouter: true,
        });

        const cartDropDownMenuElement = screen.getByText(/go to checkout/i);
        expect(cartDropDownMenuElement).toBeInTheDocument();
    });

    test('It should not render the Cart Dropdown Menu when showCartMenu is false', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    showCartMenu: false,
                    cartItems: [],
                },
            },
            needRouter: true,
        });

        const cartDropDownMenuElement = screen.queryByText(/go to checkout/i);
        expect(cartDropDownMenuElement).toBeNull();
    });

    test('It should dispatch signOutStart action when clicking on the Sign Out link', async () => {
        const mockDispatch = vi.fn();
        vi.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);

        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {},
                },
            },
            needRouter: true,
        });

        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();

        await fireEvent.click(signOutLinkElement);
        expect(mockDispatch).toHaveBeenCalled();

        expect(mockDispatch).toHaveBeenCalledWith(signOutStart());
        mockDispatch.mockClear();
    })
});
