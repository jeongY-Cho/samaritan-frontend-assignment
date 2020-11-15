import React, { useCallback } from "react";
import PropTypes from "prop-types";

import "./Item.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import titleCase from "../../../../utils/titleCase";

const ListItem = ({ name }) => {
  const history = useHistory();
  const details = useSelector((state) => state.pokemon[name].details);

  const goToDetails = useCallback(() => {
    history.push(`/pokemon/${name}`);
  }, [name]);

  return (
    <div
      className="pokemon-list-items"
      onClick={goToDetails}
      tabIndex={0}
      onKeyPress={goToDetails}
      role="button"
    >
      <div>
        {details.id ? (
          <div>
            <img
              width="180px"
              src={`https://pokeres.bastionbot.org/images/pokemon/${details.id}.png`}
              alt={details.name}
              className="pokemon-portrait"
            />
          </div>
        ) : (
          <div className="img-placeholder">Loading</div>
        )}
      </div>
      <div className="id-and-name">
        <div style={{ "padding-right": 20 }}>
          # <br />
          {String(details.id).padStart(3, "0")}
        </div>
        <div style={{ wordBreak: "break-all" }}>
          <h3>{details.name && titleCase(details.name)}</h3>
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ListItem;
