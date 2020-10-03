import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import SubBar from "../../component/SubBar";
import styles from "./styles.module.scss";
import RelationTable from "./RelationTable/RelationTable";
import AddUserButton from "./Models/AddUserButton";
import RelationSidebar from "./RelationSidebar";
import RelationSelector from "../../redux/relation/relationSelector";
import AddRelationButton from "./Models/AddRelationButton";
import ShowRelationButton from "./Models/ShowRelationButton";

const Relation = () => {
  const selectedUser = useSelector(RelationSelector.SelectSelectedUser);

  return (
    <div className="height-100p d-flex flex-column pt-5">
      <SubBar
        title="User"
        dedicatedButton={<AddUserButton />}
        addRelation={<AddRelationButton />}
        showRelation={<ShowRelationButton />}
      />
      <Helmet title="Relation" />
      <div className={styles.tableFullHeightContainer}>
        <div
          style={{
            transition: "all 0.4s",
            minWidth: !selectedUser ? "100%" : "calc( 100% - 500px)",
          }}
          className="overflow-hidden"
        >
          <RelationTable />
        </div>
        <RelationSidebar />
      </div>
    </div>
  );
};

export default Relation;
