import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import "./index.css";

export default () => {
  const history = useHistory();

  const backCallback = useCallback(() => {
    history.goBack();
  }, []);

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
