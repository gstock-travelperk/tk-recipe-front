import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("test renders TK Recipe App", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/TK Recipe App/i);
  expect(linkElement).toBeInTheDocument();
});
