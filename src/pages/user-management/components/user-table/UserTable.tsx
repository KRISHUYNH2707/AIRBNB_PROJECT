import { Table, Modal, Tooltip, Image, Space } from "antd";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useState, useMemo } from "react";
import { deleteUserApiAction } from "store/reducers/userReducer";
import { useDispatch } from "react-redux";
import { RootDispatch } from "store/config";
import { Users } from "interfaces/user";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Content } from "interfaces/searchContent";
import { PathAdmin } from "enums";

interface Props {
  handleFetchUserListApi: (page: number, keyword: string) => Promise<void>;
  keyword: string;
  setLoading: any;
  userList: Content<Users>;
}

interface DataUsers extends Users {
  key: number;
}

export default function UserTable(props: Props) {
  const { handleFetchUserListApi, keyword, setLoading, userList } = props;
  const [arrow] = useState<string>("Show");

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

  const { ADMIN, USER, UPDATE } = PathAdmin;
  const navigate: NavigateFunction = useNavigate();

  const dispatch = useDispatch<RootDispatch>();

  const handleChangePage = (page: any) => {
    handleFetchUserListApi(page, keyword);
  };

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
      handleFetchUserListApi(1, keyword);
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
    <Table
      columns={columns}
      dataSource={data}
      pagination={pagination}
      bordered={true}
    />
  );
}
