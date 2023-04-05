import React, { useEffect, useContext, useMemo, useState } from "react";
import { Button, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "store/config";
import { Users } from "interfaces/user";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { fetchUserListApiAction } from "store/reducers/userReducer";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { PathAdmin } from "enums";
import { FormOutlined } from "@ant-design/icons";
import "./index.scss";
import { Content } from "interfaces/searchContent";
import SearchUser from "./components/user-search/SearchUser";
import UserTable from "./components/user-table/UserTable";

export default function UserManagement(): JSX.Element {
  const userList: Content<Users> = useSelector(
    (state: RootState) => state.userReducer.userList
  );

  const dispatch = useDispatch<RootDispatch>();

  const navigate: NavigateFunction = useNavigate();

  const [keyword, setKeyword] = useState<string>("");

  const [, setLoading] = useContext(LoadingContext);

  // path
  const { ADMIN, USER, CREATE } = PathAdmin;

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

  useEffect(() => {
    handleFetchUserListApi(userList.pageIndex, keyword);
  }, [, keyword]);

  const handleFetchUserListApi = async (
    page: number = 1,
    keyword: string = ""
  ) => {
    setLoading({ isLoading: true });
    await dispatch(fetchUserListApiAction({ page, keyword }));
    setLoading({ isLoading: false });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <SearchUser key="search" setKeyword={setKeyword} />

        <Tooltip
          key="create"
          placement="top"
          title={"Create"}
          arrow={mergedArrow}
        >
          <Button
            size="large"
            className="mx-4 my-3"
            onClick={() => navigate(`${ADMIN + USER + CREATE}`)}
            type="primary"
            icon={<FormOutlined />}
          >
            {" "}
            Add
          </Button>
        </Tooltip>
      </div>
      <UserTable
        handleFetchUserListApi={handleFetchUserListApi}
        keyword={keyword}
        setLoading={setLoading}
        userList={userList}
      />
    </>
  );
}
