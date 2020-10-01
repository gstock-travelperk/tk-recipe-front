import React from "react";
import { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { useAsyncResource } from "use-async-resource";
import {
  Title,
  Button,
  CircleList,
  CircleListItem,
  Container,
} from "./Styles.js";

const fetchRecipe = (recipeId) =>
  fetch(
    `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/${recipeId}`
  ).then((res) => res.json());

function RecipeDetail({ recipeReader }) {
  const recipeData = recipeReader();
  return (
    <div>
      <Title>{recipeData.name}</Title>
      <h3>Ingredients</h3>
      <Container>
        <CircleList>
          {recipeData.ingredients.map((ingredient) => (
            <CircleListItem key={ingredient.name}>
              {ingredient.name}
            </CircleListItem>
          ))}
        </CircleList>
      </Container>
      <Container>
        <Link to="/recipes">
          <Button primary>Recipes</Button>
        </Link>
      </Container>
    </div>
  );
}

function Recipe(props) {
  let { recipeId } = useParams();
  const [recipeReader, getRecipe] = useAsyncResource(fetchRecipe, recipeId);
  return (
    <div>
      <Suspense fallback="Loading recipes...">
        <RecipeDetail recipeReader={recipeReader} />
      </Suspense>
    </div>
  );
}

export default Recipe;
