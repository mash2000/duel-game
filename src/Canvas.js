// src/Canvas.js
import React, { useRef, useEffect, useState } from 'react';

const Canvas = ({ onHeroClick }) => {
  const canvasRef = useRef(null);
  const [heroes] = useState([
    {
      x: 50, y: 300, radius: 20, color: 'blue', direction: 1, shootDirection: -1, speed: 2, spellRadius: 5, spellColor: '#0000ff', shootFrequency: 0.05, shootSpeed: 5, spells: [],
    },
    {
      x: 750, y: 300, radius: 20, color: 'red', direction: -1, shootDirection: 1, speed: 2, spellRadius: 5, spellColor: '#ff0000', shootFrequency: 0.05, shootSpeed: 5, spells: [],
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

        // Стрельба
        if (Math.random() < hero.shootFrequency) {
          hero.spells.push({ x: hero.x, y: hero.y, radius: hero.spellRadius, speed: hero.shootSpeed, color: hero.spellColor });
        }

        // Обновление позиции пуль
        hero.spells.forEach((spell, index) => {
          if (spell.x > canvas.width || spell.x < 0) {
            hero.spells.splice(index, 1);
          }
          spell.x -= spell.speed * hero.shootDirection;
        });

        // Отрисовка пуль
        hero.spells.forEach(spell => {
          ctx.beginPath();
          ctx.arc(spell.x, spell.y, 3, 0, 2 * Math.PI);
          ctx.fillStyle = spell.color;
          ctx.fill();
        });

        console.log(hero.spells);
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