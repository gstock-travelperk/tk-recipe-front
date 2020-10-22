import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Recipe from "./Recipe.js";
import { Route, MemoryRouter } from "react-router-dom";
import api from "../data/DataAPI.js";

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

const mockFetchRecipe = jest.spyOn(api, "fetchRecipe");
mockFetchRecipe.mockReturnValue(Promise.resolve(recipeResponse));

test("loads and displays a recipe", async () => {
  render(
    <MemoryRouter initialEntries={["/recipes/1"]}>
      <Route path="/recipes/:recipeId">
        <Recipe />
      </Route>
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.getByText("Loading recipe..."));

  expect(mockFetchRecipe).toHaveBeenCalledWith("1")
  expect(screen.getByText("Empanadas")).toBeInTheDocument();
  expect(screen.getByText("Carne envuelta en masa")).toBeInTheDocument();
});
