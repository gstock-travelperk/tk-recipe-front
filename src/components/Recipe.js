import React, { Suspense, useState } from "react";
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

const fetchRecipe = (recipeId, setError) => {
  return fetch(
    `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/${recipeId}/`
  )
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return null;
    })
    .catch((err) => setError(true));
};

function IngredientList(props) {
  const { ingredients } = props;
  return (
    <CircleList>
      {ingredients &&
        ingredients.map((ingredient) => (
          <CircleListItem key={ingredient.name}>
            {ingredient.name}
          </CircleListItem>
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
      {recipeData ? (
        <div>
          <Title>{recipeData.name}</Title>
          <p>{recipeData.description}</p>
          <h3>Ingredients</h3>
          <Container>
            <IngredientList ingredients={recipeData.ingredients} />
          </Container>
          <Container>
            <Link to="/recipes">
              <Button primary>Recipes</Button>
            </Link>
            <Link
              to={{
                pathname: `/recipes/${recipeData.id}/edit`,
                state: recipeData,
              }}
            >
              <Button>Edit</Button>
            </Link>
            <Button onClick={deleteRecipe}>Delete</Button>
          </Container>
        </div>
      ) : (
        <Title>Recipe not found</Title>
      )}
    </div>
  );
}

function Recipe(props) {
  let { recipeId } = useParams();
  const [error, setError] = useState(false);
  resourceCache(fetchRecipe).clear();
  const [recipeReader, getRecipe] = useAsyncResource(
    fetchRecipe,
    recipeId,
    setError
  );
  return (
    <div>
      {error ? (
        <Title>An error ocurred</Title>
      ) : (
        <Suspense fallback="Loading recipes...">
          <RecipeDetail recipeReader={recipeReader} />
        </Suspense>
      )}
    </div>
  );
}

export default Recipe;
export { IngredientList };
