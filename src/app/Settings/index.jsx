import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCache } from "../../cache";
import { setOptionThunk } from "./actions";

export default () => {
  const dispatch = useDispatch();

  const deepFilter = useSelector((state) => state.settings.deepFilter);
  const useIndexedDB = useSelector((state) => state.settings.useIndexedDB);

  console.log(JSON.stringify(deepFilter), useIndexedDB);
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
