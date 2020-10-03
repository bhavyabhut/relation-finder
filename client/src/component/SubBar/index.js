import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";

class SubBar extends React.Component {
  render() {
    const { title, dedicatedButton, addRelation, showRelation } = this.props;
    return (
      <div id="#commonsubbar" className={styles.subbar}>
        <ul className={`${styles.breadcrumbs} mr-4 flex-shrink-0`}>
          <li className={styles.breadcrumb}>
            <a
              href="#"
              className={`${styles.breadcrumbLink} ${styles.breadcrumbLink__current} `}
            >
              {title}
            </a>
          </li>
        </ul>
        <div className="flex-shrink-0">{dedicatedButton}</div>
        <div className="flex-shrink-0 ml-3">{addRelation}</div>
        <div className="flex-shrink-0 ml-3">{showRelation}</div>
      </div>
    );
  }
}
SubBar.propTypes = {
  title: PropTypes.string.isRequired,
  dedicatedButton: PropTypes.node,
  searchBar: PropTypes.node,
  deleteButton: PropTypes.node,
};
SubBar.defaultProps = {
  dedicatedButton: null,
  deleteButton: null,
  searchBar: null,
};
export default SubBar;
