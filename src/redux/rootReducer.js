import { combineReducers } from "redux";
import detailReducers from "../app/pokemon/Details/reducers";
import { filterReducer } from "../app/pokemon/List/components/ListFilter";

export default combineReducers({
  details: detailReducers,
  filter: filterReducer,
});
