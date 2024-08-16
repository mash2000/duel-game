// src/App.js
import React, { useState } from 'react';
import Canvas from './Canvas';

const App = () => {
  const handleHeroClick = (hero) => {
    alert(`¬ы нажали на геро€: ${hero.color}`);
    // «десь вы можете добавить логику дл€ атаки или других действий.
  };

  const [heroConfigs, setHeroConfigs] = useState([
    { spellColor: 'green', shootFrequency: 0.01, speed: 2 },
    { spellColor: 'purple', shootFrequency: 0.01, speed: 2 },
  ]);

  const handleColorChange = (index, color) => {
    setHeroConfigs(heroConfigs.map((config, i) => i === index ? { ...config, spellColor: color } : config));
  };

  const handleShootFrequencyChange = (index, frequency) => {
    setHeroConfigs(heroConfigs.map((config, i) => i === index ? { ...config, shootFrequency: frequency } : config));
  };

  const handleSpeedChange = (index, speed) => {
    setHeroConfigs(heroConfigs.map((config, i) => i === index ? { ...config, speed: speed } : config));
  };

  return (
    <div>
      <Canvas onHeroClick={handleHeroClick} heroConfigs={heroConfigs} />
      <div className="controls">
        {heroConfigs.map((config, index) => (
          <div key={index}>
            <h2>Hero {index + 1}</h2>
            <div>
              <label>Spell Color:</label>
              <input type="color" value={config.spellColor} onChange={(e) => handleColorChange(index, e.target.value)} />
            </div>
            <div>
              <label>Shoot Frequency:</label>
              <input type="range" min="0.01" max="0.2" step="0.01" value={config.shootFrequency} onChange={(e) => handleShootFrequencyChange(index, +e.target.value)} />
            </div>
            <div>
              <label>Speed:</label>
              <input type="range" min="1" max="5" step="1" value={config.speed} onChange={(e) => handleSpeedChange(index, +e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;