import { notification } from "antd";
import {
  createUserApi,
  deleteUserApi,
  fetchUserInfoApi,
  updateUserApi,
} from "services/user";
import { Content } from "interfaces/searchContent";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserListApi } from "services/user";
import { UserInfo } from "interfaces/login";

interface UserState {
  userInfo: UserInfo;
  userList: Content<UserInfo>;
}

const DEFAULT_STATE = {
  userInfo: {
    id: 1,
    name: "John Brown",
    email: "abc@gmail.com",
    password: "12333",
    avatar: "33113",
    birthday: "01-01-2001",
    gender: true,
    phone: "0123456789",
    role: "USER",
  },
  userList: {
    pageIndex: 1,
    pageSize: 5,
    totalRow: 10,
    keywords: "",
    data: [
      {
        id: 1,
        name: "John Brown",
        email: "abc@gmail.com",
        password: "",
        avatar: "",
        birthday: "1-1-2001",
        gender: true,
        phone: "0123456789",
        role: "USER",
      },
      {
        id: 2,
        name: "Jim Green",
        email: "abc@gmail.com",
        password: "",
        avatar: "",
        birthday: "1-1-2001",
        gender: false,
        phone: "0123456789",
        role: "USER",
      },
      {
        id: 3,
        name: "Joe Black",
        email: "abc@gmail.com",
        password: "",
        avatar: "",
        birthday: "1-1-2001",
        gender: true,
        phone: "0123456789",
        role: "USER",
      },
    ],
  },
} as UserState;
export const fetchUserListApiAction = createAsyncThunk(
  "userReducer/fetchUserListApiAction",
  async (search: { page: number; keyword: string }) => {
    const { page, keyword } = search;
    const result = await fetchUserListApi(
      page,
      DEFAULT_STATE.userList.pageSize,
      keyword
    );
    return result.data.content;
  }
);

export const createUserApiAction = createAsyncThunk(
  "userReducer/createUserApiAction",
  async (information: UserInfo) => {
    await createUserApi(information);
    return true;
  }
);

export const deleteUserApiAction = createAsyncThunk(
  "userReducer/deleteUserApiAction",
  async (userId: number) => {
    await deleteUserApi(userId);
    return true;
  }
);

export const updateUserApiAction = createAsyncThunk(
  "userReducer/updateUserApiAction",
  async (update: { userId: string; information: UserInfo }) => {
    const { userId, information } = update;
    await updateUserApi(userId, information);
  }
);

export const fetchUserInfoApiAction = createAsyncThunk(
  "userReducer/fetchUserInfoApiAction",
  async (userId: string | number) => {
    const result = await fetchUserInfoApi(userId);
    return result.data.content;
  }
);

const userSlice = createSlice({
  name: "userReducer",
  initialState: DEFAULT_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchUserListApiAction.fulfilled,
      (state: UserState, action: PayloadAction<Content<UserInfo>>) => {
        const { pageSize, pageIndex, totalRow, keywords, data } =
          action.payload;
        state.userList.pageSize = pageSize;
        state.userList.pageIndex = pageIndex;
        state.userList.totalRow = totalRow;
        state.userList.keywords = keywords;
        state.userList.data = data;
      }
    );
    builder.addCase(createUserApiAction.fulfilled, () => {
      notification.success({
        message: "Account created successfully!",
      });
    });
    builder.addCase(createUserApiAction.rejected, () => {
      notification.error({
        message: "Your email already has an account!",
      });
    });
    builder.addCase(deleteUserApiAction.fulfilled, () => {
      notification.warning({
        message: "Account deleted successfully!",
      });
    });
    builder.addCase(deleteUserApiAction.rejected, () => {
      notification.error({
        message:
          "The account cannot be deleted or the account has already been deleted ",
      });
    });
    builder.addCase(
      fetchUserInfoApiAction.fulfilled,
      (state: UserState, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
      }
    );
    builder.addCase(fetchUserInfoApiAction.rejected, () => {
      notification.error({
        message: "There is no account with the given ID!",
      });
    });
    builder.addCase(updateUserApiAction.fulfilled, () => {
      notification.success({
        message: "Account updated successfully!",
      });
    });
    builder.addCase(updateUserApiAction.rejected, () => {
      notification.error({
        message: "The email already exists!",
      });
    });
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
