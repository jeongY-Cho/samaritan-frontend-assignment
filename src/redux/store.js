import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";

import RootReducer from "./rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

export default store;
