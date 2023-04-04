import { UserInfoRegister } from "./../interfaces/register";
import { RegisterDto } from "../interfaces/register";
import { AxiosPromise } from "axios";
import { axiosRequest } from "../configs/axios.config";

export const fetchRegisterApi = (
  information: object
): AxiosPromise<HttpResponse<RegisterDto<UserInfoRegister>>> => {
  return axiosRequest({
    url: "/auth/signup",
    method: "POST",
    data: information,
  });
};
