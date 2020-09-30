import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home.js";
import RecipeList from "./components/RecipeList.js";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={`/recipes/:recipeId`}>
            <RecipeDetail />
          </Route>
          <Route path="/recipes">
            <RecipeList />
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
