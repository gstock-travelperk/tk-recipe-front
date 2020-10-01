import React from "react";
import { Suspense } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useAsyncResource, resourceCache } from "use-async-resource";
import {
  Title,
  Button,
  CircleList,
  CircleListItem,
  Container,
} from "./Styles.js";
import { postData } from "../data/data.js";

const fetchRecipe = (recipeId) => {
  return fetch(
    `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/${recipeId}`
  ).then((res) => res.json());
};

function IngredientList(props) {
  const { ingredients } = props;
  return (
    <CircleList>
      {ingredients.map((ingredient) => (
        <CircleListItem key={ingredient.name}>{ingredient.name}</CircleListItem>
      ))}
    </CircleList>
  );
}

function RecipeDetail({ recipeReader }) {
  const recipeData = recipeReader();
  const history = useHistory();

  const deleteRecipe = () => {
    let url = `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/${recipeData.id}/`;

    fetch(url, { method: "DELETE" }).then(() => history.push("/recipes/"));
  };

  return (
    <div>
      <Title>{recipeData.name}</Title>
      <h3>Ingredients</h3>
      <Container>
        <IngredientList ingredients={recipeData.ingredients} />
      </Container>
      <Container>
        <Link to="/recipes">
          <Button primary>Recipes</Button>
        </Link>
        <Link
          to={{ pathname: `/recipes/${recipeData.id}/edit`, state: recipeData }}
        >
          <Button>Edit</Button>
        </Link>
        <Button onClick={deleteRecipe}>Delete</Button>
      </Container>
    </div>
  );
}

function Recipe(props) {
  let { recipeId } = useParams();
  resourceCache(fetchRecipe).clear();
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
export { IngredientList };
