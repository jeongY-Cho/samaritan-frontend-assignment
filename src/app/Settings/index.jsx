import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCache } from "../../cache";
import { setOptionThunk } from "./actions";

export default () => {
  const dispatch = useDispatch();

  // get settings
  const { deepFilter, useIndexedDB, detailsOnHover, paginate } = useSelector(
    (state) => state.settings
  );

  return (
    <div>
      <h1>Settings</h1>

      <div>
        <label htmlFor="deepFilter">
          Filter on more than just name?
          <input
            type="checkbox"
            name="deepFilter"
            id="deepFilter"
            checked={deepFilter}
            onChange={() => {
              dispatch(setOptionThunk("deepFilter", !deepFilter));
            }}
          />
        </label>
      </div>
      <div>
        <label htmlFor="useIndexedDB">
          Cache using IndexedDB?
          <input
            type="checkbox"
            name="useIndexedDB"
            id="useIndexedDB"
            checked={useIndexedDB}
            onChange={() => {
              dispatch(setOptionThunk("useIndexedDB", !useIndexedDB));
            }}
          />
        </label>
      </div>
      <div>
        <label htmlFor="detailsOnHover">
          Quick detail view on hover?
          <input
            type="checkbox"
            name="detailsOnHover"
            id="detailsOnHover"
            checked={detailsOnHover}
            onChange={() => {
              dispatch(setOptionThunk("detailsOnHover", !detailsOnHover));
            }}
          />
        </label>
      </div>
      <div>
        <label htmlFor="paginate">
          Paginate?
          <input
            type="checkbox"
            name="paginate"
            id="paginate"
            checked={paginate}
            onChange={() => {
              dispatch(setOptionThunk("paginate", !paginate));
            }}
          />
        </label>
      </div>
      <div>
        Clear Cache?
        <button
          onClick={() => {
            // eslint-disable-next-line no-alert, no-restricted-globals
            if (confirm("Are you sure you want to clear the Cache?")) {
              clearCache();
            }
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};
