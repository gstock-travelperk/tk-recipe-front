import React, { useState, useEffect } from "react";
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

const fetchRecipes = () =>
  fetch(`${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/`).then(
    (res) => {
      if (res.status === 200) {
        return res.json();
      }
      return null;
    }
  );

function RecipeList({ recipes }) {
  let match = useRouteMatch();
  return (
    <div>
      {recipes ? (
        <List>
          {recipes.map((recipe) => (
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
  const [{ data, error, isLoading }, dispatch] = useState({
    data: null,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    dispatch((state) => ({ ...state, isLoading: true }));
    fetchRecipes()
      .then((data) => dispatch({ data, error: null, isLoading: false }))
      .catch((error) => dispatch({ data: null, error, isLoading: false }));
  }, []);

  return (
    <Container>
      {error ? (
        <Title>An error ocurred</Title>
      ) : (
        <div>
          <Title>This is the list of recipes</Title>
          {isLoading ? (
            <p>Loading recipes...</p>
          ) : (
            <RecipeList recipes={data} />
          )}
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
