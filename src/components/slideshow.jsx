import React from "react";
import { Slide } from "react-slideshow-image";

import "./home.css";

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
};

const Slideshow = ({ slides }) => {
  return (
    <div className="slide-container">
      <Slide {...properties}>
        {slides.map((slide) => (
          <div key={slide.description} className="each-slide">
            <div style={{ backgroundImage: `url(${slide.image})` }}></div>
            <span>{slide.description}</span>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
