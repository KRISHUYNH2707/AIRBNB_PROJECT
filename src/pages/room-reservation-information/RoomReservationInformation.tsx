import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "store/config";
import { fetchGetRoomReservationListApiAction } from "store/reducers/roomReservationReducer";

export default function RoomReservationInformation(): JSX.Element {
  const dispatch = useDispatch<RootDispatch>();
  const roomReservation = useSelector(
    (state: RootState) => state.roomReservationReducer.reservationList
  );

  useEffect(() => {
    handleGetDataRoomReservation();
  }, []);

  const handleGetDataRoomReservation = async () => {
    await dispatch(fetchGetRoomReservationListApiAction());
  };

  const renderNameRoomReservation = () => {
    return roomReservation.map((room) => {
      return <li key={room.id}>{room.maPhong}</li>;
    });
  };

  return (
    <div>
      <ul>{renderNameRoomReservation()}</ul>
    </div>
  );
}
