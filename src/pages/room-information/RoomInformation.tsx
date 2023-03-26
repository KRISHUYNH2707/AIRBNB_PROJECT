import {
  Image,
  Input,
  Space,
  Table,
  TablePaginationConfig,
  Tooltip,
} from "antd";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { RoomsDto } from "interfaces/room";
import React, { useEffect, useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { PathAdmin } from "enums";
import { RootDispatch, RootState } from "store/config";
import { fetchRoomListApiAction } from "store/reducers/roomReducer";

import { ColumnsType } from "antd/es/table";
import {
  FormOutlined,
  EditOutlined,
  CloseOutlined,
  CloseSquareOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

interface DataRooms extends RoomsDto {
  key: number;
}

interface DataType {
  key: string;
  name: string;
  borrow: number;
  repayment: number;
}

interface FixedDataType {
  key: React.Key;
  name: string;
  description: string;
}

export default function RoomInformation(): JSX.Element {
  const roomState = useSelector((state: RootState) => state.roomReducer);
  const dispatch = useDispatch<RootDispatch>();
  const navigate: NavigateFunction = useNavigate();

  const [, setLoading] = useContext(LoadingContext);

  // path

  const { ADMIN, ROOM, CREATE, UPDATE } = PathAdmin;

  // show tooltip
  const [arrow] = useState("Show");

  useEffect(() => {
    handleFetchRomListApi();
  }, []);

  const handleFetchRomListApi = async (
    page: number = 1,
    keyword: string = ""
  ) => {
    setLoading({ isLoading: true });
    await dispatch(fetchRoomListApiAction({ page, keyword }));
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

  const handleChangePage = (page: any) => {
    handleFetchRomListApi(page, "");
  };

  const renderActions = (id: number): JSX.Element[] => {
    const actions = [
      <Tooltip placement="top" key="edit" title={"Edit"} arrow={mergedArrow}>
        <EditOutlined
          className="update-icon"
          // onClick={() => navigate(`${ADMIN + ROOM + UPDATE + id}`)}
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
      <Tooltip
        placement="top"
        key="upload"
        title={"Upload"}
        arrow={mergedArrow}
      ></Tooltip>,
    ];
    return actions;
  };

  const fixedColumns: ColumnsType<RoomsDto> = [
    {
      title: "Name",
      fixed: "left",
      dataIndex: "tenPhong",

      align: "center",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      align: "center",
      key: "image",
      width: 650,
      render: (image: string) => (
        <Image
          src={image}
          style={{
            height: 300,
            width: 600,
            objectFit: "cover",
          }}
        />
      ),
    },

    {
      title: "Apartment",
      align: "center",
      key: "apartment",
      children: [
        {
          title: "Rooms",
          align: "center",
          key: "rooms",
          children: [
            {
              title: "Persons",
              dataIndex: "khach",
              align: "center",
              key: "persons",
              render: (value) => (
                <b
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  {value}
                </b>
              ),
            },
            {
              title: "Bedrooms",
              dataIndex: "phongNgu",
              align: "center",
              key: "Bedrooms",
              render: (value) => (
                <b
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  {value}
                </b>
              ),
            },

            {
              title: "Bathrooms",
              dataIndex: "phongTam",
              align: "center",
              key: "Bathrooms",
              render: (value) => (
                <b
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  {value}
                </b>
              ),
            },
          ],
        },
        {
          title: "Amenities",
          align: "center",
          key: "amenities",
          children: [
            {
              title: "Ironing board",
              dataIndex: "hoBoi",
              align: "center",
              key: "Ironing board",
              render: (value) =>
                value ? (
                  <>
                    <CheckSquareOutlined className="update-icon" />
                  </>
                ) : (
                  <>
                    <CloseSquareOutlined className="remove-icon" />
                  </>
                ),
            },
            {
              title: "Kitchen",
              dataIndex: "bep",
              align: "center",
              key: "Kitchen",
              render: (value) =>
                value ? (
                  <>
                    <CheckSquareOutlined className="update-icon" />
                  </>
                ) : (
                  <>
                    <CloseSquareOutlined className="remove-icon" />
                  </>
                ),
            },
            {
              title: "Parking",
              dataIndex: "doXe",
              align: "center",
              key: "Parking",
              render: (value) =>
                value ? (
                  <>
                    <CheckSquareOutlined className="update-icon" />
                  </>
                ) : (
                  <>
                    <CloseSquareOutlined className="remove-icon" />
                  </>
                ),
            },
            {
              title: "Washing machine",
              dataIndex: "mayGiat",
              align: "center",
              key: "Washing machine",
              render: (value) =>
                value ? (
                  <>
                    <CheckSquareOutlined className="update-icon" />
                  </>
                ) : (
                  <>
                    <CloseSquareOutlined className="remove-icon" />
                  </>
                ),
            },
            {
              title: "Iron",
              dataIndex: "banLa",
              align: "center",
              key: "Iron",
              render: (value) =>
                value ? (
                  <>
                    <CheckSquareOutlined className="update-icon" />
                  </>
                ) : (
                  <>
                    <CloseSquareOutlined className="remove-icon" />
                  </>
                ),
            },
            {
              title: "Wifi",
              dataIndex: "wifi",
              align: "center",
              key: "wifi",
              render: (value) =>
                value ? (
                  <>
                    <CheckSquareOutlined className="update-icon" />
                  </>
                ) : (
                  <>
                    <CloseSquareOutlined className="remove-icon" />
                  </>
                ),
            },
            {
              title: "TV",
              dataIndex: "tivi",
              align: "center",
              key: "TV",
              render: (value) =>
                value ? (
                  <>
                    <CheckSquareOutlined className="update-icon" />
                  </>
                ) : (
                  <>
                    <CloseSquareOutlined className="remove-icon" />
                  </>
                ),
            },

            {
              title: "Air conditioning",
              dataIndex: "dieuHoa",
              align: "center",
              key: "Air conditioning",
              render: (value) =>
                value ? (
                  <>
                    <CheckSquareOutlined className="update-icon" />
                  </>
                ) : (
                  <>
                    <CloseSquareOutlined className="remove-icon" />
                  </>
                ),
            },
            {
              title: "Ironing board",
              dataIndex: "banUi",
              align: "center",
              key: "Ironing board",
              render: (value) =>
                value ? (
                  <>
                    <CheckSquareOutlined className="update-icon" />
                  </>
                ) : (
                  <>
                    <CloseSquareOutlined className="remove-icon" />
                  </>
                ),
            },
          ],
        },
      ],
    },
    {
      title: "Description",
      dataIndex: "moTa",
      align: "center",
      key: "description",
      width: 700,
    },
    {
      title: "Price ",
      dataIndex: "giaTien",
      fixed: "right",

      width: 100,
      align: "center",
      key: "price",
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      fixed: "right",
      width: 150,

      render: (room: DataRooms) => (
        <Space size="middle">{renderActions(room.id)}</Space>
      ),
    },
  ];

  const pagination: TablePaginationConfig = {
    pageSize: roomState.roomList.pageSize,
    current: roomState.roomList.pageIndex,
    onChange: (page) => handleChangePage(page),
    pageSizeOptions: ["" + roomState.roomList.pageSize],
    total: roomState.roomList.totalRow,
    showQuickJumper: true,
  };

  const fixedData: DataRooms[] = roomState.roomList.data.map(
    (ele: RoomsDto, idx: number) => {
      return {
        ...ele,
        key: idx,
      };
    }
  );

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
          onClick={() => navigate(`${ADMIN + ROOM + CREATE}`)}
        />
      </Tooltip>
      {/* <Table columns={columns} dataSource={data} pagination={pagination} />
       */}

      <Table
        size="small"
        columns={fixedColumns}
        dataSource={fixedData}
        pagination={pagination}
        scroll={{ x: 3000 }}
        bordered={true}
        showSorterTooltip={true}
        rowClassName={"border"}
      />
    </div>
  );
}
