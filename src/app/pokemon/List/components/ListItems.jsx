import React from "react";
import { useSelector } from "react-redux";
import ListItem from "./ListItem";

export default () => {
  const filterValue = useSelector((state) => state.filter);

  return (
    <div className="pokemon-list">
      {Array(20)
        .fill("Bulbasaur")
        .filter((a) => {
          return RegExp(filterValue, "i").test(a);
        })
        .map((_, i) => (
          <ListItem key={i} id={1} name="Bulbasaur" />
        ))}
    </div>
  );
};
