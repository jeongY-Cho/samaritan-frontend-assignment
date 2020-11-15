import { combineReducers } from "redux";
import detailReducers from "../app/pokemon/Details/reducers";
import { filterReducer } from "../app/pokemon/List/components/ListFilter";
import { pokemonListReducer } from "../app/pokemon/List/components/ListItems";

export default combineReducers({
  details: detailReducers,
  filter: filterReducer,
  pokemon: pokemonListReducer,
});
