import React, { useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./review.scss";
import { useDispatch, useSelector } from "react-redux";
import { ReviewDto } from "interfaces/review";
import { RootDispatch, RootState } from "store/config";
import { fetchReviewRoomListAction } from "store/reducers/reviewReducer";

export default function Review(): JSX.Element {
  const createRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const [reviewDetail, setReviewDetail] = useState<ReviewDto[]>();
  const params = useParams();
  const reviewState = useSelector(
    (state: RootState) => state.reviewReducer.reviewList
  );

  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    getReviewDetail();
  }, []);

  const getReviewDetail = async () => {
    if (params.roomId && params.roomId !== "") {
      await dispatch(fetchReviewRoomListAction(params.roomId));
  };

  const renderReview = () => {
    return reviewState.map((ele, idx) => {
      return (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
          <div key={idx} className="mb-4">
            <div className=" d-flex align-items-center">
              <div className="col-2 m-0 p-0">
                {ele.avatar !== "" ? (
                  <img
                    src={ele.avatar}
                    className="hinh rounded-circle overflow-hidden shadow-lg p-0"
                  />
                ) : (
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                      display: "block",
                      height: "40px",
                      width: "40px",
                      fill: "currentcolor",
                    }}
                    className="text-gray-500"
                  >
                    <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
                  </svg>
                )}
              </div>
              <div className="ml-3 col-10 ">
                <h5 className="text-gray-900 m-0 font-weight-bolder">{ele.tenNguoiBinhLuan}</h5>
                <h6 className="font-normal text-sm text-gray-500">
                  {moment(ele.ngayBinhLuan).format("DD")} tháng{" "}
                  {moment(ele.ngayBinhLuan).format("MM")} năm{" "}
                  {moment(ele.ngayBinhLuan).format("YYYY")}
                </h6>
              </div>
            </div>
            <div className="text-gray-800 tracking-wider">
              <p>{ele.noiDung}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mt-4 pb-3">
      <div>
        <h2 className="d-flex">
          <div className="d-flex ">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "inline-block",
                height: 16,
                width: 16,
                fill: "currentcolor",
              }}
            >
              <path
                d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-2 mb-2">
            <h5 className="font-weight-bold">{createRandomNumber(3, 5)} .</h5>
          </div>
          <div className="ml-2 ">
            <h5 className="font-weight-bold">
              {createRandomNumber(10, 100)} Đánh giá
            </h5>
          </div>
        </h2>
      </div>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-between align-items-center tracking-wider pb-2">
          <div className="w-100">Mức độ sạch sẽ</div>
          <div className="w-50 d-flex justify-content-between align-items-center">
            <div className="w-100 rounded-pill h-1">
              <div
                className="rounded h-1 bg-gray-800 "
                style={{ width: "100%" }}
              />
            </div>
            <div className="ml-4">5,0</div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-between align-items-center tracking-wider pb-2">
          <div className="w-100 ">Độ chính xác</div>
          <div className="w-50 d-flex justify-content-between align-items-center">
            <div className="w-100 rounded-pill h-1">
              <div
                className="rounded h-1 bg-gray-800"
                style={{ width: "100%" }}
              />
            </div>
            <div className="ml-4">5,0</div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-between align-items-center tracking-wider pb-2">
          <div className="w-100 ">Giao tiếp</div>
          <div className="w-50 d-flex justify-content-between align-items-center">
            <div className="w-100 rounded-pill h-1">
              <div
                className="rounded h-1 bg-gray-800"
                style={{ width: "100%" }}
              />
            </div>
            <div className="ml-4">5,0</div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-between align-items-center tracking-wider pb-2">
          <div className="w-100 ">Vị trí</div>
          <div className="w-50 d-flex justify-content-between align-items-center">
            <div className="w-100 rounded-pill h-1">
              <div
                className="rounded-full h-1 bg-gray-800"
                style={{ width: "95%" }}
              />
            </div>
            <div className="ml-4">4,9</div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-between align-items-center tracking-wider pb-2">
          <div className="w-100 ">Nhận phòng</div>
          <div className="w-50 d-flex justify-content-between align-items-center">
            <div className="w-100 rounded-pill h-1">
              <div
                className="rounded h-1 bg-gray-800"
                style={{ width: "100%" }}
              />
            </div>
            <div className="ml-4">5,0</div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-sm-12 col-12 d-flex justify-content-between align-items-center tracking-wider pb-2">
          <div className="w-100 ">Giá trị</div>
          <div className="w-50 d-flex justify-content-between align-items-center">
            <div className="w-100 bg-gray-200 rounded-full h-1">
              <div
                className="rounded h-1 bg-gray-800"
                style={{ width: "100%" }}
              />
            </div>
            <div className="ml-4">5,0</div>
          </div>
        </div>
      </div>

      <div className="mt-5 row">
        {renderReview()}
        <div className="col-12 border-bottom mt-2 pb-4">
          <button className="button-75 p-3 mt-3">
            Hiển thị tất cả 120 đánh giá
          </button>
        </div>
      </div>
    </div>
  );
}
