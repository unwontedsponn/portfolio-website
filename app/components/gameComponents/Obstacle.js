const Obstacle = ({ x, y, width, height, canvas }) => {
  const ctx = canvas.getContext('2d');

  // Draw the obstacle
  ctx.fillStyle = '#c15564';
  ctx.fillRect(x, y, width, height);

  return null;
};

export default Obstacle;
