import React from "react";
import Footer from "components/footer/Footer";
import RoomListHeader from "./components/RoomListHeader";
import SuggestedRoom from "./components/SuggestedRoom";

function RoomList() {
  return (
    <>
      <RoomListHeader></RoomListHeader>
      <SuggestedRoom></SuggestedRoom>
      <Footer></Footer>
    </>
  );
}

export default RoomList;
