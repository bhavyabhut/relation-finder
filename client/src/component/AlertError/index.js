import { Alert } from "antd";
import React from "react";
import PropTypes from "prop-types";

export default function AlertError({ error }) {
  if (error?.errors) {
    return error.errors.map((err) => (
      <Alert key={err.error} message={err.message} type="error" closable />
    ));
  }
  return (
    <Alert
      message="There was an error while processing your request."
      type="error"
      closable
    />
  );
}
AlertError.propTypes = {
  error: PropTypes.any.isRequired,
};
