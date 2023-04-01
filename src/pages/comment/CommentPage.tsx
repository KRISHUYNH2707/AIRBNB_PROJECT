import { LoadingContext } from "contexts/loading/LoadingContext";
import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "store/config";
import { fetchGetCommentListApiAction } from "store/reducers/commentReducer";

// Demo cho Manh Hung //

export default function CommentPage(): JSX.Element {
  const commentState = useSelector(
    (state: RootState) => state.commentReducer.commentList
  );
  const dispatch = useDispatch<RootDispatch>();
  const [, setLoading] = useContext(LoadingContext);

  const [test, setTest] = useState<string>("");

  useEffect(() => {
    handleGetCommentListApi();
  }, []);

  const handleGetCommentListApi = async (): Promise<void> => {
    setLoading({ isLoading: true });
    await dispatch(fetchGetCommentListApiAction());
    setLoading({ isLoading: false });
  };

  const renderComment = (): JSX.Element[] => {
    return commentState?.map((ele) => {
      return <div key={ele.id}>{ele.noiDung}</div>;
    });
  };

  return <div>{renderComment()}</div>;
}
