import {
  createRoomApi,
  deleteRoomApi,
  getRoomApi,
  updateRoomApi,
  uploadImageApi,
} from "services/room";
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
  roomInfo: {}, // khi update no moi them vao kieu nay  // lấy thẳng từ cái này thêm vào nè // lấy từ đó nên là number// ú kì, mà ôg làm lạ ha đặt tên đồ qtr// sau khi ông nhìn lại còn có tên mà biết không sau fix lại không biết chỗ nào mà fix ấy mà.
  roomList: {
    pageIndex: 1, // đây là phần phân trang nè
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

export const fetchGetRoomApiAction = createAsyncThunk(
  "roomReducer/fetchGetRoomApi",
  async (id: string) => {
    const result = await getRoomApi(id);
    return result.data.content;
  }
);
export const fetchUpdateRoomApiAction = createAsyncThunk(
  "roomReducer/fetchUpdateRoomApiAction",
  async (update: { id: number; data: RoomsDto }) => {
    await updateRoomApi(update.id, update.data);
  }
);

export const fetchCreateRoomApiAction = createAsyncThunk(
  "roomReducer/fetchCreateRoomApiAction",
  async (data: RoomsDto) => {
    await createRoomApi(data);
  }
);

export const fetchDeleteRoomApi = createAsyncThunk(
  "roomReducer/fetchDeleteRoomApi",
  async (id: number) => {
    await deleteRoomApi(id);
  }
);

export const fetchUploadImageApiAction = createAsyncThunk(
  "roomReducer/fetchUploadImageApiAction",
  async (upload: { id: number; data: FormData }) => {
    const { id, data } = upload;
    await uploadImageApi(id, data);
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
    builder.addCase(fetchCreateRoomApiAction.fulfilled, () => {
      notification.success({
        message: "Create room successfully!",
      });
    });

    builder.addCase(fetchCreateRoomApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
    builder.addCase(
      fetchGetRoomApiAction.fulfilled, // cái này xài cho việc update // khi nào cần mình mới thêm vào kiểu v .// này
      (state: RoomState, action: PayloadAction<RoomsDto>) => {
        state.roomInfo = action.payload;
      }
    );

    builder.addCase(fetchGetRoomApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
    builder.addCase(fetchUpdateRoomApiAction.fulfilled, () => {
      notification.success({
        message: "Update room successfully!",
      });
    });
    builder.addCase(fetchUpdateRoomApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
    builder.addCase(fetchDeleteRoomApi.fulfilled, () => {
      notification.success({
        message: "Delete room successfully !",
      });
    });

    builder.addCase(fetchDeleteRoomApi.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
    builder.addCase(fetchUploadImageApiAction.fulfilled, () => {
      notification.success({
        message: "Upload image room successfully !",
      });
    });

    builder.addCase(fetchUploadImageApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
  },
});

export const roomActions = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
