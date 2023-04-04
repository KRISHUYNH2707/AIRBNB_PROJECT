import { getRoomReservationListApi } from "./../../services/roomReservation";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomReservationsDto } from "interfaces/roomReservation";
import { notification } from "antd";

interface RoomReservationState {
  reservationList: RoomReservationsDto[];
}

const DEFAULT_STATE = {
  reservationList: [],
} as RoomReservationState;

export const fetchGetRoomReservationListApiAction = createAsyncThunk(
  "roomReservationReducer/fetchGetRoomReservationListApiAction",
  async () => {
    const result = await getRoomReservationListApi();
    return result.data.content;
  }
);

const roomReservationSlice = createSlice({
  name: "roomReservationReducer",
  initialState: DEFAULT_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchGetRoomReservationListApiAction.fulfilled,
      (
        state: RoomReservationState,
        action: PayloadAction<RoomReservationsDto[]>
      ) => {
        state.reservationList = action.payload;
      }
    );
    builder.addCase(fetchGetRoomReservationListApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
  },
});

export const roomReservationActions = roomReservationSlice.actions;
export const roomReservationReducer = roomReservationSlice.reducer;
