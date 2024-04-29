import React, { useEffect } from 'react';

const Player = ({ canvas, squareY, rotation }) => {
  useEffect(() => {
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.translate(50 + 10, squareY + 10);
    ctx.rotate((Math.PI / 180) * rotation);
    ctx.fillStyle = '#407dbf';
    ctx.fillRect(-10, -10, 20, 20);
    ctx.restore();
  }, [canvas, squareY, rotation]);

  return null;
};

export default Player;