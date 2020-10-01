import React from "react";
import { Title, Container, Button } from "./Styles.js";

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

function RecipeForm(props) {
  return (
    <Container>
      <Title>New Recipe</Title>
      <form onSubmit={() => alert("Form!")}>
        <label>
          Name:
          <input type="text" value="A" />
        </label>
        <label>
          Description:
          <input type="text" value="A" />
        </label>
        <Button type="submit" primary>
          Create
        </Button>
      </form>
    </Container>
  );
}

export default RecipeForm;
