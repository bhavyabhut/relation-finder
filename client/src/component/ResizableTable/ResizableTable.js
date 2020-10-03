import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import style from "./resizableTable.module.scss";

const defaultAction = () => {};
class ResizableTable extends React.Component {
  ResizeableTitle = (props) => {
    const { width, children } = props;
    if (!width) {
      return (
        // <Resizable height={0} onResize={onResize}>
        <th>{children}</th>
        // </Resizable>
      );
    }

    return (
      // <Resizable width={width} height={0} onResize={onResize}>
      <th>{children}</th>
      // </Resizable>
    );
  };

  handleResize = (index) => (e, data) => {
    const { setColumns, columns } = this.props;
    const { size } = data;
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width
        ? size.width
        : data?.node?.parentNode?.clientWidth + 1 + e.movementX,
    };
    setColumns(nextColumns);
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
    const enabledColumns = columns.filter((column) => column.enabled !== false);

    const columnsProp = enabledColumns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

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
          columns={columnsProp}
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

ResizableTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  keyFn: PropTypes.func.isRequired,
  setColumns: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  autoWidth: PropTypes.bool,
};

ResizableTable.defaultProps = {
  onRowClick: defaultAction,
  autoWidth: false,
};
export default ResizableTable;
