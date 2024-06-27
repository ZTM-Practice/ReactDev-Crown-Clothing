import { render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "../button.component";
import { describe, expect, test } from "vitest";

describe('button tests', () => {
    test('should render base button when nothing is passed', () => {
        render(<Button>Test</Button>);

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass(/buttonContainer/);
    });

    test('should render google button when google button type is passed', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.google}>Test</Button>);

        const googleButtonElement = screen.getByRole('button');
        expect(googleButtonElement).toHaveClass(/googleSignIn/);
    });

    test('should render inverted button when inverted button type is passed', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Test</Button>);

        const invertedButtonElement = screen.getByRole('button');
        expect(invertedButtonElement).toHaveClass(/inverted/);
    });

    test('should be disabled if isLoading is true', () => {
        render(<Button isLoading={true}>Test</Button>);

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();
    });
});
