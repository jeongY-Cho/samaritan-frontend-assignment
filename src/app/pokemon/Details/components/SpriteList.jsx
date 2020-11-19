import React from "react";
import titleCase from "../../../../utils/titleCase";

import "./SpriteList.css";

// eslint-disable-next-line react/prop-types
export default function SpriteList({ sprites, showSpriteURI, activeSprite }) {
  return (
    <div>
      {Object.keys(sprites)
        .filter((sprite) => !!sprites[sprite])
        .map((s) => (
          <div style={{ marginLeft: 20 }}>
            {typeof sprites[s] === "string" ? (
              <div>
                -{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    showSpriteURI(sprites[s]);
                  }}
                  className={`sprite-button ${
                    activeSprite === sprites[s] ? "active" : ""
                  }`}
                >
                  {formatSpriteKey(s)}
                </button>
              </div>
            ) : (
              <>
                <div>{formatSpriteKey(s)}:</div>
                <SpriteList
                  sprites={sprites[s]}
                  showSpriteURI={showSpriteURI}
                  activeSprite={activeSprite}
                />
              </>
            )}
          </div>
        ))}
    </div>
  );
}

function formatSpriteKey(str) {
  return titleCase(str.replace(/[-_]/g, " "));
}
