import { Button, Tooltip } from "antd";
import { LoadingContext } from "contexts/loading/LoadingContext";

import React, { useEffect, useContext, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootDispatch } from "store/config";
import { fetchLocationSearchListApiAction } from "store/reducers/locationReducer";
import { FormOutlined } from "@ant-design/icons";

import { PathAdmin } from "enums";
import LocationSearch from "./components/location-search/LocationSearch";
import LocationTable from "./components/location-table/LocationTable";

const { ADMIN, LOCATION, CREATE } = PathAdmin;

export default function LocationDataInformation(): JSX.Element {
  const [arrow] = useState("Show");

  const dispatch = useDispatch<RootDispatch>();

  const navigate: NavigateFunction = useNavigate();

  const [, setLoading] = useContext(LoadingContext);

  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    handleFetchLocationListApi(1, keyword);
  }, [, keyword]);

  const handleFetchLocationListApi = async (
    page: number = 1,
    keyword: string = ""
  ) => {
    setLoading({ isLoading: true });
    await dispatch(
      fetchLocationSearchListApiAction({ page, size: 0, keyword })
    );
    setLoading({ isLoading: false });
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <LocationSearch key="search" setKeyword={setKeyword} />
        <Tooltip
          key="create"
          placement="top"
          title={"Create"}
          arrow={mergedArrow}
        >
          <Button
            size="large"
            className="mx-4 my-3"
            onClick={() => navigate(`${ADMIN + LOCATION + CREATE}`)}
            type="primary"
            icon={<FormOutlined />}
          >
            {" "}
            Add
          </Button>
        </Tooltip>
      </div>
      <LocationTable
        handleFetchLocationListApi={handleFetchLocationListApi}
        keyword={keyword}
        setLoading={setLoading}
        key={"location-table"}
      />
    </div>
  );
}
