import { CascaderProps, Switch } from "antd";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { Header } from "antd/es/layout/layout";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { PathAdmin } from "enums";
import { formItemLayout, tailFormItemLayout } from "hooks/useMyForm";
import { LocationsDto } from "interfaces/location";
import { RoomsDto } from "interfaces/room";
import { min } from "moment";
import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { fetchLocationListApi } from "services/location";
import { RootDispatch, RootState } from "store/config";
import {
  fetchCreateRoomApiAction,
  fetchGetRoomApi,
  fetchUpdateRoomApiAction,
} from "store/reducers/roomReducer";

interface RoomData {
  key: string;
  label: string;
}

export default function RoomForm(): JSX.Element {
  const { roomId } = useParams();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [, setLoading] = useContext(LoadingContext);
  const [location, setLocation] = useState<LocationsDto[]>();
  const roomInfoState = useSelector(
    (state: RootState) => state.roomReducer.roomInfo
  );
  const dispatch = useDispatch<RootDispatch>();
  const navigate: NavigateFunction = useNavigate();

  //path

  useEffect(() => {
    handleFetchLocationListApi();
  }, []);
  useEffect(() => {
    roomId && handleGetRoomApi(roomId);
  }, []);

  const {
    id,
    tenPhong,
    hinhAnh,
    khach,
    phongNgu,
    giuong,
    phongTam,
    hoBoi,
    bep,
    doXe,
    mayGiat,
    banLa,
    wifi,
    tivi,
    dieuHoa,
    banUi,
    moTa,
    giaTien,
    maViTri,
  } = roomInfoState;
  console.log(roomInfoState);

  useEffect(() => {
    roomId &&
      form.setFieldsValue({
        id,
        tenPhong,
        hinhAnh,
        khach,
        phongNgu,
        giuong,
        phongTam,
        hoBoi,
        bep,
        doXe,
        mayGiat,
        banLa,
        wifi,
        tivi,
        dieuHoa,
        banUi,
        moTa,
        giaTien,
        maViTri,
      });
  }, [roomInfoState]);

  const handleGetRoomApi = async (roomId: string) => {
    setLoading({ isLoading: true });
    await dispatch(fetchGetRoomApi(roomId));
    setLoading({ isLoading: false });
  };

  const handleFetchLocationListApi = async () => {
    setLoading({ isLoading: true });
    const result = await fetchLocationListApi();

    setLocation(result.data.content);
    setLoading({ isLoading: false });
  };

  const renderLocationList = (): JSX.Element[] | undefined => {
    if (location) {
      return location.map((location) => {
        return (
          <Option
            key={location.id}
            value={location.id}
          >{`${location.quocGia},${location.tinhThanh},${location.tenViTri} `}</Option>
        );
      });
    }
  };

  const roomList: RoomData[] = [
    { key: "khach", label: "Persons" },
    { key: "phongNgu", label: "Bedrooms" },
    { key: "giuong", label: "Beds" },
    { key: "phongTam", label: "Bathrooms" },
  ];

  const renderRoomsInput = (arr: RoomData[]) => {
    return arr.map((room) => {
      return (
        <Col span={12} key={room.key}>
          <Form.Item
            name={room.key}
            label={room.label}
            rules={[
              {
                required: true,
                message: `Please input your ${room.label}!`,
              },
              {
                type: "number",
                min: 1,
                max: room.key === "khach" ? 50 : 20,
                message: `${room.label} must between 1 and ${
                  room.key === "khach" ? 50 : 20
                }.`,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
      );
    });
  };

  const amenitiesList: RoomData[] = [
    { key: "hoBoi", label: "Ironing board" },
    { key: "bep", label: "Kitchen" },
    { key: "doXe", label: "Parking" },
    { key: "mayGiat", label: "Washing machine" },
    { key: "banLa", label: "Iron" },
    { key: "wifi", label: "Wifi" },
    { key: "tivi", label: "tivi" },
    { key: "dieuHoa", label: "Air conditioning" },
    { key: "banUi", label: "Ironing board" },
  ];

  const renderAmenitiesInput = (arr: RoomData[]) => {
    return arr.map((amenities) => {
      return (
        <Col
          span={12}
          style={{
            marginBottom: 12,
          }}
          key={amenities.key}
        >
          <Form.Item
            name={amenities.key}
            label={`${"- " + amenities.label}`}
            style={{
              textAlign: "right",
              paddingLeft: 15,
              paddingRight: 85,
            }}
            valuePropName="checked"
          >
            <Switch defaultChecked={false} />
          </Form.Item>
        </Col>
      );
    });
  };

  const onFinish = async (values: RoomsDto) => {
    const {
      tenPhong,
      khach,
      phongNgu,
      giuong,
      phongTam,
      hoBoi,
      bep,
      doXe,
      mayGiat,
      banLa,
      wifi,
      tivi,
      dieuHoa,
      banUi,
      moTa,
      giaTien,
      maViTri,
    } = values;

    const data = {
      id: id ? id : 0,
      tenPhong,
      hinhAnh: hinhAnh ? hinhAnh : "",
      khach,
      phongNgu,
      giuong,
      phongTam,
      hoBoi,
      bep,
      doXe,
      mayGiat,
      banLa,
      wifi,
      tivi,
      dieuHoa,
      banUi,
      moTa,
      giaTien,
      maViTri,
    };
    console.log("Received values of form: ", data);

    if (roomId) {
      setLoading({ isLoading: true });
      const result = await dispatch(fetchUpdateRoomApiAction({ id, data }));
      setLoading({ isLoading: false });
      if (result.meta.requestStatus === "fulfilled") {
        navigate(`${PathAdmin.ADMIN + PathAdmin.ROOM}`);
      }
    } else {
      setLoading({ isLoading: true });
      const result = await dispatch(fetchCreateRoomApiAction(data));
      setLoading({ isLoading: false });
      if (result.meta.requestStatus === "fulfilled") {
        navigate(`${PathAdmin.ADMIN + PathAdmin.ROOM}`);
      }
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 800 }}
      initialValues={{
        hoBoi: false,
        bep: false,
        doXe: false,
        mayGiat: false,
        banLa: false,
        wifi: false,
        tivi: false,
        dieuHoa: false,
        banUi: false,
      }}
      scrollToFirstError
      className="mx-auto form-main"
    >
      <Header className="mb-4 title-admin">
        <h1> {roomId ? "Update Room Info" : "Add Room"} </h1>
      </Header>
      <div className="p-5">
        <Form.Item
          name="maViTri"
          label="Location"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select placeholder="Please select a location">
            {renderLocationList()}
          </Select>
        </Form.Item>

        <Form.Item
          name="tenPhong"
          label="Room Name"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="moTa"
          label="Description"
          rules={[{ required: true, message: "Please input Intro" }]}
        >
          <Input.TextArea showCount maxLength={500} />
        </Form.Item>

        <Form.Item label="Rooms">
          <Row gutter={8}>{renderRoomsInput(roomList)}</Row>
        </Form.Item>

        <Form.Item label="Amenities">
          <Row>{renderAmenitiesInput(amenitiesList)}</Row>
        </Form.Item>

        <Form.Item
          name="giaTien"
          label="Price"
          rules={[
            { required: true, message: "Please input Price" },
            {
              type: "number",
              min: 10,
              max: 1000,
              message: "Price must be between 10 and 1000",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {!roomId ? "Add Room" : "Update Room"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
