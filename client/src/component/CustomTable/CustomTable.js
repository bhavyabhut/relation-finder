import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import style from "./customTable.module.scss";

const defaultAction = () => {};
class CustomTable extends React.Component {
  ResizeableTitle = (props) => {
    const { width, children } = props;
    if (!width) {
      return <th>{children}</th>;
    }

    return <th>{children}</th>;
  };

  render() {
    const {
      data,
      columns,
      loading,
      keyFn,
      title,
      onRowClick,
      autoWidth,
    } = this.props;
    const components = {
      header: {
        cell: this.ResizeableTitle,
      },
    };

    const onRow = (record) => ({
      onClick: () => {
        onRowClick(record);
      },
    });
    return (
      <div
        className={`${style.resizableTable} ${
          autoWidth ? style.autoColWidth : ""
        } mb-4 ${defaultAction !== onRowClick ? style.pointerRow : ""} `}
      >
        <Table
          rowKey={keyFn}
          title={title}
          rowClassName={() => style.row}
          onRow={onRow}
          loading={loading}
          columns={columns}
          components={components}
          dataSource={data}
          scroll={{ x: true }}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}

CustomTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  keyFn: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  autoWidth: PropTypes.bool,
};

CustomTable.defaultProps = {
  onRowClick: defaultAction,
  autoWidth: false,
};
export default CustomTable;
