import React from "react";
import StatusLabel from "../../../component/OtherRealation";
import { useSelector } from "react-redux";
import RelationSelector from "../../../redux/relation/relationSelector";
import RelationName from "./RelationName";

const OtherShowRelation = ({ otherRelationArr }) => {
  return (
    <>
      {otherRelationArr.length === 0
        ? "No relation available"
        : otherRelationArr?.map((rel) => (
            <>
              <StatusLabel status={rel.relationName} />
              <RelationName id={rel.relationWith} /> ,
            </>
          ))}
    </>
  );
};
export default OtherShowRelation;
