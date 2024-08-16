// src/Canvas.js
import React, { useRef, useEffect, useState } from 'react';

const Canvas = ({ onHeroClick, heroConfigs }) => {
  const canvasRef = useRef(null);
  const [heroes, setHeroes] = useState([
    {
      x: 50, y: 300, radius: 20, color: 'blue', direction: 1, speed: 2, spells: [],
    },
    {
      x: 750, y: 300, radius: 20, color: 'red', direction: -1, speed: 2, spells: [],
    },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      heroes.forEach(hero => {
        hero.x += hero.direction * hero.speed;
        
        // Простейшие столкновения с краями экрана
        if (hero.x + hero.radius > canvas.width || hero.x - hero.radius < 0) {
          hero.direction *= -1;
        }

        ctx.beginPath();
        ctx.arc(hero.x, hero.y, hero.radius, 0, Math.PI * 2);
        ctx.fillStyle = hero.color;
        ctx.fill();
        ctx.closePath();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const update = () => {
      setHeroes((currentHeroes) => {
        return currentHeroes.map((hero, index) => {
          let newY = hero.y + hero.direction * hero.speed;
          if (newY - hero.radius < 0 || newY + hero.radius > canvas.height) {
            hero.direction *= -1;
            newY = hero.y + hero.direction * hero.speed;
          }

          let newSpells = hero.spells.map(spell => ({
            ...spell,
            x: spell.x + (index === 0 ? 4 : -4),
          })).filter(spell => spell.x > 0 && spell.x < canvas.width);

          if (Math.random() < heroConfigs[index].shootFrequency) {
            newSpells.push({
              x: hero.x + (index === 0 ? hero.radius + 5 : -hero.radius - 5),
              y: hero.y,
              radius: 5,
              color: heroConfigs[index].spellColor,
            });
          }

          return {
            ...hero,
            y: newY,
            spells: newSpells,
          };
        });
      });
    };

    const render = () => {
      draw();
      update();
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [heroConfigs, heroes]);

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    heroes.forEach(hero => {
      const dist = Math.sqrt((hero.x - mouseX) ** 2 + (hero.y - mouseY) ** 2);
      if (dist < hero.radius) {
        onHeroClick(hero);
      }
    });
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onClick={handleClick}
      style={{ border: '1px solid black' }}
    />
  );
};

export default Canvas;