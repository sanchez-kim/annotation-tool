export const isInsideBox = (x, y, box) => {
  const margin = 10;
  return (
    x >= box.startX - margin &&
    x <= box.startX + box.width + margin &&
    y >= box.startY - margin &&
    y <= box.startY + box.height + margin
  );
};
export const isNearCorner = (x, y, box, margin = 10) => {
  const topLeft = { x: box.startX, y: box.startY };
  const topRight = { x: box.startX + box.width, y: box.startY };
  const bottomLeft = { x: box.startX, y: box.startY + box.height };
  const bottomRight = {
    x: box.startX + box.width,
    y: box.startY + box.height,
  };

  const corners = [topLeft, topRight, bottomLeft, bottomRight];

  return corners.some(
    (corner) =>
      Math.abs(x - corner.x) <= margin && Math.abs(y - corner.y) <= margin
  );
};
