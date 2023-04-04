import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { BookingDto } from "interfaces/booking";
import { postBookingApi } from "services/booking";

export interface BookingState {
  bookingList: BookingDto[];
}

const DEFAULT_STATE = {
  bookingList: [],
} as BookingState;

export const fetchBookingListAction = createAsyncThunk(
  "bookingReducer/fetchBookingListAction",
  async (post :  {id : string | number ,information : BookingDto}) => {
;
    const result = await postBookingApi( post.id , post.information );
    return result.data.content;
  }
);

const bookingSlice = createSlice({
  name: "bookingReducer",
  initialState: DEFAULT_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
        fetchBookingListAction.fulfilled,
      () => {
        notification.success({
          message: "Booking successfully!",
        })
      }
    );
  },
});

export const bookingReducer = bookingSlice.reducer;
