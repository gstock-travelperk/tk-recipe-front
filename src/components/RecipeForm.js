import React, { useState, useEffect } from "react";
import { IngredientList } from "./Recipe.js";
import { Title, Container, Button, TextInput } from "./Styles.js";
import { useHistory, useParams } from "react-router";
import { postData } from "../data/DataAPI.js";

function useFetchRecipe(recipeId, edit, setError) {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
  });

  useEffect(() => {
    //Couldn't find a good way to handle this
    if (!edit) {
      return;
    }

    fetch(
      `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/${recipeId}/`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return null;
      })
      .then((data) => setRecipe(data))
      .catch((err) => setError(true));
  }, []);

  return [recipe, setRecipe];
}

function RecipeForm(props) {
  const edit = props.mode === "edit";
  const history = useHistory();
  let { recipeId } = useParams();
  const [error, setError] = useState(false);
  const [recipe, setRecipe] = useFetchRecipe(recipeId, edit, setError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      const value = e.target.value;
      setRecipe((prevState) => ({
        ...prevState,
        ingredients: prevState.ingredients.concat({ name: value }),
      }));
      e.target.value = "";
    }
  };

  const submit = () => {
    let url = edit
      ? `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/${recipe.id}/`
      : `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/`;

    postData(url, edit ? "PUT" : "POST", recipe).then((data) => {
      history.push(`/recipes/${data.id}/`);
    });
  };

  let msg = "";
  if (error) {
    msg = "An error ocurred";
  } else if (!recipe) {
    msg = "Recipe not found";
  }

  return (
    <div>
      {error || !recipe ? (
        <Title>{msg}</Title>
      ) : (
        <Container>
          <Title>{edit ? "Edit" : "New"} Recipe</Title>
          {recipe && (
            <div>
              <TextInput
                type="text"
                value={recipe.name}
                onChange={handleChange}
                name="name"
                placeholder="Name"
              />
              <TextInput
                type="text"
                value={recipe.description}
                onChange={handleChange}
                name="description"
                placeholder="Description"
              />
              <TextInput
                type="text"
                name="ingredient"
                placeholder="Ingredient"
                onKeyDown={keyPress}
              />
              <Container>
                <IngredientList ingredients={recipe.ingredients} />
              </Container>
              <Container>
                <Button onClick={submit} primary>
                  {edit ? "Edit" : "Create"}
                </Button>
              </Container>
            </div>
          )}
        </Container>
      )}
    </div>
  );
}

export default RecipeForm;
