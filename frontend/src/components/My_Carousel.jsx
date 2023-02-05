import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

import '../sass/componentsSass/My_Carousel.scss'


function My_Carousel({ widthCarrousel, heightCarousel }) {
  const arrayImagCarrousel = [
    {
      img: 'imgCarousel0.jpg',
      text: 'The Beatles: Pop culture'
    },
    {
      img: 'imgCarousel1.jpg',
      text: 'The Beatles" 1962-1970'
    },
    {
      img: 'imgCarousel2.webp',
      text: 'The Beatles: Countercultural and hippy movement'
    },
    {
      img: 'imgCarousel3.webp',
      text: 'The Beatles: Unmatched'
    },
    {
      img: 'imgCarousel4.webp',
      text: 'The Beatles: Rooftop concert'
    },
    {
      img: 'imgCarousel5.jpg',
      text: "The Beatles: Sgt. Pepper's Lonely Hearts Club Band"
    },
    {
      img: 'imgCarousel6.webp',
      text: "The Beatles: Get Back"
    },
    {
      img: 'imgCarousel7.jpg',
      text: "The Beatles: Inspirations"
    },
    {
      img: 'imgCarousel8.jpg',
      text: 'The Beatles: Album "Abbey_Road"'
    },
    {
      img: 'imgCarousel9.png',
      text: 'The Beatles: Album "Revolver"'
    }
  ]
  return (
    <Carousel className="contMyCarousel" slide="true" indicators="false" wrap="true" fade="true" interval="4000" width={widthCarrousel} height={heightCarousel}>
      {
        arrayImagCarrousel.map((elem, index) => {
          return (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={`./src/images/theBeatles/carousel/${elem.img}`} alt={`Slide ${index + 1}`} />
              <Carousel.Caption>
                <h3>{elem.text}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}


export default My_Carousel
