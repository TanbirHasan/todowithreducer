import Card from "antd/lib/card/Card";
import React, { useEffect, useState } from "react";

const Users = (props) => {
  const { handleedit } = props;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setInterval(() => {
      const allusers = JSON.parse(localStorage.getItem("user"));
      setUsers(allusers);
    }, 3000);
  }, []);

  useEffect(() => {}, [users]);
  const handledelete = (id) => {
    const remainingdata = users?.filter((data) => data.id != id);
    localStorage.setItem("user", JSON.stringify(remainingdata));
    setUsers(remainingdata);
  };

  return (
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
            <button className="edit" onClick={() => handleedit(data.id)}>
              Edit
            </button>
            <button className="delete" onClick={() => handledelete(data.id)}>
              Delete
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Users;
