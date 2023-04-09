import { LoginDto, UserInfo } from "./../interfaces/login";
import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants";

const axiosRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

axiosRequest.interceptors.request.use((config) => {
  const userInfoString = localStorage.getItem("USER_INFO_KEY");
  if (localStorage.getItem("USER_INFO_KEY")) {
    const userInfo: LoginDto<UserInfo> = JSON.parse(userInfoString || "");
    const token = userInfo.token;

    config.headers.token = `${token}`;
  }

  return config;
});

export { axiosRequest };
