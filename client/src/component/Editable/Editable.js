import React, { useState } from "react";
import PropTypes from "prop-types";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Button, Input } from "antd";
import styles from "./Editable.module.scss";

const Editable = ({
  loading,
  onSubmit,
  onCancel,
  required,
  active,
  setActive,
  type,
  children,
  initialValue,
}) => {
  const _onCancel = (...all) => {
    setValue(initialValue);
    onCancel(...all);
  };
  const [value, setValue] = useState(initialValue ? initialValue : children);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    onSubmit(value);
  };

  const onKeyDown = (evt) => {
    evt.stopPropagation();
    if (evt.keyCode === 27) {
      onCancel();
    }
  };

  const InputElement = () => {
    if (type === "text")
      return (
        <Input
          value={value}
          onKeyDown={onKeyDown}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          autoFocus
        />
      );
    if (type === "textarea")
      return (
        <Input.TextArea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={onKeyDown}
          autoFocus
        />
      );
  };

  return (
    <>
      {active ? (
        <Form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="width-75p">
              {InputElement()}
              <div className="text-red font-size-12">
                {required && !value ? "Required" : <>&nbsp;</>}
              </div>
            </div>
            <div className="d-flex ">
              <div className="mx-1">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<CheckOutlined />}
                />
              </div>
              <div className="mx-1">
                <Button
                  type="secondary"
                  onClick={_onCancel}
                  icon={<CloseOutlined />}
                />
              </div>
            </div>
          </div>
        </Form>
      ) : (
        <div className={`width-100p ${styles.editableBox}`}>
          <p>
            {children}
            <Button
              shape="circle"
              size="small"
              icon={<EditOutlined />}
              color="black"
              type="link"
              className={styles.button}
              onClick={setActive}
            />
          </p>
        </div>
      )}
    </>
  );
};
Editable.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  onCancel: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  initialValue: PropTypes.string,
};
Editable.defaultProps = {
  required: false,
  type: "text",
  initialValue: null,
};

export default Editable;
