import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test } from "vitest";
import App from "../App";

beforeEach(() => {
  render(<App />);
});

describe("App", () => {
  test("renders headline", () => {
    const headline = screen.getByText(/this is a test file/i); // i = case insensitive
    expect(headline).toBeInTheDocument();
  });

  test("button event", async () => {
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
});
