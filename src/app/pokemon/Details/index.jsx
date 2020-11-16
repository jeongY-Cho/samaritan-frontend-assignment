import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import titleCase from "../../../utils/titleCase";
import resolveName from "../../../utils/resolveName";
import { pokemonDetailsThunk } from "../List/components/ListItems";

import "./index.css";

export default () => {
  const match = useRouteMatch();
  const history = useHistory();
  const resolvedName = resolveName(match.params.name);
  const pokemon = useSelector((state) => state.pokemon[resolvedName]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(resolvedName);
    dispatch(pokemonDetailsThunk(resolvedName));
    if (match.params.name !== resolvedName) {
      history.replace(`/pokemon/${resolvedName}`);
    }
  }, [match]);

  if (!pokemon || pokemon.status !== "success") {
    return <div>Loading</div>;
  }

  const { details } = pokemon;

  return (
    <div className="details-container">
      <div className="details-jumbotron">
        <div className="nav-triangle" data-direction="Previous">
          <div
            style={{
              display: details.id === 1 ? "none" : null,
              transform: "rotate(30deg) scale(0.2)",
              cursor: "pointer",
            }}
          >
            <div className="triangle" />
          </div>
        </div>
        <div className="details-overview">
          <div>
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
        <div className="nav-triangle" data-direction="Next">
          <div
            style={{
              transform: "rotate(-30deg) scale(0.2)",
              cursor: "pointer",
            }}
          >
            <div className="triangle" />
          </div>
        </div>
      </div>
      <div className="MA-list">
        <div>
          <div>
            <h2>Moves</h2>
          </div>
          <div>
            <ul>
              {details.moves.map((move) => (
                <li key={move.move.name}>
                  {titleCase(move.move.name.replace("-", " "))}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div>
            <h2>Abilities</h2>
          </div>
          <div>
            <ul>
              {details.abilities.map((ability) => (
                <li key={ability.ability.name}>
                  {" "}
                  {titleCase(ability.ability.name.replace("-", " "))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
