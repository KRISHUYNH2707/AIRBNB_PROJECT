import { getCommentListApi } from "./../../services/comment";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentsDto } from "interfaces/comment";

interface CommentState {
  commentList: CommentsDto[];
}

const DEFAULT_STATE = {
  commentList: [],
} as CommentState;

export const fetchGetCommentListApiAction = createAsyncThunk(
  "commentReducer/fetchGetCommentListApiAction",
  async () => {
    const result = await getCommentListApi();
    return result.data.content;
  }
);

const commentSlice = createSlice({
  name: "commentReducer",
  initialState: DEFAULT_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchGetCommentListApiAction.fulfilled,
      (state: CommentState, action: PayloadAction<CommentsDto[]>) => {
        state.commentList = action.payload;
      }
    );
  },
});

export const commentActions = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
