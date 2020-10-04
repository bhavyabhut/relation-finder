import React from "react";
import StatusLabel from "../../../component/StatusLabel";
import RelationName from "./RelationName";

const OtherRelationShow = ({ otherRelationArr }) => {
  return (
    <>
      {otherRelationArr.length === 0
        ? "No relation available"
        : otherRelationArr?.map((rel, index) => (
            <>
              <StatusLabel status={rel.relationName} />
              {index === otherRelationArr.length - 1 ? (
                <RelationName id={rel.relationWith} />
              ) : (
                <>
                  <RelationName id={rel.relationWith} /> ,
                </>
              )}
            </>
          ))}
    </>
  );
};
export default OtherRelationShow;
