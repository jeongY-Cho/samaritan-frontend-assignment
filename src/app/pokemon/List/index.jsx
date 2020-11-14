import React from "react";

import ListItem from "./components/ListItem";

import "./index.css";

// main landing page, directly to list of pokemon.
export default () => (
  <div className="list-container">
    {/* TODO: extract into own component */}
    <div className="filter">
      <input type="text" placeholder="Search" />
    </div>
    {/* TODO: extract into own component */}
    <div className="pokemon-list">
      {/* Temporary hard coded list */}
      {Array(20)
        .fill(1)
        .map((_, i) => (
          <ListItem key={i} id={1} name="bulbasaur" />
        ))}
    </div>
  </div>
);
