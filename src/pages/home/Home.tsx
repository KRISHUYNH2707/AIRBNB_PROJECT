import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Carousel from "./components/carousel/Carousel";
import Places from "./components/places/Places";

function Home(): JSX.Element {
  return (
    <>
      <Header></Header>
      <Carousel></Carousel>
      <Places></Places>
      <Footer></Footer>
    </>
  );
}

export default Home;
