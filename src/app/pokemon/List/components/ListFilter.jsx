import React, { useCallback } from "react";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";

import "./ListFilter.css";

export function setFilter(value) {
  return {
    type: "filter::set-filter",
    value,
  };
}

export default () => {
  const filterValue = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const filterChangeCallback = useCallback((e) => {
    dispatch(setFilter(e.target.value));
  }, []);

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search"
        className="filter-input"
        value={filterValue}
        onChange={filterChangeCallback}
      />
    </div>
  );
};

export function filterReducer(state = "", action) {
  switch (action.type) {
    case "filter::set-filter":
      return action.value;
    default:
      return state;
  }
}
