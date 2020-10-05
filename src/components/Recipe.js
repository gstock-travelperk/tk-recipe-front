import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Title,
  Button,
  CircleList,
  CircleListItem,
  Container,
} from "./Styles.js";
import { fetchRecipe } from "../data/DataAPI.js";

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

function RecipeDetail({ recipe }) {
  const history = useHistory();

  const deleteRecipe = () => {
    let url = `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/${recipe.id}/`;

    fetch(url, { method: "DELETE" }).then(() => history.push("/recipes/"));
  };

  return (
    <div>
      {recipe ? (
        <div>
          <Title>{recipe.name}</Title>
          <p>{recipe.description}</p>
          <h3>Ingredients</h3>
          <Container>
            <IngredientList ingredients={recipe.ingredients} />
          </Container>
          <Container>
            <Link to="/recipes">
              <Button primary>Recipes</Button>
            </Link>
            <Link
              to={{
                pathname: `/recipes/${recipe.id}/edit`,
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
  const { recipeId } = useParams();

  const [{ data, error, isLoading }, dispatch] = useState({
    data: null,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    dispatch((state) => ({ ...state, isLoading: true }));
    fetchRecipe(recipeId)
      .then((data) => dispatch({ data, error: null, isLoading: false }))
      .catch((error) => dispatch({ data: null, error, isLoading: false }));
  }, [recipeId]);

  if (error) return <Title>An error ocurred</Title>;

  return (
    <div>
      {isLoading ? <p>Loading recipe...</p> : <RecipeDetail recipe={data} />}
    </div>
  );
}

export default Recipe;
export { IngredientList };
