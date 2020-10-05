import React, { useState, useEffect } from "react";
import { IngredientList } from "./Recipe.js";
import { Title, Container, Button, TextInput } from "./Styles.js";
import { useHistory, useParams } from "react-router";
import { postData, fetchRecipe } from "../data/DataAPI.js";

function RecipeForm(props) {
  const edit = props.mode === "edit";
  const history = useHistory();
  let { recipeId } = useParams();
  // const [error, setError] = useState(false);
  // const [recipe, setRecipe] = useFetchRecipe(recipeId, edit, setError);

  let recipe = {
    name: "",
    description: "",
    ingredients: [],
  };

  const [{ data, error, isLoading }, dispatch] = useState({
    data: recipe,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    //Couldn't find a good way to handle this
    if (!edit) {
      return;
    }
    dispatch((state) => ({ ...state, isLoading: true }));
    fetchRecipe(recipeId)
      .then((data) => dispatch({ data, error: null, isLoading: false }))
      .catch((error) => dispatch({ data: null, error, isLoading: false }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      const value = e.target.value;
      dispatch((prevState) => ({
        ...prevState,
        data: {
          ...prevState.data,
          ingredients: prevState.data.ingredients.concat({ name: value }),
        },
      }));
      e.target.value = "";
    }
  };

  const submit = () => {
    let url = edit
      ? `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/${data.id}/`
      : `${process.env.REACT_APP_API_BASEURL}/api/recipe/recipes/`;

    postData(url, edit ? "PUT" : "POST", data).then((data) => {
      history.push(`/recipes/${data.id}/`);
    });
  };

  if (error) {
    return <Title>An error ocurred</Title>;
  } else if (!data) {
    return <Title>Recipe not found</Title>;
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading recipe...</p>
      ) : (
        <Container>
          <Title>{edit ? "Edit" : "New"} Recipe</Title>
          <div>
            <TextInput
              type="text"
              value={data.name}
              onChange={handleChange}
              name="name"
              placeholder="Name"
            />
            <TextInput
              type="text"
              value={data.description}
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
              <IngredientList ingredients={data.ingredients} />
            </Container>
            <Container>
              <Button onClick={submit} primary>
                {edit ? "Edit" : "Create"}
              </Button>
            </Container>
          </div>
        </Container>
      )}
    </div>
  );
}

export default RecipeForm;
