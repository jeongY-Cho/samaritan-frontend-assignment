import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";

import store from "./redux/store";
import { setInitialSettingsThunk } from "./app/Settings/actions";

// set initial settings
store.dispatch(setInitialSettingsThunk());

// mount app
const root = document.getElementById("root");
ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
