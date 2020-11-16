/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";

import "./ListFilter.css";

export default () => {
  const filterValue = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(filterValue);

  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(filterValue);
  }, [filterValue]);

  const debouncedUpdateFilter = debounce((e) => {
    dispatch(setFilter(e.target.value));
  }, 200);

  const onChangeCallback = useCallback((e) => {
    setInputValue(e.target.value);
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
