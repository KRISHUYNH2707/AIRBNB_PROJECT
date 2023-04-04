import { AxiosPromise } from "axios";
import { axiosRequest } from "configs/axios.config";
import { Request } from "enums";
import { Content } from "interfaces/searchContent";
import { RoomsDto } from "interfaces/room";

//request : "STRING"
const { GET, DELETE, POST, PUT } = Request;

export const fetchRoomListByLocationApi = (
  locationId: number | string
): AxiosPromise<HttpResponse<RoomsDto[]>> => {
  return axiosRequest({
    url: `/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`,
    method: GET,
  });
};

export const fetchRoomListApi = (
  page: number,
  pageSize: number,
  keyword: string = ""
): AxiosPromise<HttpResponse<Content<RoomsDto>>> => {
  return axiosRequest({
    url: `/phong-thue/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}${
      keyword !== "" ? `&keyword=${keyword}` : ""
    }`,
    method: GET,
  });
};

export const createRoomApi = (
  information: RoomsDto
): AxiosPromise<HttpResponse<RoomsDto>> => {
  return axiosRequest({
    url: `/phong-thue`,
    method: POST,
    data: information,
  });
};

export const getRoomApi = (
  roomId: string
): AxiosPromise<HttpResponse<RoomsDto>> => {
  return axiosRequest({
    url: `/phong-thue/${roomId}`,
    method: GET,
  });
};

export const updateRoomApi = (
  roomId: number,
  information: RoomsDto
): AxiosPromise<HttpResponse<RoomsDto>> => {
  return axiosRequest({
    url: `/phong-thue/${roomId}`,
    method: PUT,
    data: information,
  });
};

export const deleteRoomApi = (id: number): AxiosPromise<HttpResponse<null>> => {
  return axiosRequest({
    url: `/phong-thue/${id}`,
    method: DELETE,
  });
};
