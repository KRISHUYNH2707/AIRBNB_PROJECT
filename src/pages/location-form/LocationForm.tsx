import { LoadingContext } from "contexts/loading/LoadingContext";
import React, { useEffect, useContext, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addressActions,
  fetchDistrictsListApiAction,
  fetchProvincesListApiAction,
} from "store/reducers/addressReducer";
import { RootDispatch, RootState } from "store/config";
import { Button, Form, Image, Input, Modal, Select } from "antd";
import { formItemLayout, tailFormItemLayout } from "hooks/useMyForm";
import { DistrictsDto, ProvincesDto } from "interfaces/address";
import { LocationsDto } from "interfaces/location";
import {
  fetchCreateLocationApiAction,
  fetchUpdateLocationApiAction,
  fetchUploadImageLocationApiAction,
} from "store/reducers/locationReducer";
import { CloudUploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { PathAdmin } from "enums";
import { Header } from "antd/es/layout/layout";

export default function LocationForm(): JSX.Element {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>("");
  const addressState = useSelector((state: RootState) => state.addressReducer);
  const locationState = useSelector(
    (state: RootState) => state.locationReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<RootDispatch>();
  const [, setLoading] = useContext(LoadingContext);

  const { locationId } = useParams();

  const { id, quocGia, tenViTri, tinhThanh, hinhAnh } =
    locationState.locationInfo;

  const { ADMIN, LOCATION } = PathAdmin;

  useEffect(() => {
    locationId &&
      form.setFieldsValue({
        quocGia,
        tenViTri,
        tinhThanh,
      });
  }, [locationState]);

  useEffect(() => {
    handleFetchAddressListApi();
    dispatch(addressActions.setProvinceCode(1));
  }, []);

  const handleFinish = async (values: LocationsDto) => {
    const { quocGia, tenViTri, tinhThanh } = values;
    const data = {
      id,
      quocGia,
      tenViTri,
      tinhThanh,
      hinhAnh: (locationId && hinhAnh) || "",
    };
    if (locationId) {
      setLoading({ isLoading: true });
      await dispatch(fetchUpdateLocationApiAction({ id, data: data }));
      setLoading({ isLoading: false });
      navigate(`${ADMIN + LOCATION}`);
    } else {
      const provinceTest: ProvincesDto[] = addressState.provincesList.filter(
        (province) => {
          return province.name === tinhThanh;
        }
      );

      const validateAddress: DistrictsDto[] = addressState.districtsList.filter(
        (district) => {
          return district.name === tenViTri;
        }
      );

      if (quocGia === "" || tenViTri === "" || tinhThanh === "") {
        Modal.error({
          title:
            "You should double check to make sure there are no empty field !",
        });
      } else {
        if (provinceTest[0].code === validateAddress[0].province_code) {
          setLoading({ isLoading: true });
          await dispatch(fetchCreateLocationApiAction(data));
          setLoading({ isLoading: false });
        } else {
          Modal.error({
            title: "Please select the province again!",
          });
        }
      }
    }
  };

  const handleConfirmSubmit = (data: LocationsDto): void => {
    Modal.confirm({
      title: locationId
        ? "Do you want to update the location that you have created?"
        : `Do you want to create this location?`,
      okText: "Done",
      cancelText: "None",
      onOk: () => handleFinish(data),
    });
  };

  const handleFetchAddressListApi = async () => {
    setLoading({ isLoading: true });
    await dispatch(fetchProvincesListApiAction());
    setLoading({ isLoading: false });
  };

  const renderProvinceList = (): JSX.Element[] => {
    return addressState?.provincesList?.map((province) => {
      return (
        <Select.Option key={province.code} value={`${province.name}`}>
          {province.name}
        </Select.Option>
      );
    });
  };
  const renderDistrictsList = (): JSX.Element[] => {
    const result = addressState?.districtsList?.filter((districts) => {
      return districts.province_code === addressState.provinceCode;
    });
    return result.map((districts) => {
      return (
        <Select.Option key={districts.code} value={`${districts.name}`}>
          {districts.name}
        </Select.Option>
      );
    });
  };

  const handleChange = async (value: string): Promise<void> => {
    const province: ProvincesDto[] = await addressState?.provincesList?.filter(
      (province) => {
        return province.name === value;
      }
    );
    setLoading({ isLoading: true });
    await dispatch(addressActions.setProvinceCode(province[0]?.code));
    await dispatch(fetchDistrictsListApiAction(province[0]?.code));
    setLoading({ isLoading: false });
  };

  const handleUploadImage = async (file: File | undefined) => {
    if (file) {
      const formData = new FormData() as any;
      formData.append("formFile", file, file.name);
      setLoading({ isLoading: true });
      const result = await dispatch(
        fetchUploadImageLocationApiAction({
          locationId: id,
          data: formData,
        })
      );
      setLoading({ isLoading: false });
      if (result.meta.requestStatus === "fulfilled") {
        navigate(`${ADMIN + LOCATION}`);
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
        name="register"
        onFinish={handleConfirmSubmit}
        initialValues={{
          quocGia: "Việt Nam",
          tinhThanh: "Thành phố Hồ Chí Minh",
        }}
        style={{ maxWidth: 600, margin: "0 auto" }}
        scrollToFirstError
        className="col-6 form-main"
      >
        <Header className="mb-4 title-admin">
          <h1>{locationId ? "Update Location" : "Add Location"}</h1>
        </Header>
        <div className="p-2">
          <Form.Item
            name="quocGia"
            label="Country"
            rules={[
              {
                required: true,
                message: "Please select your country!",
              },
            ]}
          >
            <Select>
              <Select.Option value="Việt Nam">Việt Nam</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="tinhThanh"
            label="Provinces"
            rules={[
              {
                required: true,
                message: "Please select your province!",
              },
            ]}
          >
            <Select onChange={handleChange}>{renderProvinceList()}</Select>
          </Form.Item>
          <Form.Item
            name="tenViTri"
            label="Districts"
            rules={[
              {
                required: true,
                message: "Please select your districts !",
              },
            ]}
          >
            <Select>{renderDistrictsList()}</Select>
          </Form.Item>

          {imagePreview ? (
            <></>
          ) : (
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                {locationId ? "Upload Location" : "Add Location"}
              </Button>
            </Form.Item>
          )}
        </div>
      </Form>{" "}
      {locationId && (
        <div
          className="col-6 form-main"
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
          <Input type="file" onChange={(event) => handleFile(event)} />
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
