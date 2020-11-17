import React, { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import HoverDetails from "./HoverDetails";

import titleCase from "../../../../utils/titleCase";

import "./Item.css";

const ListItem = ({ name }) => {
  // get history to nav to details
  const history = useHistory();

  // get the details for a pokemon
  // expect details for this pokemon to exist,
  // since component wouldn't mount if there isn't details loaded
  const details = useSelector((state) => state.pokemon[name].details);

  // get settings for
  const detailsOnHover = useSelector((state) => state.settings.detailsOnHover);

  // show/hide detail state
  const [hoverDetail, showDetail] = useState(false);
  // ref to hold hover timeout
  const timeout = useRef(null);
  // initial position ref for better ux
  const initialPos = useRef({ x: null, y: null });

  // nav to detail for pokemon
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
      onMouseEnter={(ev) => {
        // save mouse position
        initialPos.current = {
          x: ev.clientX,
          y: ev.clientY,
        };

        // only show hover when option is enabled
        if (detailsOnHover) {
          // eslint-disable-next-line no-const-assign
          timeout.current = setTimeout(() => {
            showDetail(true);
          }, 500);
        }
      }}
      // hide hover
      onMouseLeave={() => {
        clearTimeout(timeout.current);
        showDetail(false);
      }}
    >
      <div>
        <div>
          <img
            width="180px"
            src={`https://pokeres.bastionbot.org/images/pokemon/${details.id}.png`}
            alt={details.name}
            className="pokemon-portrait"
          />
        </div>
      </div>
      <div className="id-and-name">
        <div style={{ "padding-right": 20, fontSize: "0.9rem" }}>
          {/* pad start */}#{String(details.id).padStart(3, "0")}
        </div>
        <div style={{ wordBreak: "break-all" }}>
          <h3>{details.name && titleCase(details.name)}</h3>
        </div>
      </div>
      {/* hover div */}
      {hoverDetail && (
        <HoverDetails name={name} initialPos={initialPos.current} />
      )}
    </div>
  );
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ListItem;
