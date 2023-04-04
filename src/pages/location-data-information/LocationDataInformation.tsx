import { Tooltip } from "antd";
import { LoadingContext } from "contexts/loading/LoadingContext";

import React, { useEffect, useContext, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootDispatch, RootState } from "store/config";
import { fetchLocationSearchListApiAction } from "store/reducers/locationReducer";
import { FormOutlined } from "@ant-design/icons";

import { PathAdmin } from "enums";
import LocationSearch from "./components/location-search/LocationSearch";
import LocationTable from "./components/location-table/LocationTable";

const { ADMIN, LOCATION, CREATE, UPDATE } = PathAdmin;

export default function LocationDataInformation(): JSX.Element {
  const [arrow] = useState("Show");

  const locationState = useSelector(
    (state: RootState) => state.locationReducer.locationInfo
  );

  console.log(locationState);

  const dispatch = useDispatch<RootDispatch>();

  const navigate: NavigateFunction = useNavigate();

  const [, setLoading] = useContext(LoadingContext);

  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    handleFetchLocationListApi(1, keyword);
  }, [, keyword]);
  // const params = useParams();

  const handleFetchLocationListApi = async (
    page: number = 1,
    keyword: string = ""
  ) => {
    setLoading({ isLoading: true });
    await dispatch(fetchLocationSearchListApiAction({ page, keyword }));
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
          <span
            className="add-icon mx-4 my-3"
            onClick={() => navigate(`${ADMIN + LOCATION + CREATE}`)}
          >
            <FormOutlined />
            <span className="ml-4">Add</span>
          </span>
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
