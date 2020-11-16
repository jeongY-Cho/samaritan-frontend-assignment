import { combineReducers } from "redux";
import { filterReducer } from "../app/pokemon/List/components/ListFilter";
import { pokemonListReducer } from "../app/pokemon/List/components/ListItems";

export default combineReducers({
  filter: filterReducer,
  pokemon: pokemonListReducer,
});
