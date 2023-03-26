import { UploadImageLocation } from "./../interfaces/location";
import { Content } from "interfaces/searchContent";
import { AxiosPromise } from "axios";
import { axiosRequest } from "configs/axios.config";
import { LocationsDto } from "interfaces/location";
import { Request } from "enums";

// Request : "string"
const { DELETE, GET, POST, PUT } = Request;

export const fetchLocationListApi = (
  page: number,
  pageSize: number,
  keyword: string = ""
): AxiosPromise<HttpResponse<Content<LocationsDto>>> => {
  return axiosRequest({
    url: `/vi-tri/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}${
      keyword !== "" ? `keyword=${keyword}` : ""
    }`,
    method: GET,
  });
};
export const createLocationApi = (
  information: LocationsDto
): AxiosPromise<HttpResponse<Content<LocationsDto>>> => {
  return axiosRequest({
    url: "/vi-tri",
    method: POST,
    data: information,
  });
};

export const uploadLocationApi = (
  information: LocationsDto
): AxiosPromise<HttpResponse<LocationsDto>> => {
  return axiosRequest({
    url: ``,
    method: POST,
    data: information,
  });
};

export const uploadImageLocationApi = (
  locationId: number,
  information: UploadImageLocation
): AxiosPromise<HttpResponse<LocationsDto>> => {
  console.log("information", information);
  for (const value of information.formFile.values() as any) {
    console.log("value12312", value);
  }
  const content = {
    maViTri: "1600",
    formFile: information.formFile,
  };
  // dạ đây nè anh
  return axiosRequest({
    url: "/vi-tri/upload-hinh-vitri?maViTri=1600",
    method: POST,
    data: information.formFile,
  });
};
