import React from "react";
import PropTypes from "prop-types";

import "./ListItem.css";

const ListItem = ({ id, name }) => {
  return (
    <div className="pokemon-list-items">
      <div>
        <div className="img-placeholder" />
      </div>
      <div>
        <div># 001</div>
        <div>Bulbasaur</div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default ListItem;
