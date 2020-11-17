import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import DetailsOverview from "../../Details/components/DetailsOverview";

import useMousePosition from "../../../../hooks/useMousePosition";

import "./HoverDetails.css";

export default function HoverDetails({ initialPos, name }) {
  const { x, y } = useMousePosition(initialPos.x, initialPos.y);

  // get details for the pokemon
  // expect that details exist
  const details = useSelector((state) => state.pokemon[name].details);

  return (
    <div className="hover-details" style={{ left: x, top: y }}>
      {/* don't show img for the hover */}
      <DetailsOverview details={details} hideImg />
    </div>
  );
}

HoverDetails.propTypes = {
  name: PropTypes.number.isRequired,
  initialPos: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  },
};

HoverDetails.defaultProps = {
  initialPos: {
    x: null,
    y: null,
  },
};
