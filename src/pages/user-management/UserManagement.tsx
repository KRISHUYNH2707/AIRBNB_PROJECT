import React, { useEffect, useContext, useMemo, useState } from "react";
import { Image, Modal, Space, Table, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "store/config";
import { Users } from "interfaces/user";
import { LoadingContext } from "contexts/loading/LoadingContext";
import {
  deleteUserApiAction,
  fetchUserListApiAction,
} from "store/reducers/userReducer";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { PathAdmin } from "enums";
import { CloseOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import "./index.scss";
import { Content } from "interfaces/searchContent";

interface DataUsers extends Users {
  key: number;
}

export default function UserManagement(): JSX.Element {
  const userList: Content<Users> = useSelector(
    (state: RootState) => state.userReducer.userList
  );
  const [arrow] = useState("Show");
  const dispatch = useDispatch<RootDispatch>();

  const navigate: NavigateFunction = useNavigate();

  const [, setLoading] = useContext(LoadingContext);

  // path
  const { ADMIN, USER, CREATE, UPDATE } = PathAdmin;

  useEffect(() => {
    handleFetchUserListApi();
  }, []);

  const handleFetchUserListApi = async (
    page: number = 1,
    keywords: string = ""
  ) => {
    setLoading({ isLoading: true });
    await dispatch(fetchUserListApiAction({ page, keywords }));
    setLoading({ isLoading: false });
  };

  const handleChangePage = (page: any) => {
    handleFetchUserListApi(page, "");
  };

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const renderActions = (id: number): JSX.Element[] => {
    const actions = [
      <Tooltip placement="top" key="edit" title={"Edit"} arrow={mergedArrow}>
        <EditOutlined
          className="update-icon"
          onClick={() => navigate(`${ADMIN + USER + UPDATE + id}`)}
        />
      </Tooltip>,
      <Tooltip
        placement="top"
        key="delete"
        title={"Delete"}
        arrow={mergedArrow}
      >
        <CloseOutlined
          className="remove-icon"
          onClick={() => handleConfirmRemove(id)}
        />
      </Tooltip>,
      <Tooltip
        placement="top"
        key="upload"
        title={"Upload"}
        arrow={mergedArrow}
      ></Tooltip>,
    ];
    return actions;
  };

  const handleRemove = async (id: number) => {
    setLoading({ isLoading: true });
    const result = await dispatch(deleteUserApiAction(id));
    setLoading({ isLoading: false });

    if (result.meta.requestStatus === "fulfilled") {
      handleFetchUserListApi(userList.pageIndex, userList.keywords);
    }
  };

  const handleConfirmRemove = (id: number) => {
    Modal.confirm({
      title: "Do you want to delete this user ?",
      okText: "Done",
      cancelText: "None",
      onOk: () => handleRemove(id),
    });
  };

  const data: DataUsers[] = userList.data.map((user: any, idx: number) => {
    return {
      ...user,
      key: idx,
    };
  });

  const columns: ColumnsType<DataUsers> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => (
        <Image
          src={`${
            text === ""
              ? "https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0"
              : `${text}`
          }`}
          style={{
            width: 100,
            height: 100,
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
      render: (text) => {
        const gender: string = text ? "Male" : "Female";
        return <>{gender}</>;
      },
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (user: Users) => (
        <Space size="middle">{renderActions(user.id)}</Space>
      ),
    },
  ];

  const pagination: TablePaginationConfig = {
    pageSize: userList.pageSize,
    current: userList.pageIndex,
    onChange: (page) => handleChangePage(page),
    pageSizeOptions: ["" + userList.pageSize],
    total: userList.totalRow,
    showQuickJumper: true,
  };

  return (
    <>
      <Tooltip
        key="create"
        placement="top"
        title={"Create"}
        arrow={mergedArrow}
      >
        <FormOutlined
          className="add-icon mb-2"
          onClick={() => navigate(`${ADMIN + USER + CREATE}`)}
        />
      </Tooltip>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        bordered={true}
      />
    </>
  );
}
