import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Recipe from "./Recipe.js";
import { Route, MemoryRouter } from "react-router-dom";

const recipeResponse = {
  id: 1,
  name: "Empanadas",
  description: "Carne envuelta en masa",
  ingredients: [
    {
      name: "Carne",
    },
    {
      name: "Masa",
    },
  ],
};

const server = setupServer(
  rest.get("http://localhost:8000/api/recipe/recipes/1", (req, res, ctx) => {
    return res(ctx.json(recipeResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays a recipe", async () => {
  render(
    <MemoryRouter initialEntries={["/recipes/1"]}>
      <Route path="/recipes/:recipeId">
        <Recipe />
      </Route>
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.getByText("Loading recipe..."));

  expect(screen.getByText("Empanadas")).toBeInTheDocument();
  expect(screen.getByText("Carne envuelta en masa")).toBeInTheDocument();
});
