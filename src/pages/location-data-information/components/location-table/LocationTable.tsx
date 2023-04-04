import { Table, Modal, notification, Tooltip, Space, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { Content } from "interfaces/searchContent";
import { LocationsDto } from "interfaces/location";
import { RootDispatch, RootState } from "store/config";
import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  fetchDeleteLocationApiAction,
  locationActions,
} from "store/reducers/locationReducer";
import { PathAdmin } from "enums";

interface Props {
  keyword: string;
  setLoading: any;
  handleFetchLocationListApi: (id?: number, keyword?: string) => Promise<void>;
}

interface DataLocations extends LocationsDto {
  key: number;
}

export default function LocationTable(props: Props) {
  const { handleFetchLocationListApi, keyword, setLoading } = props;
  const locationState: Content<LocationsDto> = useSelector(
    (state: RootState) => state.locationReducer.locationList
  );

  const dispatch = useDispatch<RootDispatch>();

  const { ADMIN, LOCATION, UPDATE } = PathAdmin;

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

  const navigate = useNavigate();

  const handleRemove = async (id: number) => {
    setLoading({ isLoading: true });
    const result = await dispatch(fetchDeleteLocationApiAction(id));
    setLoading({ isLoading: false });

    if (result.meta.requestStatus === "fulfilled") {
      notification.success({
        message: "Delete successfully !",
      });
      handleFetchLocationListApi(1, keyword);
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
          onClick={() => handleConfirmRemove(location.id)}
        />
      </Tooltip>,
    ];
    return actions;
  };

  const data: DataLocations[] = locationState.data.map(
    (ele: LocationsDto, idx: number) => {
      return {
        ...ele,
        key: idx,
      };
    }
  );

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
    handleFetchLocationListApi(page, keyword);
  };

  const pagination: TablePaginationConfig = {
    pageSize: locationState.pageSize,
    current: locationState.pageIndex,
    onChange: (page) => handleChangePage(page),
    pageSizeOptions: ["" + locationState.pageSize],
    total: locationState.totalRow,
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
