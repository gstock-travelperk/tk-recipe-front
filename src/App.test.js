import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("test renders TK Recipe App", () => {
  render(<App />);
  const linkElement = screen.getByText(/TK Recipe App/i);
  expect(linkElement).toBeInTheDocument();
});
