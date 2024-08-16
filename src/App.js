// src/App.js
import React, { useState } from 'react';
import Canvas from './Canvas';

const App = () => {
  const [selectedHero, setSelectedHero, setHeroColor, setHeroFrequency, setHeroSpeed] = useState(null);

  const handleHeroClick = (hero) => {
    setSelectedHero(hero);
  };

  const handleColorChange = (color) => {
    setHeroColor(color);
  };

  const handleShootFrequencyChange = (shootFrequency) => {
    setHeroFrequency(shootFrequency);
  };

  const handleSpeedChange = (hero) => {
    setHeroSpeed(hero.speed);
  };

  return (
    <div>
      <h1 class="title">Duel-Game</h1>
      <Canvas onHeroClick={handleHeroClick} />
      {selectedHero && (
        <div>
          <div className="controls">
            <h2>Hero {selectedHero.color}</h2>
            <div>
              <label>Spell Color:</label>
              <input type="color" value={selectedHero.color} onChange={(e) => handleColorChange(selectedHero.color)} />
            </div>
            <div>
              <label>Shoot Frequency:</label>
              <input type="range" min="0.01" max="0.2" step="0.01" value={selectedHero.shootFrequency} onChange={(e) => handleShootFrequencyChange(selectedHero.shootFrequency)} />
            </div>
            <div>
              <label>Speed:</label>
              <input type="range" min="1" max="5" step="1" value={selectedHero.speed} onChange={(e) => handleSpeedChange(selectedHero.speed)} />
            </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default App;