import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <h2>TK Recipe App</h2>
      <p>The best recipes by the best TK chefs are listed here</p>
      <Link to="/recipes">Recipes</Link>
    </div>
  );
}

export default Home;
