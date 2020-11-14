import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { updateTime } from "./actions";

export default () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const time = useSelector((state) => state.details.time);

  const useCallbackOnClick = React.useCallback(() => {
    dispatch(updateTime());
  });

  return (
    <div>
      <div>Details</div>
      <div>{match.params.name}</div>
      <div>{new Date(time).toLocaleTimeString()}</div>
      <div>
        <button onClick={useCallbackOnClick} type>
          update
        </button>
      </div>
    </div>
  );
};
