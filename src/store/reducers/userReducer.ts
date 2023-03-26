import { notification } from "antd";
import {
  createUserApi,
  deleteUserApi,
  fetchUserInfoApi,
  updateUserApi,
} from "services/user";
import { Users } from "interfaces/user";
import { Content } from "interfaces/searchContent";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserListApi } from "services/user";

export interface UserState {
  userInfo: Users;
  userList: Content<Users>;
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
    pageSize: 6,
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
  async (search: { page: number; keywords: string }) => {
    const { page, keywords } = search;
    const result = await fetchUserListApi(
      page,
      DEFAULT_STATE.userList.pageSize,
      keywords
    );
    return result.data.content;
  }
);

export const createUserApiAction = createAsyncThunk(
  "userReducer/createUserApiAction",
  async (information: Users) => {
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
  async (update: { userId: string; information: Users }) => {
    const { userId, information } = update;
    await updateUserApi(userId, information);
  }
);

export const fetchUserInfoApiAction = createAsyncThunk(
  "userReducer/fetchUserInfoApiAction",
  async (userId: string) => {
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
      (state: UserState, action: PayloadAction<Content<Users>>) => {
        const { pageSize, pageIndex, totalRow, keywords, data } =
          action.payload;
        state.userList.pageSize = pageSize;
        state.userList.pageIndex = pageIndex;
        state.userList.totalRow = totalRow;
        state.userList.keywords = keywords;
        state.userList.data = data;
      }
    );
    builder.addCase(createUserApiAction.fulfilled, (state, action) => {
      notification.success({
        message: "Account created successfully!",
      });
    });
    builder.addCase(createUserApiAction.rejected, (state, action) => {
      notification.error({
        message: "Your email already has an account!",
      });
    });
    builder.addCase(deleteUserApiAction.fulfilled, (state, action) => {
      notification.warning({
        message: "Account deleted successfully!",
      });
    });
    builder.addCase(deleteUserApiAction.rejected, (state, action) => {
      notification.error({
        message:
          "The account cannot be deleted or the account has already been deleted ",
      });
    });
    builder.addCase(
      fetchUserInfoApiAction.fulfilled,
      (state: UserState, action: PayloadAction<Users>) => {
        state.userInfo = action.payload;
      }
    );
    builder.addCase(fetchUserInfoApiAction.rejected, (state, action) => {
      notification.error({
        message: "There is no account with the given ID!",
      });
    });
    builder.addCase(updateUserApiAction.fulfilled, (state, action) => {
      notification.success({
        message: "Account updated successfully!",
      });
    });
    builder.addCase(updateUserApiAction.rejected, (state, action) => {
      notification.error({
        message: "The email already exists!",
      });
    });
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
