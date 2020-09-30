import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

var recipes = [
  {
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
  {
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
];

function RecipeList(props) {
  let match = useRouteMatch();
  return (
    <div>
      <h2>This is the list of recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li>
            <Link to={`${match.url}/${recipe.id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/">Home</Link>
    </div>
  );
}

export default RecipeList;
