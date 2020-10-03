import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "../../../component/SideBar/SideBar";
import RelationSelector from "../../../redux/relation/relationSelector";
import RelationAction from "../../../redux/relation/actions";
import { timestampToLocale } from "../../../utilities/date";
import OtherShowRelation from "./Other";
import StatusLabel from "../../../component/OtherRealation";

const RelationSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedUser = useSelector(RelationSelector.SelectSelectedUser);

  const unselectUser = () => dispatch(RelationAction.unselectSite());
  useEffect(() => {
    setIsOpen(false);
    setTimeout(() => {
      setIsOpen(true);
    }, 1);
  }, [selectedUser?._id]);
  return (
    <div className="pr-n3 py-3" style={{ height: "100%", zIndex: 1 }}>
      <SideBar isOpen={!!selectedUser} width={550}>
        {!isOpen || !selectedUser ? null : (
          <div
            className="pl-1 pt-3 d-flex flex-column mr-1 flex-grow-1"
            style={{ height: "100%" }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div className="ml-3">
                <h5 className="d-inline">
                  <strong> {selectedUser.name}</strong>
                </h5>
                <h6 className="mt-3">
                  User Id: <strong>{selectedUser._id}</strong>
                </h6>
                <tr className="mt-2">
                  <td className="p-2">
                    <strong>Direct Relation: </strong>
                  </td>
                  <td className="text-dark">
                    <StatusLabel status={selectedUser.directRelation} />
                  </td>
                </tr>
                <tr className="mt-2">
                  <td className="p-2">
                    <strong>Other Relation: </strong>
                  </td>
                  <td className="text-dark">
                    <OtherShowRelation
                      otherRelationArr={selectedUser.otherRelation}
                    />
                  </td>
                </tr>
                <tr className="mt-2">
                  <td className="p-2">
                    <strong>Created: </strong>
                  </td>
                  <td className="text-dark">
                    {timestampToLocale(selectedUser.createdDate)}
                  </td>
                </tr>
              </div>
              <Button
                className="mr-5"
                type="link"
                shape="circle"
                onClick={unselectUser}
              >
                <i style={{ color: "black" }} className="fas fa-times" />
              </Button>
            </div>
          </div>
        )}
      </SideBar>
    </div>
  );
};
export default RelationSidebar;
