import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import AddButton from "../../../component/Buttons/AddButton";
import RelationAction from "../../../redux/relation/actions";
import requestingSelector from "../../../redux/requesting/requestingSelector";
import RelationSelector from "../../../redux/relation/relationSelector";

const AddUserButton = () => {
  const [modal, isModal] = useState(false);
  const dispatch = useDispatch();
  const userCreated = useSelector(RelationSelector.SelectUserCreated);
  const loading = useSelector((state) =>
    requestingSelector(state, [RelationAction.CREATE_USER])
  );
  const [form] = Form.useForm();

  const cancelAndReset = () => {
    form.resetFields();
    isModal(false);
  };
  const cancel = () => isModal(false);

  const submit = () => {
    console.log(form.getFieldsValue());
    dispatch(RelationAction.createUser(form.getFieldsValue()));
  };

  useEffect(() => {
    if (userCreated) cancelAndReset();
  }, [userCreated]);

  return (
    <>
      <AddButton onClick={() => isModal(true)} name="New User" small />
      <Modal
        width="600px"
        key="modal"
        visible={modal}
        onCancel={cancel}
        title="Add User"
        footer={[
          <Button onClick={cancelAndReset}>Cancel</Button>,
          <Button onClick={submit} type="primary" loading={loading}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input placeholder="User name" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            label="Direct relation"
            name="directRelation"
          >
            <Input placeholder="Direct relation to you" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddUserButton;
