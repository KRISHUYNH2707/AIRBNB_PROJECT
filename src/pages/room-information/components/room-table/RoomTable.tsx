import React, { useState, useMemo } from "react";
import { Image, Modal, Space, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "store/config";
import { RoomsDto } from "interfaces/room";
import {
  fetchDeleteRoomApi,
  fetchRoomListApiAction,
} from "store/reducers/roomReducer";
import {
  EditOutlined,
  CloseOutlined,
  CloseSquareOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { PathAdmin } from "enums";
interface DataRooms extends RoomsDto {
  key: number;
}

interface Props {
  setLoading: any;
  handleFetchRomListApi: (id?: number, keyword?: string) => Promise<void>;
  keyword: string;
}

export default function RoomTable(props: Props): JSX.Element {
  const { handleFetchRomListApi, keyword, setLoading } = props;
  const roomState = useSelector((state: RootState) => state.roomReducer);
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();

  const { ADMIN, ROOM, UPDATE } = PathAdmin;

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

  const handleChangePage = (page: number) => {
    handleFetchRomListApi(page, keyword);
  };

  const handleRemove = async (id: number) => {
    setLoading({ isLoading: true });
    const result = await dispatch(fetchDeleteRoomApi(id));
    setLoading({ isLoading: false });

    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(
        fetchRoomListApiAction({
          page: 1,
          keyword,
        })
      );
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

  const renderActions = (id: number): JSX.Element[] => {
    const actions = [
      <Tooltip placement="top" key="edit" title={"Edit"} arrow={mergedArrow}>
        <EditOutlined
          className="update-icon"
          onClick={() => navigate(`${ADMIN + ROOM + UPDATE + id}`)}
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
    ];
    return actions;
  };

  const numberTable = (value: number) => (
    <b
      style={{
        fontSize: "1.5rem",
      }}
    >
      {value}
    </b>
  );

  const checked = (value: boolean) => {
    if (value) {
      return <CheckSquareOutlined className="update-icon" />;
    }

    return <CloseSquareOutlined className="remove-icon" />;
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
              render: (value) => numberTable(value),
            },
            {
              title: "Beds",
              dataIndex: "phongNgu",
              align: "center",
              key: "Beds",
              render: (value) => numberTable(value),
            },
            {
              title: "Bedrooms",
              dataIndex: "giuong",
              align: "center",
              key: "Bedrooms",
              render: (value) => numberTable(value),
            },

            {
              title: "Bathrooms",
              dataIndex: "phongTam",
              align: "center",
              key: "Bathrooms",
              render: (value) => numberTable(value),
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
              render: (value) => checked(value),
            },
            {
              title: "Kitchen",
              dataIndex: "bep",
              align: "center",
              key: "Kitchen",
              render: (value) => checked(value),
            },
            {
              title: "Parking",
              dataIndex: "doXe",
              align: "center",
              key: "Parking",
              render: (value) => checked(value),
            },
            {
              title: "Washing machine",
              dataIndex: "mayGiat",
              align: "center",
              key: "Washing machine",
              render: (value) => checked(value),
            },
            {
              title: "Iron",
              dataIndex: "banLa",
              align: "center",
              key: "Iron",
              render: (value) => checked(value),
            },
            {
              title: "Wifi",
              dataIndex: "wifi",
              align: "center",
              key: "wifi",
              render: (value) => checked(value),
            },
            {
              title: "TV",
              dataIndex: "tivi",
              align: "center",
              key: "TV",
              render: (value) => checked(value),
            },

            {
              title: "Air conditioning",
              dataIndex: "dieuHoa",
              align: "center",
              key: "Air conditioning",
              render: (value) => checked(value),
            },
            {
              title: "Ironing board",
              dataIndex: "banUi",
              align: "center",
              key: "Ironing board",
              render: (value) => checked(value),
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
      width: 500,
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
    <Table
      size="small"
      columns={fixedColumns}
      dataSource={fixedData}
      pagination={pagination}
      scroll={{ x: 3000 }}
      bordered={true}
      showSorterTooltip={true}
      rowClassName={"border"}
      style={{
        overflow: "hidden",
      }}
    />
  );
}
