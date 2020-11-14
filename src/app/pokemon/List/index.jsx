import React from "react";

import "./index.css";
import ListItems from "./components/ListItems";
import ListFilter from "./components/ListFilter";

// main landing page, directly to list of pokemon.
export default () => (
  <div className="list-container">
    <ListFilter />
    <ListItems />
  </div>
);
