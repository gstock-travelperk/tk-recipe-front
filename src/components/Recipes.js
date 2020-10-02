import React, { useState } from "react";
import { Suspense } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useAsyncResource, resourceCache } from "use-async-resource";
import {
  Title,
  Container,
  List,
  ListItem,
  Text,
  ItemTitle,
  Button,
} from "./Styles.js";

const fetchRecipes = (setError) =>
  fetch(`${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/`)
    .then((res) => {
      setError(false);
      if (res.status === 200) {
        return res.json();
      }
      return null;
    })
    .catch((err) => {
      setError(true);
    });

function RecipeList({ recipesReader }) {
  const recipesData = recipesReader();
  let match = useRouteMatch();
  return (
    <div>
      {recipesData ? (
        <List>
          {recipesData.map((recipe) => (
            <ListItem key={recipe.id}>
              <Link to={`${match.url}/${recipe.id}`}>
                <ItemTitle>{recipe.name}</ItemTitle>
              </Link>
              <Text>{recipe.description}</Text>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>There are no recipes</p>
      )}
    </div>
  );
}

function Recipes(props) {
  const [error, setError] = useState(false);
  resourceCache(fetchRecipes).clear();
  const [recipesReader, getRecipes] = useAsyncResource(fetchRecipes, setError);
  return (
    <Container>
      {error ? (
        <Title>An error ocurred</Title>
      ) : (
        <div>
          <Title>This is the list of recipes</Title>
          <Suspense fallback="Loading recipes...">
            <RecipeList recipesReader={recipesReader} />
          </Suspense>
          <Container>
            <Link to="/">
              <Button primary>Home</Button>
            </Link>
            <Link to="/recipes/create">
              <Button primary>Create</Button>
            </Link>
          </Container>
        </div>
      )}
    </Container>
  );
}

export default Recipes;
