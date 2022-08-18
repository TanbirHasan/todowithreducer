import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, InputNumber } from "antd";

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 7,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};

const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [update, setUpdate] = useState();
  useEffect(() => {
    console.log(location.state); //result: 'some_value'
    setUsername(location.state[0]?.username);
    setEmail(location.state[0]?.email);
    setPhone(location.state[0]?.phone);
    setDescription(location.state[0]?.description);
  }, [location]);

  const onFinish = () => {
    form.resetFields();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allusers = JSON.parse(localStorage.getItem("user"));
    const updateddata = allusers?.filter(
      (data) => data.id === location.state[0].id
    );

    console.log(updateddata[0].id);

    var sameItem = JSON.parse(localStorage.getItem("user"));
    console.log(sameItem);
    for (var i = 0; i <= sameItem.length; i++) {
      if (updateddata[0].id === sameItem[i].id) {
        console.log(updateddata.id, sameItem[i].id);
        sameItem[i].username = username;
        sameItem[i].email = email;
        sameItem[i].phone = phone;
        sameItem[i].description = description;
        break;
      }
    }
    localStorage.setItem("user", JSON.stringify(sameItem));

    alert("data updated succesfully");
    navigate("/");
  };

  return (
    <div>
      <div className="container">
        <form className="updateform" onSubmit={handleSubmit} id="myForm">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <textarea
            type="text"
            rows="4"
            cols="50"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Enter Descrption"
          />
          <button className="update">Update</button>
        </form>
      </div>

      {/* <form>
        <input value={username} />
      </form> */}
    </div>
  );
};

export default Update;
