/* eslint-disable react/prop-types */
import React from "react";
import titleCase from "../../../../utils/titleCase";

export default function DetailsOverview({ details, hideImg }) {
  return (
    <div className="details-overview">
      {/* hide img toggle. */}
      <div style={{ display: hideImg ? "none" : null }}>
        <img
          width="300px"
          src={`https://pokeres.bastionbot.org/images/pokemon/${details.id}.png`}
          alt={details.name}
          className="pokemon-portrait"
        />
      </div>
      <h1>{titleCase(details.name)}</h1>
      <div>
        <p>ID: #{String(details.id).padStart(3, "0")}</p>
      </div>
      <div className="detail-types-list">
        {details.types.map((type) => (
          <div className="detail-type" key={type.type.name}>
            {titleCase(type.type.name)}
          </div>
        ))}
      </div>
      <div style={{ margin: 10 }}>
        <div>Height: {details.weight}</div>
        <div>Weight: {details.height}</div>
      </div>
    </div>
  );
}
