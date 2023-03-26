import { LoginDto, Token, UserInfo } from "interfaces/login";
import { fetchLoginApi } from "services/login";
import { notification } from "antd";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../config";

const DEFAULT_STATE = {
  token: "",
  user: {
    id: 0,
    name: "",
    email: "",
    password: "",
    avatar: "",
    birthday: "",
    gender: true,
    phone: "",
    role: "USER",
  },
} as LoginDto<UserInfo>;

if (localStorage.getItem("USER_INFO_KEY")) {
  const { token, user } = JSON.parse(
    localStorage.getItem("USER_INFO_KEY") || ""
  );
  DEFAULT_STATE.token = token;
  DEFAULT_STATE.user = user;
}

export const fetchLoginApiAction = createAsyncThunk(
  "loginReducer/fetchLoginApiAction",
  async (information: Object, store) => {
    const rootState = store.getState() as RootState;
    if (rootState.loginReducer.token !== "") {
      return rootState.loginReducer;
    }
    const result = await fetchLoginApi(information);

    return result.data.content;
  }
);

const movieSlice = createSlice({
  name: "loginReducer",
  initialState: DEFAULT_STATE,
  reducers: {
    setUserInfoAction(
      state: LoginDto<UserInfo> = DEFAULT_STATE,
      action: PayloadAction<Token>
    ) {
      state.token = action.payload.token;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchLoginApiAction.fulfilled,
      (
        state: LoginDto<UserInfo>,
        action: PayloadAction<LoginDto<UserInfo>>
      ) => {
        notification.success({
          message: "Login successful!",
        });
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("USER_INFO_KEY", JSON.stringify(action.payload));
      }
    );
    builder.addCase(
      fetchLoginApiAction.rejected,
      (state: LoginDto<UserInfo>, action) => {
        notification.error({
          message: "Login failed!",
        });
      }
    );
  },
});

export const loginActions = movieSlice.actions;

export const loginReducer = movieSlice.reducer;
