import React from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Carousel from "./home/components/carousel/Carousel";
import Places from "./home/components/places/Places";

export default function AirBnb() {
  return (
    <>
      <Header></Header>
      <Carousel></Carousel>
      <Places></Places>
      <Footer></Footer>
    </>
  );
}
