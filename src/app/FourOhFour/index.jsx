import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import "./index.css";

export default () => {
  // history to nav buttons
  const history = useHistory();

  // callback to go back
  const backCallback = useCallback(() => {
    history.goBack();
  }, []);

  // callback to go home
  const homeCallback = useCallback(() => {
    history.push("/");
  }, []);

  return (
    <div className="four-oh-four-container">
      <div>
        <h1>404</h1>
        <p>What you&apos;re looking for ain&apos;t here chief.</p>
      </div>
      <div>
        <button onClick={backCallback}>Back</button>
        <button onClick={homeCallback}>Home</button>
      </div>
    </div>
  );
};
