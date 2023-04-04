import React, { useState } from "react";
import "./bookingroom.scss";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, notification } from "antd";
import { RootDispatch, RootState } from "store/config";
import { BookingDto } from "interfaces/booking";

export default function BookingRoom() {
  const user = useSelector((state: RootState) => state.loginReducer);
  const [inputFocus, setInputFocus] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [guest, setGuest] = useState<number>(0);
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();
  const createRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const openDatePicker = () => {
    setInputFocus(true);
  };
  const closeDatePicker = () => {
    setInputFocus(false);
  };

  const handleSelect = (ranges: any) => {
    setCheckInDate(ranges.selection.startDate);
    setCheckOutDate(ranges.selection.endDate);
  };
  const selectionRange = {
    startDate: checkInDate,
    endDate: checkOutDate,
    key: "selection",
  };

  const options = {
    rangeColors: ["#e0565b"],
    ranges: [selectionRange],
    minDate: new Date(),
    onChange: handleSelect,
  };
  const get_day_of_time = (d1: Date, d2: Date) => {
    let ms1 = d1.getTime();
    let ms2 = d2.getTime();
    return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data: BookingDto = {
      id: 0,
      ngayDen: e.checkInDate,
      ngayDi: e.checkOutDate,
      maPhong: 0,
      soLuongKhach: 1,
      maNguoiDung: 1,
    };
    if (user.token !== "") {
      Swal.fire({
        icon: "warning",
        text: "Bạn có chắc chắn đặt phòng không!",
        confirmButtonText: "Đồng Ý!",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          const dataPost = {
            id: 0,
            information: data,
          };
          console.log(dataPost);
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        text: "Bạn chưa đăng nhập! Hãy đăng nhập để tiếp tục",
        confirmButtonText: "Đồng Ý!",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonColor: "#d33",
      }).then((result) => {
        notification.warning({
          message: "vui long dang nhap",
        });
        navigate("/login");
      });
    }
  };


  return (
    <div className="row rounded-lg bg-white shadow-xl border p-6 w-100 mx-auto sticky top-28 pb-4">
      <div className="w-100 container align-items-center">
        <div className="d-flex justify-content-between align-items-center mb-4 pt-4">
          <div>
            <span>$ </span>
            <span className="font-weight-bold ">
              {/* {roomDetail?.price} */} 100000
            </span>
            <span className="text-base"> đêm</span>
          </div>
          <div>
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-star-fill mr-1 mb-1 "
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              {createRandomNumber(3, 5)}
            </span>{" "}
            <span className="gach mx-1">
              {createRandomNumber(50, 100)} đánh giá
            </span>
          </div>
        </div>

        <div className="row d-flex flex-col rounded-md container mx-auto">
          <div
            className="d-flex w-100 border-solid border-gray-400 text-center border-secondary rounded-lg"
            onClick={openDatePicker}
          >
            <div className="border-right border-secondary rounded-tl-md w-100 p-3 cursor-pointer hover:bg-gray-100  col-6">
              <div className="font-weight-bold">NHẬN PHÒNG</div>
              <div className="m-1">
                {moment(checkInDate).format("DD-MM-YYYY")}
              </div>
            </div>
            <div className=" rounded-tr-md w-100 p-3 cursor-pointer hover:bg-gray-100  rounded-lg col-6">
              <div className="font-weight-bold">TRẢ PHÒNG</div>
              <div className="m-1">
                {moment(checkOutDate).format("DD-MM-YYYY")}
              </div>
            </div>
          </div>

          <div className="p-2 col-12 border border-secondary border-top-0 rounded-lg">
            <div className="font-weight-bold">KHÁCH</div>
            <div className="d-flex justify-content-between align-items-center m-1">
              <button
                className="w-8 h-8 bg-gray-300 hover:bg-red-400 duration-200 rounded-xl text-white cursor-pointer border-0"
                disabled={guest <= 0}
                onClick={() => setGuest(guest - 1)}
              >
                -
              </button>

              <div>{guest} khách</div>
              <button
                className="w-8 h-8 bg-gray-300 hover:bg-red-400 duration-200 rounded-xl text-white cursor-pointer border-0"
                onClick={() => setGuest(guest + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-100 py-3 mt-3 rounded-lg text-white text-lg border-0 font-weight-bold"
          style={{
            background:
              "linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%",
          }}
        >
          Đặt phòng
        </button>
        <div className="text-center text-gray-400 my-2">
          <span>Bạn vẫn chưa bị trừ tiền</span>
        </div>
        <div className="border-bottom py-2 ">
          <div className="d-flex justifyjustify-content-between py-1">
            <div className="text-gray-600 gach">
              {/* $ {roomDetail?.price} x{" "}
                            {get_day_of_time(checkInDate, checkOutDate)} đêm */}
            </div>
            <div className="gach">
              {/* <span>
                                {roomDetail?.price
                                    ? roomDetail?.price *
                                      get_day_of_time(checkInDate, checkOutDate)
                                    : ""}
                            </span>{" "} */}
              $
            </div>
          </div>
          <div className="d-flex justify-content-between py-1 text-base">
            <div className="gach text-gray-600 gach">Phí dịch vụ</div>
            <div>
              <span>0</span>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center text-lg pt-3 pb-4 font-weight-bold">
          <h5 className="font-weight-bold">Tổng trước thuế</h5>
          <div>
            {/* {roomDetail?.price
                            ? roomDetail?.price *
                              get_day_of_time(checkInDate, checkOutDate)
                            : ""}{" "}
                        $ */}
          </div>
        </div>
        {inputFocus ? (
          <div className="absolute top-0 right-0 border shadow-xl p-2 bg-white rounded-xl">
            <div className="d-flex justify-content-between align-items-center p-3">
              <div>
                <div>
                  <div className="text-2xl text-gray-800 font-weight-bold">
                    {get_day_of_time(checkInDate, checkOutDate)} đêm
                  </div>
                  <div className="text-gray-400">
                    {moment(checkInDate).format("DD-MM-YYYY")} đến{" "}
                    {moment(checkOutDate).format("DD-MM-YYYY")}
                  </div>
                </div>
              </div>
              <button
                onClick={closeDatePicker}
                className="bg-gray-100 text-red-600 hover:bg-red-100 duration-200 px-2 py-3 rounded-2xl"
              >
                Close
              </button>
            </div>
            <DateRangePicker {...options} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
