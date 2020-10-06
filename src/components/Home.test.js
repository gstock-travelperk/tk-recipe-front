import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Home from "./Home.js";
import App from "../App.js";
import { BrowserRouter as Router } from "react-router-dom";

test("loads the home page", async () => {
  const { getByText } = render(
    <Router>
      <Home />
    </Router>
  );
  const titleElement = getByText(/TK Recipe App/i);
  expect(titleElement).toBeInTheDocument();
});

test("access recipies", async () => {
  render(<App />);
  const leftClick = { button: 0 };
  userEvent.click(screen.getByRole("link"), leftClick);
  expect(
    await screen.findByText(/This is the list of recipes/i)
  ).toBeInTheDocument();
});
