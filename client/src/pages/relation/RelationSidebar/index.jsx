import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "../../../component/SideBar/SideBar";
import RelationSelector from "../../../redux/relation/relationSelector";
import RelationAction from "../../../redux/relation/actions";
import { timestampToLocale } from "../../../utilities/date";
import OtherRelationShow from "./OtherRelationShow";
import StatusLabel from "../../../component/StatusLabel";
import Editable from "../../../component/Editable/Editable";
import requestingSelector from "../../../redux/requesting/requestingSelector";

const RelationSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedUser = useSelector(RelationSelector.SelectSelectedUser);
  const userUpdated = useSelector(
    RelationSelector.SelectRelationUpdateFinished
  );
  const loading = useSelector((state) =>
    requestingSelector(state, [RelationAction.UPDATE_DIRECT_RELATION])
  );
  const unselectUser = () => dispatch(RelationAction.unselectSite());
  useEffect(() => {
    setIsOpen(false);
    setTimeout(() => {
      setIsOpen(true);
    }, 1);
  }, [selectedUser?._id]);
  useEffect(() => {
    if (userUpdated) setOpen(false);
  }, [userUpdated]);
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
                    <Editable
                      loading={loading}
                      onSubmit={(data) =>
                        dispatch(
                          RelationAction.updateUser({
                            userId: selectedUser._id,
                            user: {
                              directRelation: data,
                            },
                          })
                        )
                      }
                      onCancel={() => setOpen(false)}
                      setActive={() => setOpen(true)}
                      active={open}
                      initialValue={
                        selectedUser.directRelation || "enter relation"
                      }
                    >
                      <StatusLabel status={selectedUser.directRelation} />
                    </Editable>
                  </td>
                </tr>
                <tr className="mt-2">
                  <td className="p-2">
                    <strong>Other Relation: </strong>
                  </td>
                  <td className="text-dark">
                    <OtherRelationShow
                      otherRelationArr={selectedUser.otherRelation}
                    />
                  </td>
                </tr>
                <tr className="mt-2">
                  <td className="p-2">
                    <strong>Created: </strong>
                  </td>
                  <td className="text-dark">
                    {timestampToLocale(selectedUser.createdAt)}
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
