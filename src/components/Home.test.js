import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";

import Home from "./Home.js";

test("loads the home page", async () => {
  const { getByText } = render(
    <Router>
      <Home />
    </Router>
  );
  const titleElement = getByText(/TK Recipe App/i);
  expect(titleElement).toBeInTheDocument();
});
