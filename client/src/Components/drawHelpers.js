export const drawImage = (ctx, image, canvas) => {
  if (image) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
};
export const drawBoxes = (ctx, boxes, selectedBoxIndices) => {
  boxes.forEach((box, index) => {
    ctx.lineWidth = 3;
    ctx.strokeStyle = box.color;
    ctx.strokeRect(box.startX, box.startY, box.width, box.height);

    if (selectedBoxIndices.includes(index)) {
      ["nw", "ne", "sw", "se"].forEach((corner) => {
        let x, y;
        if (corner.includes("n")) y = box.startY;
        else y = box.startY + box.height;
        if (corner.includes("w")) x = box.startX;
        else x = box.startX + box.width;

        ctx.fillStyle = "#FFF";
        ctx.fillRect(x - 5, y - 5, 10, 10);
        ctx.strokeRect(x - 5, y - 5, 10, 10);
      });
    }
    ctx.fillStyle = box.color;
    ctx.font = "20px Arial";
    ctx.fillText(box.className, box.startX, box.startY - 5);
  });
};
