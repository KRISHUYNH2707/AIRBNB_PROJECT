import { Tooltip } from "antd";
import { LoadingContext } from "contexts/loading/LoadingContext";

import React, { useEffect, useContext, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { PathAdmin } from "enums";
import { RootDispatch } from "store/config";
import { fetchRoomListApiAction } from "store/reducers/roomReducer";

import { FormOutlined } from "@ant-design/icons";
import RoomSearch from "./components/room-search/RoomSearch";
import RoomTable from "./components/room-table/RoomTable";

export default function RoomInformation(): JSX.Element {
  const dispatch = useDispatch<RootDispatch>();
  const navigate: NavigateFunction = useNavigate();
  const [keyword, setKeyword] = useState<string>("");

  const [, setLoading] = useContext(LoadingContext);

  // path

  const { ADMIN, ROOM, CREATE } = PathAdmin;

  // show tooltip
  const [arrow] = useState("Show");
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
    handleFetchRomListApi(1, keyword);
  }, [, keyword]);

  const handleFetchRomListApi = async (
    page: number = 1,
    keyword: string = ""
  ) => {
    setLoading({ isLoading: true });
    await dispatch(fetchRoomListApiAction({ page, keyword }));
    setLoading({ isLoading: false });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <RoomSearch key="search" setKeyword={setKeyword} />
        <Tooltip
          key="create"
          placement="top"
          title={"Create"}
          arrow={mergedArrow}
        >
          <span
            className="add-icon mx-4 my-3"
            onClick={() => navigate(`${ADMIN + ROOM + CREATE}`)}
          >
            <FormOutlined />
            <span className="ml-4">Add</span>
          </span>
        </Tooltip>
      </div>
      <RoomTable
        handleFetchRomListApi={handleFetchRomListApi}
        keyword={keyword}
        setLoading={setLoading}
        key={"room-table"}
      />
    </div>
  );
}
