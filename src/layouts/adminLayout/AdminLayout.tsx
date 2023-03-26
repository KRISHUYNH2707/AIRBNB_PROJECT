import React, { useState } from "react";
import {
  HomeOutlined,
  EnvironmentOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, RootDispatch, RootState } from "store/config";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "store/reducers/loginReducer";
import "./index.scss";

export default function AdminLayout(): JSX.Element {
  const userState = useSelector((state: RootState) => state.loginReducer);
  const dispatch = useDispatch<RootDispatch>();

  const [path, setPath] = useState({
    path: "",
  });
  const navigate = useNavigate();
  const { Content, Footer, Sider } = Layout;

  type MenuItem = Required<MenuProps>["items"][number];

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[] | null
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  };

  const items: MenuItem[] = [
    getItem("User", "user-management", <UserOutlined />),
    getItem("Location", "location-data-information", <EnvironmentOutlined />),
    getItem("Room", "room-information", <HomeOutlined />),
    getItem(
      "Booking Room",
      "room-reservation-information",
      <ProfileOutlined />
    ),
  ];
  const [collapsed, setCollapsed] = useState(false);

  const handleSwitchPage = (
    e: any = {
      key: "user-management",
    }
  ): void => {
    setPath({
      path: e.key,
    });
    navigate(`/admin/${e.key}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO_KEY");
    dispatch(loginActions.setUserInfoAction({ token: "" }));
    navigate("/");
  };

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            onClick={handleSwitchPage}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
              >
                <Breadcrumb.Item>admin</Breadcrumb.Item>
                <Breadcrumb.Item
                  className="cursor-pointer"
                  onClick={() => navigate(path.path)}
                >
                  {path.path}
                </Breadcrumb.Item>
              </Breadcrumb>
              <button className="btn btn-danger" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2023 Created by Thanh Huy
          </Footer>
        </Layout>
      </Layout>
    </PersistGate>
  );
}
