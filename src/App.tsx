import React from 'react';
import './App.css';
import AirBnb from './pages';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Carousel from './pages/home/components/carousel/Carousel';
import RoomList from './pages/room/RoomList';
import Home from './pages/home/Home';

function App(){
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/room-list" element={<RoomList></RoomList>} />

        {/* need to verify the path and the component for the room list page when merging */}
        {/* <Route path="/room-list/:id" element={<RoomDetail></RoomDetail>} /> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
