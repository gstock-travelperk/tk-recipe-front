import React from "react";
import { Link, useParams } from "react-router-dom";

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
      <h2>{recipe.name}</h2>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li>{ingredient.name}</li>
        ))}
      </ul>
      <Link to="/recipes">Recipe</Link>
    </div>
  );
}

export default RecipeDetail;
