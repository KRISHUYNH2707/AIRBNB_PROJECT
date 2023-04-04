import { UploadImageLocation } from "./../interfaces/location";
import { Content } from "interfaces/searchContent";
import { AxiosPromise } from "axios";
import { axiosRequest } from "configs/axios.config";
import { LocationsDto } from "interfaces/location";
import { Request } from "enums";

// Request : "string"
const { DELETE, GET, POST, PUT } = Request;

export const fetchLocationListApi = (): AxiosPromise<
  HttpResponse<LocationsDto[]>
> => {
  // dạ
  return axiosRequest({
    url: `/vi-tri`,
    method: GET,
  });
};

export const fetchLocationSearchListApi = (
  page: number = 1,
  pageSize: number = 12,
  keyword: string = ""
): AxiosPromise<HttpResponse<Content<LocationsDto>>> => {
  return axiosRequest({
    url: `/vi-tri/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}${
      keyword !== "" ? `&keyword=${keyword}` : ""
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

export const deleteLocationApi = (
  locationId: number
): AxiosPromise<HttpResponse<null>> => {
  return axiosRequest({
    url: `/vi-tri/${locationId}`,
    method: DELETE,
  });
};

export const updateLocationApi = (
  locationId: number,
  information: LocationsDto
): AxiosPromise<HttpResponse<LocationsDto>> => {
  return axiosRequest({
    url: `/vi-tri/${locationId}`,
    method: PUT,
    data: information,
  });
};

export const uploadImageLocationApi = (
  locationId: number,
  information: FormData
): AxiosPromise<HttpResponse<LocationsDto>> => {
  return axiosRequest({
    url: `/vi-tri/upload-hinh-vitri?maViTri=${locationId}`,
    method: POST,
    data: information,
  });
};
