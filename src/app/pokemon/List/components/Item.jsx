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
    <div className="pokemon-list-items">
      <div>
        {details.id ? (
          <div>
            <img
              width="180px"
              src={`https://pokeres.bastionbot.org/images/pokemon/${details.id}.png`}
              alt={details.name}
              style={{ filter: "drop-shadow(black 2px 7px 10px)" }}
            />
          </div>
        ) : (
          <div className="img-placeholder">Loading</div>
        )}
      </div>
      <div
        className="id-and-name"
        onClick={goToDetails}
        tabIndex={0}
        onKeyPress={goToDetails}
        role="button"
      >
        <div style={{ "padding-right": 20 }}>
          # <br />
          {String(details.id).padStart(3, "0")}
        </div>
        <div style={{ wordBreak: "break-all" }}>
          {details.name && titleCase(details.name)}
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ListItem;
