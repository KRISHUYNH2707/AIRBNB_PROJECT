import { ReviewDto } from "./../interfaces/review";
import { AxiosPromise } from "axios";
import { axiosRequest } from "../configs/axios.config";

export const fetchReviewListApi = (): AxiosPromise<
  HttpResponse<ReviewDto[]>
> => {
  return axiosRequest({
    url: `/binh-luan`,
    method: "GET",
  });
};

export const fetchReviewRoomListApi = (
  id: number | string
): AxiosPromise<HttpResponse<ReviewDto[]>> => {
  return axiosRequest({
    url: `/binh-luan/lay-binh-luan-theo-phong/${id}`,
    method: "GET",
  });
};
