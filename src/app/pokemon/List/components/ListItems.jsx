import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import promiseRetry from "promise-retry";

import ListItem from "./Item";

import "./ListItems.css";

export default () => {
  const filterValue = useSelector((state) => state.filter);
  const pokemons = useSelector((state) => state.pokemon);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!Object.keys(pokemons).length) dispatch(pokemonListThunk());
  }, [pokemons]);

  return (
    <div className="pokemon-list">
      {Object.values(pokemons)
        .filter((a) => {
          return RegExp(filterValue, "i").test(a.name);
        })
        .map((pokemon, i) => (
          <ListItem key={pokemon.name} i={i} name={pokemon.name} />
        ))}
    </div>
  );
};

// TODO: move fetch stuff somewhere else
function fetchPokemonList(page = 0) {
  return promiseRetry(async (retry) => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}`
    );

    if (!res.ok) retry();

    return (await res.json()).results;
  });
}

function fetchPokemonDetails(name) {
  return promiseRetry(async (retry) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!res.ok) retry();

    return res.json();
  });
}

export function pokemonListReducer(state = {}, action) {
  switch (action.type) {
    case "list::insertItems":
      return {
        ...state,
        ...action.pokemon.reduce((acc, cur) => {
          acc[cur.name] = {
            status: "idle",
            error: null,
            name: cur.name,
            url: cur.url,
            details: {},
          };
          return acc;
        }, {}),
      };
    case "list::fetchDetails": {
      const pokemon = {
        ...state[action.name],
        status: "loading",
      };

      return {
        ...state,
        [action.name]: pokemon,
      };
    }
    case "list::fetchedDetails": {
      const pokemon = {
        ...state[action.name],
        status: "success",
        details: action.details,
      };

      return {
        ...state,
        [action.name]: pokemon,
      };
    }
    default:
      return state;
  }
}

function pokemonListInsertAction(results) {
  return {
    type: "list::insertItems",
    pokemon: results,
  };
}

function fetchingPokemonDetailsAction(name) {
  return {
    type: "list::fetchDetails",
    name,
  };
}
function fetchedPokemonDetailsAction(name, details) {
  return {
    type: "list::fetchedDetails",
    name,
    details,
  };
}

function pokemonListThunk() {
  return async (dispatch, getState) => {
    const list = await fetchPokemonList();
    console.log(list);
    dispatch(pokemonListInsertAction(list));
    const { pokemon } = getState();

    // eslint-disable-next-line no-restricted-syntax
    for (const each of Object.values(pokemon)) {
      if (each.status !== "success") {
        dispatch(fetchingPokemonDetailsAction(each.name));
        fetchPokemonDetails(each.name).then((details) => {
          dispatch(fetchedPokemonDetailsAction(each.name, details));
        });
      }
    }
  };
}
