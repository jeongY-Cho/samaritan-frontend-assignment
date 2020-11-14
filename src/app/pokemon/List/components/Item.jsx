import React from "react";
import PropTypes from "prop-types";

import "./Item.css";

const ListItem = ({ id, name }) => {
  return (
    <div className="pokemon-list-items">
      <div>
        <div className="img-placeholder" />
      </div>
      <div className="id-and-name">
        <div style={{ "padding-right": 20 }}>
          # <br />
          {String(id).padStart(3, "0")}
        </div>
        <div style={{ wordBreak: "break-all" }}>{name}</div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default ListItem;
