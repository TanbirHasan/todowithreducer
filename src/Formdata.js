import { Button, Form, Input, InputNumber } from "antd";

import React, { useEffect, useReducer, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Users from "./Users";
import Update from "./Update";
const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 7,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};
/* eslint-enable no-template-curly-in-string */

const initialState = {
  id: "",
  username: "",
  email: "",
  phone: "",
  description: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "update_input":
      return {
        ...state,
        [action.key]: action.value,
      };

    default:
      return state;
  }
}

function storedata(state) {
  console.log(state);
  const users = [];

  let msgArr = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : [];
  msgArr.push(state);
  localStorage.setItem("user", JSON.stringify(msgArr));
}

const Formdata = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [active, setActive] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [update, setUpdate] = useState();

  useEffect(() => {}, [initialState]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const onFinish = () => {
    form.resetFields();
    const unid = Math.floor(Math.random() * 100);
    state.id = unid;
    storedata(state);
  };

  const handleedit = (id) => {
    const allusers = JSON.parse(localStorage.getItem("user"));
    const newdata = allusers?.filter((data) => data.id == id);
    console.log(newdata);
    navigate({ pathname: "/update" }, { state: newdata });
  };

  return (
    <div className="allcontent">
      <Form
        className="form"
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="formcontainer">
          <Form.Item
            name={["user", "name"]}
            label="Name"
            value={state.username}
            onChange={(e) =>
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "username",
              })
            }
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "email",
              })
            }
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["user", "Phone"]}
            value={state.phone}
            onChange={(e) =>
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "phone",
              })
            }
            label="Phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "Description"]}
            value={state.description}
            onChange={(e) =>
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "description",
              })
            }
            label="Desc"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.labelCol, offset: 11 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Users handleedit={handleedit} />
    </div>
  );
};

export default Formdata;
