import React from "react";
import { useSelector } from "react-redux";
import RelationSelector from "../../../redux/relation/relationSelector";

const RelationName = ({ id }) => {
  const relationName = useSelector((state) =>
    RelationSelector.SelectIdToName(state, id)
  );
  return ` of ${relationName?.name}`;
};
export default RelationName;
