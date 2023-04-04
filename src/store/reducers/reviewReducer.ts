import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewDto } from "interfaces/review";
import { fetchReviewListApi, fetchReviewRoomListApi } from "services/review";


export interface ReviewState {
  reviewList: ReviewDto[]; // 
}

const DEFAULT_STATE = {
  reviewList: [],
} as ReviewState;

export const fetchReviewListAction = createAsyncThunk(
  "reviewReducer/fetchReviewListAction",
  async (_, store) => {
    // cais nayf lays store lam gi v :V
    // cais nay` lay' het' tat' ca? binh luan a
    const rootState = store.getState() as ReviewState;
    if (rootState.reviewList.length) {
      return rootState.reviewList;
    }
    const result = await fetchReviewListApi();
    return result.data.content;
  }
);

export const fetchReviewRoomListAction = createAsyncThunk(
  'reviewReducer/fetchReviewRoomListAction',
  // cái này lấy theo từng phòng
  async ( roomId : number | string ) => {
    const result = await fetchReviewRoomListApi(roomId);
    return result.data.content
  }
)


const reviewSlice = createSlice({
  name: "reviewReducer",
  initialState: DEFAULT_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchReviewListAction.fulfilled,
      (state: ReviewState, action: PayloadAction<ReviewDto[]>) => {
        state.reviewList = action.payload;
      }
    );
    builder.addCase(
      fetchReviewRoomListAction.fulfilled,
      (state : ReviewState , action : PayloadAction<ReviewDto[]>) => {
        state.reviewList = action.payload
      }
    )
  },
});

export const reviewReducer = reviewSlice.reducer;
