import { Request } from "enums";
import { UserInfo } from "interfaces/login";
import { AxiosPromise } from "axios";
import { axiosRequest } from "configs/axios.config";
import { LoginDto } from "interfaces/login";

// request : 'STRING'

const { POST } = Request;

export const fetchLoginApi = (
  information: object
): AxiosPromise<HttpResponse<LoginDto<UserInfo>>> => {
  return axiosRequest({
    url: "/auth/signin",
    method: POST,
    data: information,
  });
};
