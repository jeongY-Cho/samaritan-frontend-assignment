import React from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import PokemonDetails from "./app/pokemon/Details";
import PokemonList from "./app/pokemon/List";
import Settings from "./app/Settings";
import FourOhFour from "./app/FourOhFour";

import "./App.css";

export default () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={PokemonList} />
          <Route path="/pokemon/:name" component={PokemonDetails} />
          <Route path="/settings" component={Settings} />
          <Route path="/" component={FourOhFour} />
        </Switch>
        <SettingsLink />
      </BrowserRouter>
    </div>
  );
};

const SettingsLink = () => {
  const history = useHistory();

  return (
    <button
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        background: "rgba(0,0,0,0)",
        borderWidth: 0,
      }}
      onClick={(e) => {
        e.preventDefault();
        history.push("/settings");
      }}
    >
      <div data-icon="ei-gear" data-size="l" />
    </button>
  );
};
