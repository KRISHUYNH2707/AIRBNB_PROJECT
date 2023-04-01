import { Users } from "interfaces/user";
import { AxiosPromise } from "axios";
import { axiosRequest } from "configs/axios.config";
import { Content } from "interfaces/searchContent";
import { Request } from "enums";

// request : 'STRING'

const { DELETE, GET, POST, PUT } = Request;

export const fetchUserListApi = (
  page: number,
  pageSizes: number,
  keyword: string = ""
): AxiosPromise<HttpResponse<Content<Users>>> => {
  return axiosRequest({
    url: `/users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSizes}${
      keyword === "" ? "" : `&keyword=${keyword}`
    }`,
    method: GET,
  });
};

export const fetchUserInfoApi = (
  userId: string | number
): AxiosPromise<HttpResponse<Users>> => {
  return axiosRequest({
    url: `/users/${userId}`,
    method: GET,
  });
};

export const createUserApi = (
  information: Users
): AxiosPromise<HttpResponse<Users | string>> => {
  return axiosRequest({
    url: "/users",
    method: POST,
    data: information,
  });
};

export const deleteUserApi = (
  userId: number
): AxiosPromise<HttpResponse<Content<null>>> => {
  return axiosRequest({
    url: `/users?id=${userId}`,
    method: DELETE,
  });
};

export const updateUserApi = (userId: string, information: Users) => {
  return axiosRequest({
    url: `/users/${userId}`,
    method: PUT,
    data: information,
  });
};
