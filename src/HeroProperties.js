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
          <h2>Hero {selectedHero.spellColor}</h2>
          <label>
            Shoot Color:
            <input
              type="color"
              name="spellColor"
              value={selectedHero.spellColor}
              onChange={handleInputChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default HeroProperties;