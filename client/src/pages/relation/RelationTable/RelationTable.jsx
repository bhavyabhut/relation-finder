import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomTable from "../../../component/CustomTable/CustomTable";

import RelationSelector from "../../../redux/relation/relationSelector";
import requestingSelector from "../../../redux/requesting/requestingSelector";
import RelationAction from "../../../redux/relation/actions";
import OtherRelationShow from "../RelationSidebar/OtherRelationShow";
import StatusLabel from "../../../component/StatusLabel";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Direct Relation",
    dataIndex: "directRelation",
    render: (text) => <StatusLabel status={text} />,
  },
  {
    title: "Other Relation",
    dataIndex: "otherRelation",
    render: (text) => <OtherRelationShow otherRelationArr={text} />,
  },
];
const RelationTable = () => {
  const dispatch = useDispatch();
  const users = useSelector(RelationSelector.SelectUsers);
  const loading = useSelector((state) =>
    requestingSelector(state, [RelationAction.REQUEST_USER])
  );
  const toggleRow = (row) => dispatch(RelationAction.toggleRow(row));

  useEffect(() => {
    if (users.length === 0) dispatch(RelationAction.requestUsers());
  }, []);
  return (
    <div style={{ padding: "0.3rem 0rem" }}>
      <CustomTable
        loading={loading}
        data={users}
        title={() => (
          <div>
            <div className="d-flex justify-content-between">
              <h5>Users</h5>
            </div>
          </div>
        )}
        onRowClick={toggleRow}
        keyFn={(render) => render._id}
        columns={columns}
      />
    </div>
  );
};

export default RelationTable;
