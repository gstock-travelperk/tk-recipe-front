import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {
  Title,
  Container,
  List,
  ListItem,
  Text,
  ItemTitle,
  Button,
} from "./Styles.js";

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
    <Container>
      <Title>This is the list of recipes</Title>
      <List>
        {recipes.map((recipe) => (
          <ListItem>
            <Link to={`${match.url}/${recipe.id}`}>
              <ItemTitle>{recipe.name}</ItemTitle>
            </Link>
            <Text>{recipe.description}</Text>
          </ListItem>
        ))}
      </List>
      <Link to="/">
        <Button primary>Home</Button>
      </Link>
    </Container>
  );
}

export default RecipeList;
