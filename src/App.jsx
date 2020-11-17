import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import PokemonDetails from "./app/pokemon/Details";
import PokemonList from "./app/pokemon/List";
import Settings from "./app/Settings";
import FourOhFour from "./app/FourOhFour";
import { setInitialSettingsThunk } from "./app/Settings/actions";

import "./App.css";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitialSettingsThunk());
  }, []);

  return (
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
};
