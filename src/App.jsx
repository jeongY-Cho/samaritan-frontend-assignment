import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PokemonDetails from "./app/pokemon/Details";
import PokemonList from "./app/pokemon/List";
import Settings from "./app/Settings";
import FourOhFour from "./app/FourOhFour";

import "./App.css";

export default () => (
  <div className="app">
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PokemonList} />
        <Route path="/pokemon/:name" component={PokemonDetails} />
        <Route path="/settings" component={Settings} />
        <Route path="/" component={FourOhFour} />
      </Switch>
    </BrowserRouter>
  </div>
);
