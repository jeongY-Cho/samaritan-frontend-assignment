import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import promiseRetry from "promise-retry";

import { writeToCache, fetchFromCache } from "../../../../cache";

import ListItem from "./Item";

import "./ListItems.css";

export default () => {
  const filterValue = useSelector((state) => state.filter);
  const pokemons = useSelector((state) => state.pokemon);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pokemonListThunk());
  }, []);

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

// fetchPokemonDetails fetches details for each pokemon
// first checks indexed db for cached details.
// if cache miss, fetches then caches and returns fetched details
function fetchPokemonDetails(name) {
  return promiseRetry(async (retry) => {
    // check cache first
    const cachedRes = await fetchFromCache(name);

    // return cached object on cache hit
    if (cachedRes) return cachedRes;
    // don't need to check with api since we can safely assume, in this specific context,
    // details won't change.
    // For some production app, embed a timestamp into cached object and fetch if its older than some
    // threshold.

    // fetch from api on cache miss
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    // retry on some error
    if (!res.ok) retry();

    const details = await res.json();

    // cache newly fetched data
    writeToCache(details);
    // set and forget. doesn't matter that cache is not bulletproof

    return details;
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
