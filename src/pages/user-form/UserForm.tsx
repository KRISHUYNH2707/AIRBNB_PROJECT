import { DatePicker, Image, Modal } from "antd";
import { Button, Form, Input, Select, Switch } from "antd";
import dayjs from "dayjs";

import { Header } from "antd/es/layout/layout";
import React, { useContext, useEffect, ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { PathAdmin } from "enums";
import { Users } from "interfaces/user";
import { RootDispatch, RootState } from "store/config";
import {
  createUserApiAction,
  fetchUserInfoApiAction,
  updateUserApiAction,
} from "store/reducers/userReducer";
import { formItemLayout, tailFormItemLayout } from "hooks/useMyForm";

interface ValuesAddUserForm {
  name: string;
  email: string;
  gender: string;
  password: string;
  birthday: any;
  phone: string;
  role: boolean;
}

export default function UserForm(): JSX.Element {
  const [file, setFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>("");

  const userInfo: Users = useSelector(
    (state: RootState) => state.userReducer.userInfo
  );
  const { name, email, gender, phone, birthday, role, avatar } = userInfo;

  const [, setLoading] = useContext(LoadingContext);
  const { ADMIN, USER, UPDATE } = PathAdmin;
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    userId &&
      form.setFieldsValue({
        name,
        email,
        phone,
        birthday: dayjs(birthday || "01-01-2011", dateFormatList[3]),
        gender: gender ? "male" : "female",
        role: role === "ADMIN" ? true : false,
      });
  }, [userInfo]);

  const { userId } = useParams();

  const { Option } = Select;

  const [form] = Form.useForm();

  useEffect(() => {
    if (userId) {
      handleUserApi(userId);
    }
  }, []);

  const handleUserApi = async (id: string) => {
    setLoading({ isLoading: true });
    const result = await dispatch(fetchUserInfoApiAction(id));
    setLoading({ isLoading: false });

    if (result.meta.requestStatus === "rejected") {
      navigate(`${ADMIN + USER}`);
    }
    // const { } = result.payload;
    if (result.meta.requestStatus === "fulfilled") {
      navigate(`${ADMIN + USER + UPDATE + userId}`);
    }
  };

  const handleFinish = async (values: ValuesAddUserForm) => {
    const { name, password, email, gender, phone, birthday, role } = values;
    const data: Users = {
      id: 0,
      name,
      email,
      password: password ? password : "",
      phone,
      birthday: birthday.format("DD-MM-YYYY"),
      avatar:
        "https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",
      gender: gender === "male" ? true : false,
      role: role ? "ADMIN" : "USER",
    };
    setLoading({ isLoading: true });
    if (userId) {
      const result = await dispatch(
        updateUserApiAction({ userId, information: data })
      );

      if (result.meta.requestStatus === "fulfilled") {
        navigate(`${ADMIN + USER}`);
      }
    } else {
      const result = await dispatch(createUserApiAction(data));

      if (result.meta.requestStatus === "fulfilled") {
        navigate(`${ADMIN + USER}`);
      }
    }
    setLoading({ isLoading: false });
  };

  const handleConfirmCreate = (data: ValuesAddUserForm): void => {
    Modal.confirm({
      title: "Do you want to create this location?",
      okText: "Done",
      cancelText: "None",
      onOk: () => {
        handleFinish(data);
      },
    });
  };

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  return (
    <div
      className="row"
      style={{
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      {userId && (
        <div className="col-4">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "400px",
              height: "400px",
            }}
          >
            <Image
              src={
                imagePreview !== ""
                  ? imagePreview
                  : avatar === ""
                  ? "https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0"
                  : avatar
              }
              style={{
                width: "100%",
                backgroundAttachment: "cover",
              }}
            />
          </div>
        </div>
      )}
      <div className="col-8">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={handleConfirmCreate}
          initialValues={{}}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Header className="mb-4 title-admin">
            <h1> {userId ? "Update" : "Add User"} </h1> :
          </Header>
          <Form.Item
            name="name"
            label="Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            tooltip="How can I contact you?"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {userId ? (
            <>
              <Form.Item name="role" label="Admin" valuePropName="checked">
                <Switch />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    pattern: new RegExp(
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
                    ),
                    message:
                      "Minimum of eight characters, at least one uppercase letter, one lowercase letter, and one number.",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>{" "}
            </>
          )}

          <Form.Item
            name="birthday"
            label="Birthday"
            rules={[
              {
                type: "object" as const,
                required: true,
                message: "Please select time!",
              },
            ]}
          >
            <DatePicker format={dateFormatList} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: new RegExp(/^0\d{9}$/),
                message: "Must contain 10 digits and start with 0.",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {userId ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
