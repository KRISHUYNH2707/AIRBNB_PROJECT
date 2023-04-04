import { LoginDto } from "interfaces/login";
import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants";
import { Users } from "interfaces/user"; // anh đổi url

const axiosRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

axiosRequest.interceptors.request.use((config) => {
  const userInfoString = localStorage.getItem("USER_INFO_KEY");
  if (localStorage.getItem("USER_INFO_KEY")) {
    const userInfo: LoginDto<Users> = JSON.parse(userInfoString || "");
    const token = userInfo.token;

    config.headers.token = `${token}`;
  }

  return config;
});

//  axiosRequest.interceptors là một middleware của axios

export { axiosRequest };

// lớp đối tượng instant

// anh copy file này thay cho file kia rồi còn 1 số cái ở phần khác em xem lại rồi chỉ anh fix
// okay em
