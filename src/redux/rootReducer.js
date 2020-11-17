import { combineReducers } from "redux";
import { filterReducer } from "../app/pokemon/List/components/ListFilter";
import { pokemonListReducer } from "../app/pokemon/List/components/ListItems";
import settingsReducer from "../app/Settings/reducers";

export default combineReducers({
  filter: filterReducer,
  pokemon: pokemonListReducer,
  settings: settingsReducer,
});
