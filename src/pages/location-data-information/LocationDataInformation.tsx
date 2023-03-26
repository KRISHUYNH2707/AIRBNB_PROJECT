import { Image, TablePaginationConfig, Tooltip } from "antd";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { Content } from "interfaces/searchContent";
import { LocationsDto } from "interfaces/location";
import React, { useEffect, useContext, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootDispatch, RootState } from "store/config";
import {
  fetchLocationListApiAction,
  locationActions,
} from "store/reducers/locationReducer";
import { CloseOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PathAdmin } from "enums";

interface DataLocations extends LocationsDto {
  key: number;
}

const { ADMIN, LOCATION, CREATE, UPDATE } = PathAdmin;

export default function LocationDataInformation(): JSX.Element {
  const locationState: Content<LocationsDto> = useSelector(
    (state: RootState) => state.locationReducer.locationList
  );

  const [arrow] = useState("Show");

  const dispatch = useDispatch<RootDispatch>();

  const navigate: NavigateFunction = useNavigate();

  const [, setLoading] = useContext(LoadingContext);

  useEffect(() => {
    handleFetchLocationListApi();
  }, []);
  // const params = useParams();

  const handleFetchLocationListApi = async (
    page: number = 1,
    keyword: string = ""
  ) => {
    setLoading({ isLoading: true });
    await dispatch(fetchLocationListApiAction({ page, keyword }));
    setLoading({ isLoading: false });
  };

  const data: DataLocations[] = locationState.data.map(
    (ele: LocationsDto, idx: number) => {
      return {
        ...ele,
        key: idx,
      };
    }
  );

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

  const renderActions = (location: LocationsDto): JSX.Element[] => {
    const actions = [
      <Tooltip placement="top" key="edit" title={"Edit"} arrow={mergedArrow}>
        <EditOutlined
          className="update-icon"
          onClick={() => {
            dispatch(locationActions.updateLocationInfo(location));
            navigate(`${ADMIN + LOCATION + UPDATE + location.id}`);
          }}
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
          // onClick={() => handleConfirmRemove(id)}
        />
      </Tooltip>,
    ];
    return actions;
  };

  const columns: ColumnsType<DataLocations> = [
    {
      title: "Country Name",
      dataIndex: "quocGia",
      key: "country",
    },
    {
      title: "Province Name",
      dataIndex: "tinhThanh",
      key: "province",
    },
    {
      title: "Location Name",
      dataIndex: "tenViTri",
      key: "location",
    },
    {
      title: "Image",
      key: "hinhAnh",
      dataIndex: "hinhAnh",
      render: (text) => (
        <Image
          src={`${text}`}
          style={{
            height: 150,
            width: 150,
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (location: LocationsDto) => (
        <Space size="middle">{renderActions(location)}</Space>
      ),
    },
  ];

  const handleChangePage = (page: any) => {
    handleFetchLocationListApi(page, "");
  };

  const pagination: TablePaginationConfig = {
    pageSize: locationState.pageSize,
    current: locationState.pageIndex,
    onChange: (page) => handleChangePage(page),
    pageSizeOptions: ["" + locationState.pageSize],
    total: locationState.totalRow,
  };

  return (
    <div>
      <Tooltip
        key="create"
        placement="top"
        title={"Create"}
        arrow={mergedArrow}
      >
        <FormOutlined
          className="add-icon mb-2"
          onClick={() => navigate(`${ADMIN + LOCATION + CREATE}`)}
        />
      </Tooltip>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        bordered={true}
      />
    </div>
  );
}
