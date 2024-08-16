// src/App.js
import React, { useState } from 'react';
import Canvas from './Canvas';
import HeroProperties from './HeroProperties';

const App = () => {
  const [selectedHero, setSelectedHero] = useState(null);

  const handleHeroClick = (hero) => {
    setSelectedHero(hero);
  };

  return (
    <div>
      <h1 class="title">Duel-Game</h1>
      <Canvas onHeroClick={handleHeroClick} />
      <HeroProperties selectedHero={selectedHero} onChange={handleHeroClick} />
    </div>
  );
};

export default App;