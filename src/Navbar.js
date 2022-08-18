import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;
const Navbar = () => {
  return (
    <div className="container-fluid">
      <div className="inner-container">
        <div className="header">
          <Header
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
            }}
          >
            <div className="logo" />
            <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
              <Menu.Item key="home">Home</Menu.Item>
              <Menu.Item key="about">About</Menu.Item>
              <Menu.Item key="contact">Contact</Menu.Item>
              <Menu.Item key="blog">Blog</Menu.Item>
              <Menu.Item key="faq">Faq</Menu.Item>
            </Menu>
          </Header>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
