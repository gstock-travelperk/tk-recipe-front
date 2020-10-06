import React from "react";
import { Link } from "react-router-dom";
import { Title } from "./Styles.js";
import { Button } from "./Styles.js";

function Home(props) {
  return (
    <div>
      <Title>TK Recipe App</Title>
      <p>The best recipes by the best TK chefs are listed here</p>
      <Link role="link" to="/recipes">
        <Button primary>Recipes</Button>
      </Link>
    </div>
  );
}

export default Home;
