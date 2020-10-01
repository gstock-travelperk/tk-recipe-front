import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Recipes from "./components/Recipes.js";
import Recipe from "./components/Recipe.js";
import RecipeForm from "./components/RecipeForm.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route path="/recipes/create">
            <RecipeForm />
          </Route> */}
          <Route path={`/recipes/:recipeId`}>
            <Recipe />
          </Route>
          <Route path="/recipes">
            <Recipes />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
