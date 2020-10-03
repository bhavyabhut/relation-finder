import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ResizableTable from "../../../component/ResizableTable/ResizableTable";

import RelationSelector from "../../../redux/relation/relationSelector";
import requestingSelector from "../../../redux/requesting/requestingSelector";
import RelationAction from "../../../redux/relation/actions";
import OtherShowRelation from "../RelationSidebar/Other";
import StatusLabel from "../../../component/OtherRealation";

const initialColumns = [
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
    render: (text) => <OtherShowRelation otherRelationArr={text} />,
  },
];
const ProjectTable = () => {
  const [columns, setColumns] = useState(initialColumns);
  const dispatch = useDispatch();
  const users = useSelector(RelationSelector.SelectUsers);
  const loading = useSelector((state) =>
    requestingSelector(state, [RelationAction.REQUEST_USER])
  );
  const toggleRow = (row) => dispatch(RelationAction.toggleRow(row));
  const setColumnsFn = (newColumns) => setColumns([...newColumns]);

  useEffect(() => {
    if (users.length === 0) dispatch(RelationAction.requestUsers());
  }, []);
  return (
    <div style={{ padding: "0.3rem 0rem" }}>
      <ResizableTable
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
        setColumns={setColumnsFn}
      />
    </div>
  );
};

export default ProjectTable;
