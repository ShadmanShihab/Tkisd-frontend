import { set } from 'lodash';
import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const slides = [
  {
    url: 'https://images.pexels.com/photos/819519/pexels-photo-819519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    url: 'https://images.pexels.com/photos/1320755/pexels-photo-1320755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    url: 'https://images.pexels.com/photos/800658/pexels-photo-800658.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
  },
];

const HeroCarousel = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const prevSlide = () => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };
  // const nextSlide = () => {
  //   const isLastSlide = currentIndex === slides.length - 1;
  //   const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //   setCurrentIndex(newIndex);
  // };

  // const gotoSlide = slideIndex => {
  //   setCurrentIndex(slideIndex);
  // };

  return (
    <div className="hero-section">
      <div style={{ backgroundImage: `url(${slides[0].url})` }} className="img-container"></div>

      {/* For working carousel comment above div and uncomment below divs */}

      {/* <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className="img-container"></div>
      
      {/* left arrow */}
      {/* <div className="arrow-position left">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div> */}
      {/* right arrow */}
      {/* <div className="arrow-position right">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="carousel-dot">
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => gotoSlide(slideIndex)} className="dots">
            <RxDotFilled />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default HeroCarousel;
