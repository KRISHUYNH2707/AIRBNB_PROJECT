import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Carousel from './components/carousel/Carousel'
import Places from './components/places/Places'

function Home():JSX.Element {
  return (
    <>
    <Header></Header>
    <Carousel></Carousel>
    <Places></Places>
    <Footer></Footer>
    </>
  )
}

export default Home