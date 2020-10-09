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
import api from "../data/DataAPI.js";

function RecipeList({ recipes }) {
  let match = useRouteMatch();
  return (
    <div>
      {recipes ? (
        <List>
          {recipes.map((recipe) => (
            <ListItem key={recipe.id}>
              <Link
                to={`${match.url}/${recipe.id}`}
                data-testid={`recipe_link_${recipe.id}`}
              >
                <ItemTitle data-testid={`recipe_title_${recipe.id}`}>
                  {recipe.name}
                </ItemTitle>
              </Link>
              <Text data-testid={`recipe_description_${recipe.id}`}>
                {recipe.description}
              </Text>
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
    api
      .fetchRecipes()
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
