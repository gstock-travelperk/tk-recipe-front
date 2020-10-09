import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import RecipeForm from "./RecipeForm.js";
import { Route, MemoryRouter } from "react-router-dom";
import api from "../data/DataAPI.js";

beforeEach(() => jest.clearAllMocks());

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

test("edit a recipe", async () => {
  const mockPostData = jest.spyOn(api, "postData");
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

  await userEvent.type(screen.getByTestId("recipe_ingredient"), "Cheese");
  expect(screen.getByTestId("recipe_ingredient")).toHaveValue("Cheese");
  fireEvent.keyDown(screen.getByTestId("recipe_ingredient"), {
    key: "Enter",
    keyCode: 13,
  });

  fireEvent.click(screen.getByTestId("submit_button"));

  expect(mockPostData).toHaveBeenCalledTimes(1);
  expect(mockPostData).toHaveBeenCalledWith(
    "http://localhost:8000/api/recipe/recipes/1/",
    "PUT",
    {
      description: "Carne envuelta en masa",
      id: 1,
      ingredients: [{ name: "Carne" }, { name: "Masa" }, { name: "Cheese" }],
      name: "Empanadas",
    }
  );
});

test("create a recipe", async () => {
  const mockPostData = jest.spyOn(api, "postData");
  render(
    <MemoryRouter initialEntries={["/recipes/create"]}>
      <Route path="/recipes/create">
        <RecipeForm />
      </Route>
    </MemoryRouter>
  );

  // fill out the form
  fireEvent.change(screen.getByTestId("recipe_name"), {
    target: { value: "Cheesecake" },
  });
  fireEvent.change(screen.getByTestId("recipe_description"), {
    target: { value: "A cake full of cheese and sweets" },
  });
  await userEvent.type(screen.getByTestId("recipe_ingredient"), "Cheese");
  expect(screen.getByTestId("recipe_ingredient")).toHaveValue("Cheese");
  fireEvent.keyDown(screen.getByTestId("recipe_ingredient"), {
    key: "Enter",
    keyCode: 13,
  });

  fireEvent.click(screen.getByText(/Create/i));

  expect(mockPostData).toHaveBeenCalledTimes(1);
  expect(mockPostData).toHaveBeenCalledWith(
    "http://localhost:8000/api/recipe/recipes/",
    "POST",
    {
      description: "A cake full of cheese and sweets",
      ingredients: [{ name: "Cheese" }],
      name: "Cheesecake",
    }
  );
});
