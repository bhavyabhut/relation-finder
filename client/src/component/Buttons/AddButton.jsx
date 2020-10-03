import React from "react";

const AddButton = ({ name, onClick, small = false }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`btn btn-primary btn-with-addon text-nowrap ${
        small ? "btn-sm" : ""
      }`}
    >
      <span className="btn-addon">
        <i className="btn-addon-icon fa fa-plus-circle" />
      </span>
      {name}
    </button>
  );
};

export default AddButton;
