import { Button, Form, Input, InputNumber } from "antd";
import Card from "antd/lib/card/Card";

import React, { useEffect, useReducer, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Formdata = () => {
  // state for storing and editing data

  const [active, setActive] = useState(false);
  const [dataupdate, setDataupdate] = useState();

  // initial State for reducer

  const initialState = {
    id: "",
    username: "",
    email: "",
    phone: "",
    description: "",
  };

  // reducer function

  function reducer(state, action) {
    switch (action.type) {
      case "update_input":
        return {
          ...state,
          [action.key]: action.value,
        };
      case "clear_form":
        return {
          ...state,
          username: "",
          email: "",
          phone: "",
          description: "",
        };

      default:
        return state;
    }
  }

  // Function for storing the data
  function storeData(state) {
    let msgArr = JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : [];
    msgArr.push(state);
    localStorage.setItem("user", JSON.stringify(msgArr));
  }

  // useReducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const [users, setUsers] = useState([]);

  // Fetching data from localStorage

  useEffect(() => {
    setInterval(() => {
      const allusers = JSON.parse(localStorage.getItem("user"));
      setUsers(allusers);
    }, 3000);
  }, [users]);

  // Creating new data and submitting

  const handleSubmit = (e) => {
    e.preventDefault();
    const unid = Math.floor(Math.random() * 100);
    state.id = unid;
    storeData(state);
    makeDispatch();
  };

  // Selecting the data for Update
  const handleEdit = (id) => {
    const allusers = JSON.parse(localStorage.getItem("user"));
    const newdata = allusers?.filter((data) => data.id == id);
    console.log(newdata);

    updateData(newdata);
    setActive(true);
    setDataupdate(newdata[0]);
  };

  // Updating Specific Data

  const handleUpdate = (e) => {
    e.preventDefault();

    var sameItem = JSON.parse(localStorage.getItem("user"));
    console.log(sameItem);
    for (var i = 0; i <= sameItem.length; i++) {
      if (dataupdate.id === sameItem[i].id) {
        console.log(dataupdate.id, sameItem[i].id);
        sameItem[i].username = state.username;
        sameItem[i].email = state.email;
        sameItem[i].phone = state.phone;
        sameItem[i].description = state.description;
        break;
      }
    }
    localStorage.setItem("user", JSON.stringify(sameItem));

    alert("data updated succesfully");
    makeDispatch();
    setActive(false);
  };

  // Update Function

  function updateData(data) {
    data.map((newdata) => {
      var keys = Object.keys(newdata);
      console.log(keys);

      for (var i = 0; i < keys.length; i++) {
        dispatch({
          type: "update_input",
          value: newdata[keys[i]],
          key: keys[i],
        });
      }
    });
  }

  // Deleteing specific data

  const handledelete = (id) => {
    const remainingdata = users?.filter((data) => data.id != id);
    localStorage.setItem("user", JSON.stringify(remainingdata));
    setUsers(remainingdata);
    makeDispatch();
    setActive(false);
  };

  function makeDispatch() {
    dispatch({ type: "clear_form" });
  }
  return (
    <div className="allcontent">
      <div>
        <div className="container">
          <form className="form" id="myForm" onSubmit={handleSubmit}>
            <h2 id="formtitle">Please Enter Your Information</h2>
            <input
              type="text"
              placeholder="Name"
              value={state.username}
              onChange={(e) =>
                dispatch({
                  type: "update_input",
                  value: e.target.value,
                  key: "username",
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Email"
              value={state.email}
              onChange={(e) =>
                dispatch({
                  type: "update_input",
                  value: e.target.value,
                  key: "email",
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Phone"
              value={state.phone}
              onChange={(e) =>
                dispatch({
                  type: "update_input",
                  value: e.target.value,
                  key: "phone",
                })
              }
              required
            />
            <textarea
              type="text"
              rows="4"
              cols="50"
              value={state.description}
              onChange={(e) =>
                dispatch({
                  type: "update_input",
                  value: e.target.value,
                  key: "description",
                })
              }
              placeholder="Enter Descrption"
              required
            />
            <div className="buttondiv">
              {!active ? <button className="btn">Submit</button> : ""}

              {active ? (
                <button className="btn" onClick={(e) => handleUpdate(e)}>
                  Update
                </button>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="userinfo">
        {users?.map((data) => (
          <Card
            id="card"
            title="User Info"
            extra={<a href="#">More</a>}
            style={{
              width: 300,
            }}
          >
            <h2>Name : {data.username}</h2>
            <h3>Email : {data.email}</h3>
            <h3>Phone : {data.phone}</h3>
            <p>Description : {data.description}</p>
            <div className="button">
              <button className="edit" onClick={() => handleEdit(data.id)}>
                Edit
              </button>
              <button className="delete" onClick={() => handledelete(data.id)}>
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Formdata;
