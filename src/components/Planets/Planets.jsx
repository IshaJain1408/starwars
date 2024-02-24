// Home.js

import React, { useState, useEffect } from 'react';
import Slider from './Slider';
import img2 from '../../assets/alderaan.png';
import img3 from '../../assets/yavin4.png';
import img4 from '../../assets/hoth.png';
import img5 from '../../assets/dagobah.png';
import img6 from '../../assets/bespin.png'
import img9 from '../../assets/coruscant.png';
import img7 from '../../assets/endor.png';
import img10 from '../../assets/kamino.png';
import img11 from '../../assets/monarch.png';
import img8 from '../../assets/naboo.png';
import img1 from '../../assets/tatooine.png';


const items = [
  { imageUrl: img1 },
  { imageUrl: img2 },
  { imageUrl: img3 },
  { imageUrl: img4 },
  { imageUrl: img5 },
  { imageUrl: img6 },
  { imageUrl: img7 },
  { imageUrl: img8 },
  { imageUrl: img9 },
  { imageUrl: img10 },
  {imageUrl:img11}
];

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPlanets() {
    try {
      const res = await fetch('https://swapi.dev/api/planets/?format=json');
      const data = await res.json();

      const planetsWithDetails = await Promise.all(
        data.results.map(async (planet, index) => {
          const planetDetailsResponse = await fetch(planet.url);
          const planetDetails = await planetDetailsResponse.json();

          return {
            name: planetDetails.name,
            climate: planetDetails.climate,
            population: planetDetails.population,
            description: planetDetails.terrain,
            imageUrl: items[index].imageUrl,
          };
        })
      );

      setPlanets(planetsWithDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ color: 'black', textAlign: 'center', paddingTop: '40vh' }}>
          <div className="loader"></div>
          Loading...
        </div>
      ) : (
        <Slider items={planets} />
       
      )}

    </>
  );
};

export default Planets;
