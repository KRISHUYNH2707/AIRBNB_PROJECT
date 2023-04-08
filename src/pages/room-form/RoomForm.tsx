import { Image, Modal, Switch } from "antd";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Header } from "antd/es/layout/layout";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { PathAdmin } from "enums";
import { formItemLayout, tailFormItemLayout } from "hooks/useMyForm";
import { LocationsDto } from "interfaces/location";
import { RoomsDto } from "interfaces/room";
import React, { useState, useContext, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { fetchLocationListApi } from "services/location";
import { RootDispatch, RootState } from "store/config";
import { CloudUploadOutlined } from "@ant-design/icons";

import {
  fetchCreateRoomApiAction,
  fetchGetRoomApiAction,
  fetchUpdateRoomApiAction,
  fetchUploadImageApiAction,
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

  const [file, setFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>("");

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
    await dispatch(fetchGetRoomApiAction(roomId));
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

  const handleUploadImage = async (file: File | undefined) => {
    if (file) {
      const formData = new FormData() as any;
      formData.append("formFile", file, file.name);
      setLoading({ isLoading: true });
      const result = await dispatch(
        fetchUploadImageApiAction({
          id: id,
          data: formData,
        })
      );
      setLoading({ isLoading: false });
      if (result.meta.requestStatus === "fulfilled") {
        navigate(`${PathAdmin.ADMIN + PathAdmin.ROOM}`);
      }
    }
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
    const reader = new FileReader();
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setImagePreview(event.target.result);
        }
      };
    }
  };

  const handleConfirmUpload = (file: File | undefined): void => {
    Modal.info({
      title:
        "Are you want to upload an image for the location you have created?",
      okText: "Done",
      cancelText: "None",
      onOk: () => {
        handleUploadImage(file);
      },
    });
  };

  return (
    <div className="row">
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
        className="mx-auto form-main col-8"
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

      {roomId && (
        <div
          className="col-4 form-main"
          style={{
            height: 800,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Header
            className="mb-4 title-admin"
            style={{
              width: "100%",
            }}
          >
            <h1> Upload Image</h1>
          </Header>
          <Image
            src={
              imagePreview !== ""
                ? imagePreview
                : hinhAnh === "string" || hinhAnh === ""
                ? "https://whatdreammeans.com/wp-content/uploads/2021/09/what-does-your-address-mean.png"
                : hinhAnh
            }
            width={400}
          />
          <Input type="file" onChange={handleFile} />
          {imagePreview !== "" && (
            <Button
              type="primary"
              icon={
                <CloudUploadOutlined
                  style={{
                    fontSize: 24,
                  }}
                />
              }
              size="large"
              style={{
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => handleConfirmUpload(file)}
            >
              Upload
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
