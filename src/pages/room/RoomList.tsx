import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import RoomListHeader from './components/RoomListHeader'
import SuggestedRoom from './components/SuggestedRoom'

function RoomList() {
  return (
    <>
          <RoomListHeader></RoomListHeader>
          <SuggestedRoom></SuggestedRoom>
          <Footer></Footer>
    </>


  )
}

export default RoomList