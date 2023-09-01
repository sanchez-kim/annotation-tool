import React, { useEffect } from "react";
import { drawImage, drawBoxes } from "./drawHelpers";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "./mouseEventHandlers";
import { isInsideBox, isNearCorner } from "./boxUtils";

const Canvas = ({
  canvasRef,
  drawing,
  setDrawing,
  resizing,
  setResizing,
  moving,
  setMoving,
  boxes,
  setBoxes,
  selectedBoxIndex,
  setSelectedBoxIndex,
  selectedBoxIndices,
  setSelectedBoxIndices,
  startX,
  setStartX,
  startY,
  setStartY,
  endX,
  setEndX,
  endY,
  setEndY,
  image,
  currentColor,
  currentClass,
}) => {
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawImage(ctx, image, canvasRef.current);
    drawBoxes(ctx, boxes, selectedBoxIndices);
  }, [boxes, image, selectedBoxIndices]);
  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="600"
      onMouseDown={(e) =>
        handleMouseDown({
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
        })
      }
      onMouseMove={(e) =>
        handleMouseMove({
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
        })
      }
      onMouseUp={() =>
        handleMouseUp({
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
        })
      }
    />
  );
};

export default Canvas;
