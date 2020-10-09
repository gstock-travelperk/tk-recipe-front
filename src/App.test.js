import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("test renders TK Recipe App", async () => {
  render(<App />);
  const linkElement = screen.getByText(/TK Recipe App/i);
  expect(linkElement).toBeInTheDocument();
  userEvent.click(screen.getByRole("link"));
  expect(
    await screen.findByText(/This is the list of recipes/i)
  ).toBeInTheDocument();
});
