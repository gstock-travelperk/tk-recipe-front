import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Title,
  Button,
  CircleList,
  CircleListItem,
  Container,
} from "./Styles.js";

var recipes = {
  2: {
    id: 2,
    name: "Onion soup",
    description: "An onion with a hole with soup",
    ingredients: [
      {
        name: "Onion",
      },
      {
        name: "Water",
      },
    ],
  },
  3: {
    id: 3,
    name: "Pizza salami",
    description: "A pizza full of salami",
    ingredients: [
      {
        name: "Cheese",
      },
      {
        name: "Salami",
      },
      {
        name: "Dough",
      },
    ],
  },
};

function RecipeDetail(props) {
  let { recipeId } = useParams();
  let recipe = recipes[recipeId];
  return (
    <div>
      <Title>{recipe.name}</Title>
      <h3>Ingredients</h3>
      <Container>
        <CircleList>
          {recipe.ingredients.map((ingredient) => (
            <CircleListItem>{ingredient.name}</CircleListItem>
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

export default RecipeDetail;
