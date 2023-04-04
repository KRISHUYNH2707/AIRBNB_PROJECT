
import { notification } from "antd";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterDto, TokenRegister, UserInfoRegister } from "interfaces/register";
import { fetchRegisterApi } from "services/register";
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
} as RegisterDto<UserInfoRegister>;

if (localStorage.getItem("USER_INFO_KEY")) {
  const { token, user } = JSON.parse(
    localStorage.getItem("USER_INFO_KEY") || ""
  );
  DEFAULT_STATE.token = token;
  DEFAULT_STATE.user = user;
}

export const fetchRegisterApiAction = createAsyncThunk(
  "registerReducer/fetchRegisterApiAction",
  async (information: Object) => {
    const result = await fetchRegisterApi(information);

    return result.data.content;
  }
);

const roomSlice = createSlice({
  name: "registerReducer",
  initialState: DEFAULT_STATE,
  reducers: {
    fetchRegisterApiAction(
      state: RegisterDto<UserInfoRegister> = DEFAULT_STATE,
      action: PayloadAction<TokenRegister>
    ) {
      state.token = action.payload.token;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchRegisterApiAction.fulfilled,
      (
        state: RegisterDto<UserInfoRegister>,
        action: PayloadAction<RegisterDto<UserInfoRegister>>
      ) => {
        notification.success({
          message: "Register successful!",
        });
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("USER_INFO_KEY", JSON.stringify(action.payload));
      }
    );
    builder.addCase(
      fetchRegisterApiAction.rejected,
      (state: RegisterDto<UserInfoRegister>, action) => {
        notification.error({
          message: "Register failed!",
        });
      }
    );
  },
});

export const registerActions = roomSlice.actions;
export const registerReducer = roomSlice.reducer;
