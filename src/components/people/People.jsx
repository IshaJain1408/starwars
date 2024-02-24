import React, { useState, useEffect } from 'react';
import './people.css'
const People = () => {
  const [planets, setPlanets] = useState([]);
  const [residentData, setResidentData] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/?format=json');
        const data = await response.json();

        // Set the planets data in state
        setPlanets(data.results);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  const fetchResidentData = async (residents) => {
    try {
      const residentDataPromises = residents.map(async (residentUrl) => {
        const response = await fetch(residentUrl);
        return response.json();
      });

      // Wait for all promises to resolve
      const resolvedResidentData = await Promise.all(residentDataPromises);

      // Update state with the formatted resident data
      setResidentData(
        resolvedResidentData.map(resident => ({
          name: resident.name,
          height: resident.height,
          mass: resident.mass,
          hairColor: resident.hair_color,
          skinColor: resident.skin_color,
          // Add more properties as needed
        }))
      );
    } catch (error) {
      console.error('Error fetching resident data:', error);
    }
  };

  return (
    <div className="container2">
      <h2>Planets and Residents</h2>
      {/* <div className="scroll-down-message">
        <p>Scroll down to see the Formatted Resident Data.</p>
      </div> */}
      {residentData.length > 0 && (
        <div className="scroll-down-message">
          <p>Scroll down to see the Formatted Resident Data</p>
        </div>)}
      <p></p>
      <ul>
        {planets.map((planet) => (
          <li key={planet.name} className="planet-item">
            <strong>{planet.name}</strong>
            <p>Residents:</p>
            <ul>
              {planet.residents.map((residentUrl, index) => (
                <li key={index}>
                  <button  className ="button-container" onClick={() => fetchResidentData([residentUrl])}>
                    View Resident Data
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Display formatted resident data */}
      <div className="resident-data">
        <h3>Formatted Resident Data</h3>
        <ul>
          {residentData.map((resident, index) => (
            <li key={index} className="resident-item">
              <p>Name: {resident.name}</p>
              <p>Height: {resident.height}</p>
              <p>Mass: {resident.mass}</p>
              <p>Hair Color: {resident.hairColor}</p>
              <p>Skin Color: {resident.skinColor}</p>
              {/* Add more properties as needed */}
            </li>
          ))}
        </ul>
      </div>
    
    </div>
  );
};

export default People;
