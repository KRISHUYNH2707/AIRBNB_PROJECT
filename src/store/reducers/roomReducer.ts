import { notification } from "antd";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RoomsDto } from "interfaces/room";
import { Content } from "interfaces/searchContent";
import { fetchRoomListApi } from "services/room";

export interface RoomState {
  roomInfo: RoomsDto;
  roomList: Content<RoomsDto>;
}

const DEFAULT_STATE = {
  roomInfo: {},
  roomList: {
    pageIndex: 1,
    pageSize: 2,
    totalRow: 10,
    keywords: "",
    data: [{}],
  },
} as RoomState;

export const fetchRoomListApiAction = createAsyncThunk(
  "roomReducer/fetchRoomListApiAction",
  async (search: { page: number; keyword: string }) => {
    const { page, keyword } = search;
    if (page !== DEFAULT_STATE.roomList.pageIndex || page === 1) {
      const result = await fetchRoomListApi(
        page,
        DEFAULT_STATE.roomList.pageSize,
        keyword
      );
      return result.data.content;
    }
    return DEFAULT_STATE.roomList;
  }
);

const roomSlice = createSlice({
  name: "roomReducer",
  initialState: DEFAULT_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchRoomListApiAction.fulfilled,
      (state: RoomState, action: PayloadAction<Content<RoomsDto>>) => {
        state.roomList = action.payload;
      }
    );

    builder.addCase(fetchRoomListApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
  },
});

export const roomActions = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
