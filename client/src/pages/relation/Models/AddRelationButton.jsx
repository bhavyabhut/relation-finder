import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import AddButton from "../../../component/Buttons/AddButton";
import RelationAction from "../../../redux/relation/actions";
import requestingSelector from "../../../redux/requesting/requestingSelector";
import RelationSelector from "../../../redux/relation/relationSelector";

const AddRelationButton = () => {
  const [modal, isModal] = useState(false);
  const dispatch = useDispatch();
  const relationCreated = useSelector(RelationSelector.SelectRelationCreated);
  const loading = useSelector((state) =>
    requestingSelector(state, [RelationAction.ADD_RELATION])
  );
  const [form] = Form.useForm();

  const cancelAndReset = () => {
    form.resetFields();
    isModal(false);
  };
  const users = useSelector(RelationSelector.SelectUsers);

  const option = users.map((user) => ({ label: user.name, value: user._id }));

  const cancel = () => isModal(false);

  const submit = () => {
    console.log(form.getFieldsValue());
    dispatch(RelationAction.addRelation(form.getFieldsValue()));
  };

  useEffect(() => {
    if (relationCreated) cancelAndReset();
  }, [relationCreated]);

  return (
    <>
      <AddButton onClick={() => isModal(true)} name="Add Relation" small />
      <Modal
        width="600px"
        key="modal"
        visible={modal}
        onCancel={cancel}
        title="Add Relation"
        footer={[
          <Button onClick={cancelAndReset}>Cancel</Button>,
          <Button onClick={submit} type="primary" loading={loading}>
            Add Relation
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            label="First user"
            name="firstPerson"
            rules={[{ required: true, message: "Please select user" }]}
          >
            <Select options={option} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            label="Second user"
            name="secondPerson"
            rules={[{ required: true, message: "Please select user" }]}
          >
            <Select options={option} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            label="Relation"
            name="relation"
          >
            <Input placeholder="Enter relation " />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddRelationButton;
