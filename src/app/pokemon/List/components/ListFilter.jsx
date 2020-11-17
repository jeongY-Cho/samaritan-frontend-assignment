/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";

import "./ListFilter.css";

export default () => {
  // filter value
  const filterValue = useSelector((state) => state.filter);

  // get dispatch function for store
  const dispatch = useDispatch();

  // value for input
  const [inputValue, setInputValue] = useState(filterValue);

  // reference for input
  const inputRef = useRef(null);

  // synchronize input with filter in state
  useEffect(() => {
    setInputValue(filterValue);
  }, [filterValue]);

  // debounce the filtering
  const debouncedUpdateFilter = debounce((e) => {
    dispatch(setFilter(e.target.value));
  }, 200);

  // callback to change
  const onChangeCallback = useCallback((e) => {
    // set input directly will sync with state eventually
    setInputValue(e.target.value);
    // debounce the filter input
    debouncedUpdateFilter(e);
  }, []);

  return (
    <div
      className="filter-container"
      onClick={() => {
        inputRef.current && inputRef.current.focus();
      }}
      role="textbox"
      onKeyPress={() => {
        inputRef.current && inputRef.current.focus();
      }}
      tabIndex={0}
    >
      <div data-icon="ei-search" data-size="m" />
      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Filter"
          className="filter-input"
          value={inputValue}
          onChange={onChangeCallback}
        />
      </div>
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

export function setFilter(value) {
  return {
    type: "filter::set-filter",
    value,
  };
}
