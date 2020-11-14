import { combineReducers } from "redux";
import detailReducers from "../app/pokemon/Details/reducers";

export default combineReducers({
  details: detailReducers,
});
