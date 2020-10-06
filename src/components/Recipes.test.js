import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Recipes from "./Recipes.js";
import { BrowserRouter as Router } from "react-router-dom";

const recipesResponse = [
  {
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
  },
  {
    id: 2,
    name: "Chicken pegasus",
    description: "Chicken with a bit of spices",
    ingredients: [
      {
        name: "Chicken",
      },
      {
        name: "Curcuma",
      },
      {
        name: "Pepper",
      },
    ],
  },
];

const server = setupServer(
  rest.get("http://localhost:8000/api/recipe/recipes/", (req, res, ctx) => {
    return res(ctx.json(recipesResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays the recipies list", async () => {
  render(
    <Router>
      <Recipes />
    </Router>
  );

  await waitForElementToBeRemoved(() => screen.getByText("Loading recipes..."));

  expect(screen.getByTestId("recipe_title_1")).toHaveTextContent("Empanadas");
  expect(screen.getByTestId("recipe_description_1")).toHaveTextContent(
    "Carne envuelta en masa"
  );
});
