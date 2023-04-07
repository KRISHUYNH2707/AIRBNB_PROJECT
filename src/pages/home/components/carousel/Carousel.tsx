import React, { useState, useEffect, useRef } from "react";
import carousel from "../../../../assets/carousel1.jpeg";
import "../../../../styles/carousel.scss";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocationSearchListApiAction,
  locationActions,
} from "store/reducers/locationReducer";
import { RootDispatch, RootState } from "store/config";

function Carousel(): JSX.Element {
  // STATE
  const locationState = useSelector(
    (state: RootState) => state.locationReducer.locationList.data
  );
  const [locationInputOnClick, setLocationInputOnClick] =
    useState<boolean>(false);
  const [datePickerOnClick, setDatePickerOnClick] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [numGuest, setNumGuest] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedLocationID, setSelectedLocationID] = useState<number>(-1);
  // END OF STATE

  const dispatch = useDispatch<RootDispatch>();

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  useEffect(() => {
    getLocationList();
  }, []);

  let locationRef = useRef<any>();
  let datePickerRef = useRef<any>();

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!locationRef?.current?.contains(event.target)) {
        setLocationInputOnClick(false);
      }
      if (!datePickerRef?.current?.contains(event.target)) {
        setDatePickerOnClick(false);
      }
    });
  });

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!datePickerRef?.current?.contains(event.target)) {
        setDatePickerOnClick(false);
      }
    });
  });

  const getLocationList = async () => {
    await dispatch(
      fetchLocationSearchListApiAction({ page: 1, size: 12, keyword: "" })
    );
  };

  const renderLocationList = () => {
    return locationState?.map((ele, idx) => {
      return (
        <div className="locationInput__item" key={idx}>
          <div className="locationInput__item--wrapper d-flex">
            <div className="suggesteLocation__image">
              <img className="introLocation__image" src={ele.hinhAnh} alt="" />
            </div>
            <div>
              <button
                onClick={() => {
                  setSelectedLocation(ele.tenViTri + ", " + ele.tinhThanh);
                  setSelectedLocationID(ele.id);
                }}
              >
                <p className="text-black">
                  {ele.tenViTri}, {ele.tinhThanh}, {ele.quocGia}
                </p>
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const navigate = useNavigate();

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="carousel">
      <div className="search__bar d-flex justify-content-center">
        <div className="search__bar--wrapper">
          <div className="places">
            <p>Địa điểm</p>
            <input
              type="text"
              placeholder="Bạn sắp đi đâu?"
              value={selectedLocation}
              className=""
              onFocus={() => {
                setLocationInputOnClick(true);
              }}
            />
            {locationInputOnClick && (
              <div ref={locationRef} className="locationInput__List">
                {renderLocationList()}
              </div>
            )}
          </div>
          <div className="book__in">
            <p>Nhận phòng</p>
            <input
              type="text"
              placeholder={
                windowSize > 524 ? startDate.toLocaleDateString() : "Thêm ngày"
              }
              value={
                windowSize > 524 ? startDate.toLocaleDateString() : "Thêm ngày"
              }
              onFocus={() => setDatePickerOnClick(true)}
            />
          </div>
          <div className="book__out">
            <p>Trả phòng</p>
            <input
              placeholder="Thêm ngày"
              type="text"
              value={endDate.toLocaleDateString()}
              onFocus={() => setDatePickerOnClick(true)}
            />
          </div>
          <div className="guest">
            <p>Khách</p>
            <input
              placeholder="Thêm khách"
              type="text"
              value={numGuest.toLocaleString()}
              onFocus={() => setDatePickerOnClick(true)}
            />
            <span>
              <button
                onClick={() => {
                  dispatch(
                    locationActions.setSelectedLocationReducer({
                      locationID: selectedLocationID,
                      locationName: selectedLocation,
                      checkinDate: startDate,
                      checkoutDate: endDate,
                      selectedNumGuest: numGuest,
                    })
                  );
                  navigate("/room-list");
                }}
              >
                <BsSearch></BsSearch>
              </button>
            </span>
          </div>
        </div>
        {datePickerOnClick && (
          <div ref={datePickerRef} className="datePicker">
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleSelect}
            />
            <div className="pt-4 num__guest pb-3">
              <div className="num__guest--wrapper d-flex justify-content-between">
                <h5 className="ml-3">Số khách</h5>
                <div className="addGuest">
                  <PeopleAltIcon></PeopleAltIcon>
                  <input
                    min={1}
                    value={numGuest}
                    onChange={(e: any) => setNumGuest(e.target.value)}
                    className="guest__input"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="carousel__wrapper">
        <div className="carousel__image">
          <img src={carousel} className="carousel__background" alt="" />
        </div>
      </div>
      <div className="carousel__desc d-flex text-center justify-content-center align-items-center">
        <p>Nhờ Host, mọi điều đều có thể</p>
      </div>
    </div>
  );
}

export default Carousel;
