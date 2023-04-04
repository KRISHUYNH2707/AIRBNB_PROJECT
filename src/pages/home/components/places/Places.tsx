import React, { useEffect, useState } from "react";
import "../../../../styles/places.scss";
import fullHouse from "../../../../assets/fullHouse.jpg";
import oldHouse from "../../../../assets/oldHouse.jpg";
import greenHouse from "../../../../assets/greenHouse.jpg";
import cat from "../../../../assets/cat.jpg";
import { fetchLocationSearchListApi } from "../../../../services/location";
import { LocationsDto } from "interfaces/location";

function Places(): JSX.Element {
  const [nearbyLocations, setNearbyLocations] = useState<LocationsDto[]>([]);

  const fetchLocations = async () => {
    const nearbyLocations = await fetchLocationSearchListApi();
    console.log(nearbyLocations);
    setNearbyLocations(nearbyLocations.data.content.data);
    // console.log(nearbyLocations)
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  const renderNearbyLocations = () => {
    return nearbyLocations?.map((ele, idx) => {
      // định nghĩa cái trên rồi giờ ele không cần định nghĩa lại
      return (
        <div className="location__card col-12 col-md-6 col-lg-3" key={idx}>
          <div className="card__left">
            <img
              className="location__image"
              width={70}
              height={70}
              src={ele.hinhAnh}
              alt=""
            />
          </div>
          <div className="card__right ml-3">
            <h2>{ele.tinhThanh}</h2>
            <h3>15 phút lái xe</h3>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="locations">
      <div className="locations__wrapper py-lg-1 py-sm-1">
        <div className="suggested__nearbyLocation">
          <h2 className="mb-sm-4 mt-sm-5">Khám phá những địa điểm gần đây</h2>
          <div className="nearby__locations row">{renderNearbyLocations()}</div>
        </div>

        <div className="location__details my-lg-4">
          <h2 className="mb-sm-4 mt-sm-4">Ở bất cứ đâu</h2>
          <div className="d-flex location__details--wrapper">
            <div className="detail__card sm-col-12">
              <img width={350} height={240} src={fullHouse} alt="" />
              <p>Toàn bộ nhà</p>
            </div>
            <div className="detail__card sm-col-12">
              <img width={350} height={240} src={oldHouse} alt="" />
              <p>Chỗ ở độc đáo</p>
            </div>
            <div className="detail__card sm-col-12">
              <img width={350} height={240} src={greenHouse} alt="" />
              <p>Trang trại và thiên nhiên</p>
            </div>
            <div className="detail__card sm-col-12">
              <img width={350} height={240} src={cat} alt="" />
              <p>Cho phép mang theo thú cưng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Places;
