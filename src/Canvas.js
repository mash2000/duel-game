// src/Canvas.js
import React, { useRef, useEffect, useState } from 'react';

const Canvas = ({ onHeroClick }) => {
  const canvasRef = useRef(null);
  const [heroes, setHeroes] = useState([
    {
      x: 50, y: 300, radius: 20, color: 'blue', direction: 1, speed: 2, spellColor: 'blue', shootFrequency: 0.01, shootSpeed: 2, spells: [],
    },
    {
      x: 750, y: 300, radius: 20, color: 'red', direction: -1, speed: 2, spellColor: 'blue', shootFrequency: 0.01, shootSpeed: 2, spells: [],
    },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      heroes.forEach(hero => {
        hero.y += hero.direction * hero.speed;

        // Простейшие столкновения с краями экрана
        if (hero.y + hero.radius > canvas.height || hero.y - hero.radius < 0) {
          hero.direction *= -1;
        }

        ctx.beginPath();
        ctx.arc(hero.x, hero.y, hero.radius, 0, Math.PI * 2);
        ctx.fillStyle = hero.color;
        ctx.fill();
        ctx.closePath();

        hero.spells.forEach((spell, index) => {
          spell.x += spell.direction * spell.speed;

          // Убираем заклинание, если оно улетело за край экрана
          if (spell.x > canvas.width || spell.x < 0) {
            hero.spells.splice(index, 1);
          }

          ctx.beginPath();
          ctx.arc(spell.x, spell.y, spell.radius, 0, Math.PI * 2);
          ctx.fillStyle = spell.color;
          ctx.fill();
          ctx.closePath();
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [heroes]);

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    setHeroes(prevHeroes => prevHeroes.map(hero => {
      const dist = Math.sqrt((hero.x - mouseX) ** 2 + (hero.y - mouseY) ** 2);
      if (dist < hero.radius) {
        // Выпускаем заклинание
        const spell = {
          x: hero.x,
          y: hero.y,
          radius: 5,
          color: hero.color,
          direction: hero.direction,
          speed: hero.shootSpeed,
        };
        return { ...hero, spells: [...hero.spells, spell] };
      }
      return hero;
    }));

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
    />
  );
};

export default Canvas;