import React, { useState } from "react";
import { Button, Form, Modal, Select } from "antd";
import { useSelector } from "react-redux";

import AddButton from "../../../component/Buttons/AddButton";
import RelationAction from "../../../redux/relation/actions";
import requestingSelector from "../../../redux/requesting/requestingSelector";
import RelationSelector from "../../../redux/relation/relationSelector";
import AlertError from "../../../component/AlertError";
import StatusLabel from "../../../component/StatusLabel";

const AddRelationButton = () => {
  const [error, setError] = useState(false);
  const [modal, isModal] = useState(false);
  const [ans, setAns] = useState({ done: false, msg: [] });

  const loading = useSelector((state) =>
    requestingSelector(state, [RelationAction.ADD_RELATION])
  );
  const [form] = Form.useForm();

  const cancelAndReset = () => {
    form.resetFields();
    isModal(false);
    setError(false);
    setAns({ done: false, msg: null });
  };
  const users = useSelector(RelationSelector.SelectUsers);

  const option = users.map((user) => ({ label: user.name, value: user._id }));

  const cancel = () => isModal(false);

  const submit = () => {
    const firstId = form.getFieldValue("firstPerson");
    const secondId = form.getFieldValue("secondPerson");
    if (!firstId || !secondId) {
      setError(true);
      return;
    }
    const firstUser = users.filter((user) => user._id === firstId)[0];
    const secondUser = users.filter((user) => user._id === secondId)[0];
    console.log(firstUser, secondUser, firstId, secondId);
    if (
      firstUser.otherRelation?.length === 0 &&
      secondUser.otherRelation?.length === 0
    ) {
      setAns({ done: true, msg: [] });
      return;
    }
    let ans = [];
    let finalAns = [];
    let currentIds = [];
    const find = (id, matchId) => {
      if (id) {
        const selectedUser = users.filter((user) => user._id === id)[0];
        const matchedUser = users.filter((user) => user._id === matchId)[0];

        currentIds = selectedUser.otherRelation.map(
          (relation) => relation.relationWith
        );
        ans.push(selectedUser);
        if (currentIds.includes(matchId)) {
          finalAns.push([...ans, matchedUser]);
          return;
        }
        currentIds.forEach((current) => {
          find(current, matchId);
          ans = [];
        });
        return "No Relation";
      }
    };
    if (firstUser.otherRelation.length !== 0) {
      find(firstId, secondId);
    } else {
      find(secondId, firstId);
    }
    setAns({ done: true, msg: finalAns });
  };
  return (
    <>
      <AddButton onClick={() => isModal(true)} name="Show Relation" small />
      <Modal
        width="600px"
        key="modal"
        visible={modal}
        onCancel={cancel}
        title="Add Relation"
        footer={[
          <Button onClick={cancelAndReset}>Cancel</Button>,
          <Button onClick={submit} type="primary" loading={loading}>
            Show Relation
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
        </Form>
        {error ? <AlertError error="select proper value" /> : null}
        {ans.done ? (
          ans.msg.length === 0 ? (
            <div className="font-weight-bold text-danger">
              No relation between two people
            </div>
          ) : (
            ans.msg.map((li, mainIndex) => (
              <div className="mt-3 font-weight-bold text-dark">
                {li?.map((nested, index) => {
                  if (index === 0)
                    return (
                      <>
                        {mainIndex + 1}) <StatusLabel status={nested.name} />
                        -->
                      </>
                    );
                  else if (index === li.length - 1)
                    return <StatusLabel status={nested.name} />;
                  else
                    return (
                      <>
                        <StatusLabel status={nested.name} /> -->
                      </>
                    );
                })}
              </div>
            ))
          )
        ) : null}
      </Modal>
    </>
  );
};
export default AddRelationButton;
