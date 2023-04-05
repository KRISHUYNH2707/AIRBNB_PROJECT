import React, { useState, useEffect, useRef } from "react";
import { TbWorld } from "react-icons/tb";
import { BiMenu } from "react-icons/bi";
import { HiCurrencyEuro, HiUserCircle } from "react-icons/hi";
import background from "../assets/background.jpg";
import logo from "../../../assets/logo.png";
import { BsSearch } from "react-icons/bs";
import styles from "../../../styles/roomheader.module.scss";
import "../../../styles/carousel.scss";
import { useSelector } from "react-redux";
import { formatDate } from "../../../utils";
import { fetchLocationListApi } from "../../../services/location";
import LocationList from "../../../components/LocationList";
import { DateRangePicker } from "react-date-range";
import { useDispatch } from "react-redux";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { setSelectedLocationReducer } from "../../../store/actions/locationInfor";
import { NavLink, useNavigate } from "react-router-dom";
import { RootDispatch, RootState } from "store/config";
import { Role, PathAdmin } from "enums";
import { locationActions } from "store/reducers/locationReducer";

function RoomListHeader() {
  const dispatch = useDispatch<RootDispatch>();

  // STATE
  const suggestedLocations = useSelector(
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

  // handle open and close user menu
  const [settingMenu, setSettingMenu] = useState<boolean>(false);
  const userMenuRef = useRef<any>();
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!userMenuRef?.current?.contains(event.target)) {
        setSettingMenu(false);
      }
      if (!userMenuRef?.current?.contains(event.target)) {
        setSettingMenu(false);
      }
    });
  });

  const navigate = useNavigate();

  // GET LOCATION AND BOOKING DETAILS FROM STATE
  const selectedLocationState = useSelector(
    (state: RootState) => state.locationReducer.selectedLocation
  );

  //TODO - NEED TO CHANGE THE CORRECT REDUCER WHEN MERGING
  const userDetailState = useSelector((state: RootState) => state.loginReducer);

  // END OF GETTING LOCATION AND BOOKING DETAILS

  // HANDLE SELECTING DATE
  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  // END OF SELECTING DATE

  useEffect(() => {
    getLocationList();
    setSelectedLocation(selectedLocationState.locationName);
    setStartDate(selectedLocationState.checkinDate);
    setEndDate(selectedLocationState.checkoutDate);
    setNumGuest(selectedLocationState.selectedNumGuest);
  }, []);

  // # CHECK IF USERS CLICK OUTSIDE OF A RESTRICTED AREA

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

  // END OF MOUSE CLICKING CHECK

  const getLocationList = async () => {
    const result = await fetchLocationListApi();
    // setSuggestedLocations(result.data.content);
  };

  // LINESTYLES
  // We want to inherit some styles from the Carousel.css but some of the attributes need to be overwritten
  // hence using inline styles is the most approriate way
  const inlineStyles: { [key: string]: React.CSSProperties } = {
    locationInput__List: {
      marginTop: "30px",
      marginBottom: "20px",
      marginRight: "80px",
      borderRadius: "0px",
      width: "500px",
      maxHeight: "50vh",
      overflow: "scroll",
      padding: "0rem 0rem 2rem 0rem",
      overflowX: "hidden",
    },
    datePicker: {
      marginRight: "130px",
      borderTop: "none",
    },

    inputField: {
      background: "none",
      border: "none",
      padding: "0.2rem 0 0 0",
      textAlign: "center",
      fontSize: "1rem",
      maxWidth: "100%",
    },
  };

  // END OF INLINE STYLES

  const renderLocationList = () => {
    return suggestedLocations.map((ele, idx) => {
      return (
        <div className="locationInput__item" key={idx}>
          <div className="locationInput__item--wrapper d-flex">
            <div className="suggesteLocation__image">
              <img className="introLocation__image" src={ele.hinhAnh} alt="" />
            </div>
            <div className={styles.location__desc}>
              <button
                onClick={() => {
                  setSelectedLocation(ele.tenViTri + ", " + ele.tinhThanh);
                  setSelectedLocationID(ele.id);
                }}
              >
                <p className={styles.location__text}>
                  {ele.tenViTri}, {ele.tinhThanh}, {ele.quocGia}
                </p>
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  // mẻ

  return (
    <div className={styles.header}>
      <div className={styles.header__wrapper}>
        <a className={styles.nav__left} href="/">
          <img src={logo} className={styles.logo} alt="" />
        </a>

        <div className={styles.nav__middle}>
          <div className={styles.searchbar__room__wrapper}>
            <div className={styles.room__places} style={{ fontWeight: "500" }}>
              {/* <p>Khu vực {selectedLocationState.locationName}</p> */}
              <input
                type="text"
                placeholder="Bạn sắp đi đâu?"
                value={selectedLocation}
                className="input-border__none "
                onFocus={() => {
                  setLocationInputOnClick(true);
                }}
                style={inlineStyles.inputField}
              />
            </div>
            <div
              className={styles.room__bookinout}
              style={{ fontWeight: "500" }}
            >
              <input
                placeholder="Thêm ngày"
                type="text"
                className="input-border__none "
                value={formatDate(startDate) + " - " + formatDate(endDate)}
                onFocus={() => setDatePickerOnClick(true)}
                style={inlineStyles.inputField}
              />
            </div>
            <div
              className={styles.room__guest}
              style={{ fontWeight: "lighter" }}
            >
              <input
                placeholder="Thêm khách"
                type="text"
                value={numGuest.toLocaleString() + " khách"}
                onFocus={() => setDatePickerOnClick(true)}
                style={inlineStyles.inputField}
                className={styles.numGuest__text}
                disabled
              />

              <div>
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
                  }}
                >
                  <BsSearch></BsSearch>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.nav__right}>
          <ul className="list-unstyled my-0">
            <a href="" className="text-decoration-none text-dark opacity-25">
              <li>Trở thành chủ nhà</li>
            </a>
          </ul>
          <TbWorld style={{ fontSize: "1.5rem", color: "black" }}></TbWorld>
          <div
            className="header__setting--outer"
            ref={userMenuRef}
            onClick={() => setSettingMenu(!settingMenu)}
          >
            <div className="header__setting">
              <BiMenu style={{ fontSize: "1.5rem", color: "black" }}></BiMenu>
              <HiUserCircle
                style={{ fontSize: "1.5rem", color: "black" }}
              ></HiUserCircle>
            </div>
            {settingMenu && (
              <div className="user__info">
                <div className="user__info--top">
                  {/* //TODO - CHANGE TO THE CORRECT ATTRIBUTE, NOT LOCATIONAME WHEN MERGING */}
                  {userDetailState.token === "" ? (
                    <div className="user__info--wrapper">
                      <div className="user__signinup">
                        <div className="user__signin">
                          <button onClick={() => navigate("/login")}>
                            Đăng nhập
                          </button>
                        </div>
                        <div className="user__signup">
                          <button onClick={() => navigate("/register")}>
                            Đăng ký
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : userDetailState.user.role === Role.ADMIN ? (
                    <>
                      <div className="user__features">
                        <div className="feature__item">
                          <div className="feature__item--inner">
                            <NavLink to={`${PathAdmin.ADMIN}`}>
                              Quản trị
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="user__features">
                      <div className="feature__item">
                        <div className="feature__item--inner">
                          <a href="">Tin nhắn</a>
                        </div>
                      </div>
                      <div className="feature__item">
                        <div className="feature__item--inner">
                          <a href="">Thông báo</a>
                        </div>
                      </div>
                      <div className="feature__item">
                        <div className="feature__item--inner">
                          <a href="">Chuyến đi</a>
                        </div>
                      </div>
                      <div className="feature__item">
                        <div className="feature__item--inner">
                          <a href="">Yêu thích</a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="user__info--wrapper">
                  <div className="user__info--bottom">
                    <div className="user__services">
                      <ul>
                        <li>
                          <a href="">Trải nghiệm</a>
                        </li>
                        <li>
                          <a href="">Trở thành host</a>
                        </li>
                        <li>
                          <a href="">
                            {userDetailState.token == ""
                              ? "Trợ giúp"
                              : "Tài khoản"}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {userDetailState.token !== "" && (
                  <div className="user__info--addedBottom">
                    <div className="user__info--wrapper">
                      <div className="user__services">
                        <ul>
                          <li>
                            <a href="">Trợ giúp</a>
                          </li>
                          <li>
                            <a href="">Đăng xuất</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {locationInputOnClick && (
        <div
          ref={locationRef}
          style={inlineStyles.locationInput__List}
          className={styles.locationList__wrapper}
        >
          {renderLocationList()}
        </div>
      )}

      {datePickerOnClick && (
        <div ref={datePickerRef} style={inlineStyles.datePicker}>
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
  );
}

export default RoomListHeader;
