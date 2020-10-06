import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RecipeForm from "./RecipeForm.js";
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
    <MemoryRouter initialEntries={["/recipes/1/edit"]}>
      <Route path="/recipes/:recipeId/edit">
        <RecipeForm mode="edit" />
      </Route>
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.getByText("Loading recipe..."));

  expect(screen.getByTestId("page_title")).toHaveTextContent("Edit Recipe");
  expect(screen.getByTestId("recipe_name")).toHaveValue("Empanadas");
  expect(screen.getByTestId("recipe_description")).toHaveValue(
    "Carne envuelta en masa"
  );
});
