
import React, { useRef, useEffect, useState } from 'react';
import './Planets.css';


const Slider = ({ items }) => {
  const slideRef = useRef(null);

  const nextSlide = () => {
    slideRef.current.appendChild(slideRef.current.firstElementChild.cloneNode(true));
    slideRef.current.removeChild(slideRef.current.firstElementChild);
  };

  const prevSlide = () => {
    slideRef.current.prepend(slideRef.current.lastElementChild.cloneNode(true));
    slideRef.current.removeChild(slideRef.current.lastElementChild);
  };

  return (
    <div className='container'>
      <div className='slide' ref={slideRef}>
        {items.map((planet, index) => (
          <div className='item' key={index} style={{ backgroundImage: `url(${planet.imageUrl})` }}>
            <div className='content'>
              <div className="name">{planet.name}</div>
              <div className="des">
                <p>Climate: {planet.climate}</p>
                <p>Population: {planet.population}</p>
              </div>
              <button>See More</button>
            </div>
          </div>
        ))}
      </div>

      <div className='button'>
        <button className="prev" onClick={prevSlide}><i className="fa-solid fa-arrow-left"></i></button>
        <button className="next" onClick={nextSlide}><i className="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  );
}

export default Slider;
