import { AxiosPromise } from "axios";
import { Request } from "./../enums/index";
import { axiosRequest } from "configs/axios.config";
import { CommentsDto } from "interfaces/comment";

const {
  GET,
  // PUT, DELETE,  POST
} = Request;
export const getCommentListApi = (): AxiosPromise<
  HttpResponse<CommentsDto[]>
> => {
  return axiosRequest({
    url: `/binh-luan`,
    method: GET,
  });
};
