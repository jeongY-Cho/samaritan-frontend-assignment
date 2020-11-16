import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { pokemonDetailsThunk } from "../List/components/ListItems";

export default () => {
  const match = useRouteMatch();
  const pokemon = useSelector((state) => state.pokemon[match.params.name]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pokemonDetailsThunk(match.params.name));
  }, [match]);

  return (
    <div>
      <div>Details</div>
      <div>{match.params.name}</div>
      <div>
        <pre>{JSON.stringify(pokemon, undefined, 2)}</pre>
      </div>
    </div>
  );
};
