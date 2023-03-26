import { AxiosPromise } from "axios";
import { axiosRequest } from "configs/axios.config";
import { Request } from "enums";
import { Content } from "interfaces/searchContent";
import { RoomsDto } from "interfaces/room";

//request : "STRING"
const { GET } = Request;
export const fetchRoomListApi = (
  page: number,
  pageSize: number,
  keyword: string = ""
): AxiosPromise<HttpResponse<Content<RoomsDto>>> => {
  return axiosRequest({
    url: `/phong-thue/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}${
      keyword !== "" ? `keyword=${keyword}` : ""
    }`,
    method: GET,
  });
};
