import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import { fetchLoginApiAction } from "store/reducers/loginReducer";
import { useDispatch } from "react-redux/es/exports";
import { RootDispatch } from "store/config";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Login(): JSX.Element {
  const dispatch = useDispatch<RootDispatch>();
  const navigate: NavigateFunction = useNavigate();
  const [, setLoading] = useContext(LoadingContext);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading({ isLoading: true });
    await dispatch(fetchLoginApiAction(values));
    setLoading({ isLoading: false });
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
