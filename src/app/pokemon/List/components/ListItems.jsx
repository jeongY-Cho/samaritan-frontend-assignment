import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import promiseRetry from "promise-retry";

import { writeToCache, fetchFromCache } from "../../../../cache";

import ListItem from "./Item";

import "./ListItems.css";

export default () => {
  const filterValue = useSelector((state) => state.filter);
  const pokemons = useSelector((state) => state.pokemon);
  const filterDeeply = useSelector((state) => state.settings.deepFilter);
  const paginate = useSelector((state) => state.settings.paginate);
  const page = useRef(0);

  const dispatch = useDispatch();

  const loadMore = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-plusplus
    dispatch(pokemonListThunk(++page.current));
  };

  useEffect(() => {
    dispatch(pokemonListThunk());
  }, []);

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list">
        {Object.values(pokemons)
          .filter((a) => {
            return typeof a !== "string" && a.details;
          })
          .filter((a) => {
            const testAgainst = filterDeeply ? JSON.stringify(a) : a.name;
            return RegExp(filterValue, "i").test(testAgainst);
          })
          .sort((a, b) => {
            return a.details.id - b.details.id;
          })
          .map((pokemon) => {
            return <ListItem key={pokemon.name} name={pokemon.name} />;
          })}
      </div>
      {paginate && (
        <button className="load-more-button" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

// TODO: move fetch stuff somewhere else
function fetchPokemonList(page = 0, paginate = true) {
  return promiseRetry(async (retry) => {
    const offset = paginate ? page * 20 : 0;
    const limit = paginate ? 20 : 151;
    console.log(paginate, offset);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );

    if (!res.ok) retry();

    return (await res.json()).results;
  });
}

// fetchPokemonDetails fetches details for each pokemon
// first checks indexed db for cached details.
// if cache miss, fetches then caches and returns fetched details
function fetchPokemonDetails(name, useCache = true) {
  return promiseRetry(async (retry) => {
    // if indexedDB is enabled use it
    if (useCache) {
      // check cache first
      const cachedRes = await fetchFromCache(name);

      // return cached object on cache hit
      if (cachedRes) return cachedRes;
      // don't need to check with api since we can safely assume, in this specific context,
      // details won't change.
      // For some production app, embed a timestamp into cached object and fetch if its older than some
      // threshold.
    }

    // fetch from api on cache miss
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    // retry on some error
    if (!res.ok) retry();

    const details = await res.json();

    // if indexedDB is enabled use it
    if (useCache) {
      // cache newly fetched data
      writeToCache(details);
      // set and forget. doesn't matter that cache is not bulletproof
    }

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
          };
          return acc;
        }, {}),
      };
    case "list::fetchDetails": {
      const pokemon = {
        ...state[action.name],
        status: "loading",
        name: action.name,
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
        name: action.details.name,
        details: action.details,
      };
      const retState = {
        ...state,
        [action.details.name]: pokemon,
      };
      if (action.name !== action.details.name) {
        retState[action.name] = `$$${action.details.name}`;
      }
      return retState;
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

function pokemonListThunk(page = 0) {
  return async (dispatch, getState) => {
    const {
      settings: { paginate },
    } = getState();
    console.log(getState());
    const list = await fetchPokemonList(page, paginate);
    dispatch(pokemonListInsertAction(list));
    const {
      pokemon,
      settings: { useIndexedDB },
    } = getState();

    // eslint-disable-next-line no-restricted-syntax
    for (const each of Object.values(pokemon)) {
      if (each.status !== "success") {
        dispatch(pokemonDetailsThunk(each.name, useIndexedDB));
      }
    }
  };
}

export function pokemonDetailsThunk(name, useCache = true) {
  return async (dispatch) => {
    dispatch(fetchingPokemonDetailsAction(name));
    fetchPokemonDetails(name, useCache).then((details) => {
      dispatch(fetchedPokemonDetailsAction(name, details));
    });
  };
}
