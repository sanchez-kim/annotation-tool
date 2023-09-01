export const handleMouseDown = ({
  e,
  boxes,
  setSelectedBoxIndices,
  setResizing,
  setMoving,
  setDrawing,
  isInsideBox,
  isNearCorner,
  setStartX,
  setStartY,
}) => {
  const x = e.clientX - e.target.getBoundingClientRect().left;
  const y = e.clientY - e.target.getBoundingClientRect().top;

  const selectedIndex = boxes.findIndex((box) => isInsideBox(x, y, box));

  if (selectedIndex !== -1) {
    if (e.shiftKey) {
      setSelectedBoxIndices((prevSelected) => {
        if (prevSelected.includes(selectedIndex)) {
          return prevSelected.filter((idx) => idx !== selectedIndex);
        } else {
          return [...prevSelected, selectedIndex];
        }
      });
    } else {
      if (isNearCorner(x, y, boxes[selectedIndex])) {
        setResizing(true);
      } else {
        setMoving(true);
      }
      setSelectedBoxIndices([selectedIndex]);
      setMoving(true);
    }
  } else {
    setDrawing(true);
  }

  setStartX(x);
  setStartY(y);
};
export const handleMouseMove = ({
  e,
  setEndX,
  setEndY,
  canvasRef,
  image,
  boxes,
  selectedBoxIndices,
  currentColor,
  drawImage,
  drawBoxes,
  setBoxes,
  setStartX,
  setStartY,
  startX,
  startY,
  resizing,
  drawing,
  moving,
}) => {
  if (!e.target) return;
  const x = e.clientX - e.target.getBoundingClientRect().left;
  const y = e.clientY - e.target.getBoundingClientRect().top;

  setEndX(x);
  setEndY(y);

  const ctx = canvasRef.current.getContext("2d");
  drawImage(ctx, image, canvasRef.current);
  drawBoxes(ctx, boxes, selectedBoxIndices);

  if (resizing && selectedBoxIndices.length > 0) {
    const newBoxes = [...boxes];
    selectedBoxIndices.forEach((selectedIndex) => {
      const box = newBoxes[selectedIndex];

      // Determine which corner or edge is near the cursor
      const isNearTop = Math.abs(y - box.startY) < 10;
      const isNearLeft = Math.abs(x - box.startX) < 10;

      if (isNearTop) {
        const newHeight = box.startY + box.height - y;
        box.startY = y;
        box.height = newHeight;
      } else {
        box.height = y - box.startY;
      }

      if (isNearLeft) {
        const newWidth = box.startX + box.width - x;
        box.startX = x;
        box.width = newWidth;
      } else {
        box.width = x - box.startX;
      }
    });

    setBoxes(newBoxes);
    drawBoxes(ctx);
  } else if (moving && selectedBoxIndices.length > 0) {
    const deltaX = x - startX;
    const deltaY = y - startY;

    const newBoxes = [...boxes];
    selectedBoxIndices.forEach((selectedIndex) => {
      newBoxes[selectedIndex].startX += deltaX;
      newBoxes[selectedIndex].startY += deltaY;
    });

    setBoxes(newBoxes);
    drawBoxes(ctx);

    setStartX(x);
    setStartY(y);
  } else if (drawing) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = currentColor;
    ctx.strokeRect(startX, startY, x - startX, y - startY);
  }
};
export const handleMouseUp = ({
  setResizing,
  setMoving,
  setDrawing,
  resizing,
  drawing,
  startX,
  startY,
  endX,
  endY,
  currentColor,
  currentClass,
  setBoxes,
  setSelectedBoxIndices,
  setSelectedBoxIndex,
  boxes,
}) => {
  setResizing(false);
  setMoving(false);
  setDrawing(false);
  if (resizing) {
    setSelectedBoxIndex(null);
  } else if (drawing) {
    const newBox = {
      startX,
      startY,
      width: endX - startX,
      height: endY - startY,
      color: currentColor,
      className: currentClass,
    };
    setBoxes((prevBoxes) => [...prevBoxes, newBox]);
    setSelectedBoxIndices([boxes.length]);
  }
};
