import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import "styles/roomSearch.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { formatDate } from "../../../utils";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "store/config";
import { fetchRoomListByLocationApi } from "services/room";
import { RoomsDto } from "interfaces/room";

export default function SuggestedRoom(): JSX.Element {
  const selectedLocationState = useSelector(
    (state: RootState) => state.locationReducer.selectedLocation
  );

  const navigate: NavigateFunction = useNavigate();

  const [roomList, setRoomList] = useState<RoomsDto[]>([]);
  const [favoriteRooms, setFavoriteRooms] = useState<number[]>([]);

  useEffect(() => {
    fetchData();
  }, [selectedLocationState]);

  const fetchData = async () => {
    const fetchedData = await fetchRoomListByLocationApi(
      selectedLocationState.locationID
    );
    setRoomList(fetchedData.data.content);
  };

  const renderRoomList = () => {
    return roomList.map((ele, idx) => {
      return (
        <div className="room__card" key={idx}>
          <div className="room__card-wrapper">
            <div
              className="room__image col-md-5"
              onClick={() => navigate(`/room-detail/${ele.id}`)}
            >
              <img className="displayed__image" src={ele.hinhAnh} alt="" />
            </div>
            <div className="room__desc col-md-7 d-flex flex-column justify-content-between ">
              <div className="desc__top">
                <div className="location__desc d-flex justify-content-between">
                  <p>
                    Toàn bộ căn hộ dịch vụ tại{" "}
                    {selectedLocationState.locationName}
                  </p>
                  <div className="like__botton">
                    <button
                      onClick={() => {
                        setFavoriteRooms((prevRooms) => {
                          const index = prevRooms.indexOf(ele.id);
                          if (index !== -1) {
                            return [
                              ...prevRooms.slice(0, index),
                              ...prevRooms.slice(index + 1),
                            ];
                          } else {
                            return [...prevRooms, ele.id];
                          }
                        });
                      }}
                    >
                      <FavoriteBorderIcon
                        style={{
                          fill: favoriteRooms.includes(ele.id)
                            ? "red"
                            : "black",
                        }}
                      ></FavoriteBorderIcon>
                    </button>
                  </div>
                </div>

                <h4>{ele.tenPhong}</h4>
                <p>_____</p>
                <p>
                  {ele.giuong} giường • {ele.phongTam} phòng tắm{" "}
                  {ele.wifi ? "• Wifi" : undefined}{" "}
                  {ele.tivi ? "• Tivi" : undefined}{" "}
                  {ele.bep ? "• Bếp" : undefined}
                  {ele.dieuHoa ? "• Điều hòa nhiệt độ" : undefined}{" "}
                  {ele.mayGiat ? "• Máy giặt" : undefined}{" "}
                  {ele.banUi ? "• Bàn ủi" : undefined}
                  {ele.doXe ? "• Bãi đỗ xe" : undefined}{" "}
                  {ele.hoBoi ? "• Hồ bơi" : undefined}
                </p>
              </div>
              <div className="desc__bottom d-flex">
                <p className="ml-auto mt-auto mb-0">
                  ${ele.giaTien}
                  <span>/ tháng</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="room__suggestion justify-content-between">
      <div className="room__suggestion--wrapper">
        <div className="search__result col-md-8 col-xl-7">
          <div className="brief__summary mt-md-4">
            <p>
              Hơn 300 chỗ ở •{" "}
              {formatDate(selectedLocationState.checkinDate) +
                " - " +
                formatDate(selectedLocationState.checkoutDate)}
            </p>
            <h2>Chỗ ở tại {selectedLocationState.locationName}</h2>
            <div className="room__filters mb-2">
              <Button variant="outlined">Loại chỗ ở</Button>
              <Button variant="outlined">Giá</Button>
              <Button variant="outlined">Đặt ngay</Button>
              <Button variant="outlined">Phòng và phòng ngủ</Button>
              <Button variant="outlined">Bộ lọc khác</Button>
            </div>
          </div>
          <div className="room__list">{renderRoomList()}</div>
        </div>
        <div className="location__map col-md-4 col-xl-5 pr-md-1">
          <div className="map__wrapper">
            <iframe
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=ho%20chi%20minh+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.maps.ie/distance-area-calculator.html">
                measure acres/hectares on map
              </a>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
