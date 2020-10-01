import React from "react";
import { Suspense } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useAsyncResource } from "use-async-resource";
import {
  Title,
  Container,
  List,
  ListItem,
  Text,
  ItemTitle,
  Button,
} from "./Styles.js";

const fetchRecipes = () =>
  fetch(
    `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/`
  ).then((res) => res.json());

function RecipeList({ recipesReader }) {
  const recipesData = recipesReader();
  let match = useRouteMatch();
  return (
    <List>
      {recipesData &&
        recipesData.map((recipe) => (
          <ListItem key={recipe.id}>
            <Link to={`${match.url}/${recipe.id}`}>
              <ItemTitle>{recipe.name}</ItemTitle>
            </Link>
            <Text>{recipe.description}</Text>
          </ListItem>
        ))}
    </List>
  );
}

function Recipes(props) {
  const [recipesReader, getRecipes] = useAsyncResource(fetchRecipes, []);
  return (
    <Container>
      <Title>This is the list of recipes</Title>
      <Suspense fallback="Loading recipes...">
        <RecipeList recipesReader={recipesReader} />
      </Suspense>
      <Link to="/">
        <Button primary>Home</Button>
      </Link>
    </Container>
  );
}

export default Recipes;
