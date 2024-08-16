// src/HeroProperties.js
import React from 'react';

const HeroProperties = ({ selectedHero, onChange }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...selectedHero, [name]: value });
  };

  return (
    <div>
      {selectedHero && (
        <div>
          <h2>Hero {selectedHero.color}</h2>
          <label>
            Shoot Color:
            <input
              type="color"
              name="color"
              value={selectedHero.color}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Speed X:
            <input
              type="number"
              name="speedX"
              value={selectedHero.speedX}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Speed Y:
            <input
              type="number"
              name="speedY"
              value={selectedHero.speedY}
              onChange={handleInputChange}
            />
          </label>
          <br />
        </div>
      )}
    </div>
  );
};

export default HeroProperties;