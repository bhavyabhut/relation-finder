import React from "react";
import PropType from "prop-types";
import classNames from "classnames";
import styles from "./SideBar.module.scss";

const SideBar = ({ isOpen, children }) => {
  console.log(isOpen, children);
  return (
    <div
      className={classNames(styles.sidebar, {
        [styles.sidebar__toggled]: isOpen,
      })}
    >
      <div className={styles.border} style={{ marginLeft: "10px" }} />
      {children}
    </div>
  );
};
SideBar.propTypes = {
  isOpen: PropType.bool.isRequired,
  children: PropType.node,
};
SideBar.defaultProps = {
  children: null,
};

export default SideBar;
