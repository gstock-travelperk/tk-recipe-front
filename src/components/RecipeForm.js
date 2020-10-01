import React, { useState, useEffect } from "react";
import { IngredientList } from "./Recipe.js";
import { Title, Container, Button, TextInput } from "./Styles.js";
import { useHistory, useParams } from "react-router";
import { postData } from "../data/data.js";

function useFetchRecipe(recipeId, edit) {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
  });

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/${recipeId}/`
    )
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [recipeId]);

  return [recipe, setRecipe];
}

function RecipeForm(props) {
  const edit = props.mode === "edit";
  const history = useHistory();
  let { recipeId } = useParams();

  const [recipe, setRecipe] = useFetchRecipe(recipeId, edit);

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

  return (
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
  );
}

export default RecipeForm;
