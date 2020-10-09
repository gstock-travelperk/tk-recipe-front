import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Title,
  Button,
  CircleList,
  CircleListItem,
  Container,
} from "./Styles.js";
import api from "../data/DataAPI.js";

function IngredientList(props) {
  const { ingredients } = props;
  return (
    <CircleList>
      {ingredients?.map((ingredient) => (
        <CircleListItem key={ingredient.name}>{ingredient.name}</CircleListItem>
      ))}
    </CircleList>
  );
}

function Recipe(props) {
  const { recipeId } = useParams();

  const [{ recipe, error, isLoading }, dispatch] = useState({
    recipe: null,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    dispatch((state) => ({ ...state, isLoading: true }));
    api
      .fetchRecipe(recipeId)
      .then((recipe) => dispatch({ recipe, error: null, isLoading: false }))
      .catch((error) => dispatch({ recipe: null, error, isLoading: false }));
  }, [recipeId]);

  const history = useHistory();

  const deleteRecipe = () => {
    let url = `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/${recipe.id}/`;

    fetch(url, { method: "DELETE" }).then(() => history.push("/recipes/"));
  };

  if (error) return <Title>An error ocurred</Title>;
  else if (isLoading) return <p>Loading recipe...</p>;
  else if (!recipe) return <Title>Recipe not found</Title>;

  return (
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
  );
}

export default Recipe;
export { IngredientList };
