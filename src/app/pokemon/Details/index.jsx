import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";

import { pokemonDetailsThunk } from "../List/components/ListItems";
import DetailsOverview from "./components/DetailsOverview";

import titleCase from "../../../utils/titleCase";
import resolveName from "../../../utils/resolveName";

import "./index.css";

export default () => {
  const match = useRouteMatch();
  const history = useHistory();
  const resolvedName = resolveName(match.params.name);
  const pokemon = useSelector((state) => state.pokemon[resolvedName]);
  const dispatch = useDispatch();

  // effect to resolve number id links.
  useEffect(() => {
    // fetch the pokemon details if there is nothing for the name param
    if (!pokemon) {
      dispatch(pokemonDetailsThunk(resolvedName));
      return () => {};
    }

    // no-op if loading
    if (pokemon.status === "loading") return () => {};
    // if loading success set new title
    if (pokemon.status === "success") {
      document.title = `${titleCase(resolvedName)} | Samaritan Pokedex`;
      // reset title on unmount
      return () => {
        document.title = `Samaritan Pokedex`;
      };
    }

    // if the pokemon is a reference then take the ref
    if (pokemon.match("$$")) {
      history.replace(`/pokemon/${pokemon.slice(2)}`);
    }
    return () => {};
  }, [pokemon]);
  // this effect should fire every time the pokemon object changes

  // effect should fire when resolvedName doesn't match the param
  useEffect(() => {
    if (match.params.name !== resolvedName) {
      history.replace(`/pokemon/${resolvedName}`);
    }
  }, [match]);

  // callback for the next pokemon
  const nextPokemon = () => {
    // increment the id to go next
    history.push(`/pokemon/${pokemon.details.id + 1}`);
    // use id instead of name because easier
    // would need to have the list of pokemon already loaded
  };
  // callback for the previous pokemon
  const previousPokemon = () => {
    // increment id to go before
    history.push(`/pokemon/${pokemon.details.id - 1}`);
  };

  // if loading then show loading
  if (!pokemon || pokemon.status !== "success") {
    return <div>Loading</div>;
  }

  const { details } = pokemon;

  return (
    <div className="details-container">
      <div className="details-jumbotron">
        {/* hide previous button if current pokemon id == 1 */}
        {details.id === 1 ? (
          // show a same sized but transparent div for consistent spacing
          <div style={{ height: 160, width: 160 }} />
        ) : (
          <div
            className="nav-triangle"
            data-direction="Previous"
            onClick={previousPokemon}
            role="button"
            onKeyPress={previousPokemon}
            tabIndex={0}
          >
            <div
              style={{
                transform: "rotate(30deg) scale(0.2)",
                cursor: "pointer",
              }}
            >
              <div className="triangle" />
            </div>
          </div>
        )}
        <DetailsOverview details={details} />
        <div
          className="nav-triangle"
          data-direction="Next"
          onClick={nextPokemon}
          onKeyPress={nextPokemon}
          tabIndex={0}
          role="button"
        >
          <div
            style={{
              transform: "rotate(-30deg) scale(0.2)",
              cursor: "pointer",
            }}
          >
            <div className="triangle" />
          </div>
        </div>
      </div>
      <div className="MA-list">
        <div>
          <div>
            <h2>Moves</h2>
          </div>
          <div style={{ height: 300, overflow: "auto" }}>
            <ul>
              {details.moves.map((move) => (
                <li key={move.move.name}>
                  {titleCase(move.move.name.replace("-", " "))}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div>
            <h2>Abilities</h2>
          </div>
          <div>
            <ul>
              {details.abilities.map((ability) => (
                <li key={ability.ability.name}>
                  {titleCase(ability.ability.name.replace("-", " "))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
