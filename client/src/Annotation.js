import React, { useRef, useState, useEffect } from "react";
import Canvas from "./Components/Canvas";
import Control from "./Components/Controls";
import BoxLegend from "./Components/BoxLegend";
import { drawImage, drawBoxes } from "./Components/drawHelpers";
import "./Annotation.css";

const Annotation = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [image, setImage] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [currentColor, setCurrentColor] = useState("#00FF62");
  const [currentClass, setCurrentClass] = useState("text");
  const [selectedBoxIndices, setSelectedBoxIndices] = useState([]);
  const [moving, setMoving] = useState(false);
  const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawImage(ctx, image, canvasRef.current);
    drawBoxes(ctx, boxes, selectedBoxIndices);
  }, [boxes, image, selectedBoxIndices]);
  //     const x = e.clientX - e.target.getBoundingClientRect().left;
  //     const y = e.clientY - e.target.getBoundingClientRect().top;

  //     const selectedIndex = boxes.findIndex((box) => isInsideBox(x, y, box));

  //     if (selectedIndex !== -1) {
  //       if (e.shiftKey) {
  //         setSelectedBoxIndices((prevSelected) => {
  //           if (prevSelected.includes(selectedIndex)) {
  //             return prevSelected.filter((idx) => idx !== selectedIndex);
  //           } else {
  //             return [...prevSelected, selectedIndex];
  //           }
  //         });
  //       } else {
  //         if (isNearCorner(x, y, boxes[selectedIndex])) {
  //           setResizing(true);
  //         } else {
  //           setMoving(true);
  //         }
  //         setSelectedBoxIndices([selectedIndex]);
  //         setMoving(true);
  //       }
  //     } else {
  //       setDrawing(true);
  //     }

  //     setStartX(x);
  //     setStartY(y);
  //   };

  //   const handleMouseMove = (e) => {
  //     const x = e.clientX - e.target.getBoundingClientRect().left;
  //     const y = e.clientY - e.target.getBoundingClientRect().top;

  //     setEndX(x);
  //     setEndY(y);

  //     const ctx = canvasRef.current.getContext("2d");
  //     drawImage(ctx, image, canvasRef.current);
  //     drawBoxes(ctx);

  //     if (resizing && selectedBoxIndices.length > 0) {
  //       const newBoxes = [...boxes];
  //       selectedBoxIndices.forEach((selectedIndex) => {
  //         const box = newBoxes[selectedIndex];

  //         // Determine which corner or edge is near the cursor
  //         const isNearTop = Math.abs(y - box.startY) < 10;
  //         const isNearLeft = Math.abs(x - box.startX) < 10;

  //         if (isNearTop) {
  //           const newHeight = box.startY + box.height - y;
  //           box.startY = y;
  //           box.height = newHeight;
  //         } else {
  //           box.height = y - box.startY;
  //         }

  //         if (isNearLeft) {
  //           const newWidth = box.startX + box.width - x;
  //           box.startX = x;
  //           box.width = newWidth;
  //         } else {
  //           box.width = x - box.startX;
  //         }
  //       });

  //       setBoxes(newBoxes);
  //       drawBoxes(ctx);
  //     } else if (moving && selectedBoxIndices.length > 0) {
  //       const deltaX = x - startX;
  //       const deltaY = y - startY;

  //       const newBoxes = [...boxes];
  //       selectedBoxIndices.forEach((selectedIndex) => {
  //         newBoxes[selectedIndex].startX += deltaX;
  //         newBoxes[selectedIndex].startY += deltaY;
  //       });

  //       setBoxes(newBoxes);
  //       drawBoxes(ctx);

  //       setStartX(x);
  //       setStartY(y);
  //     } else if (drawing) {
  //       ctx.lineWidth = 3;
  //       ctx.strokeStyle = currentColor;
  //       ctx.strokeRect(startX, startY, x - startX, y - startY);
  //     }
  //   };

  //   const handleMouseUp = () => {
  //     setResizing(false);
  //     setMoving(false);
  //     setDrawing(false);
  //     if (resizing) {
  //       setSelectedBoxIndex(null);
  //     } else if (drawing) {
  //       const newBox = {
  //         startX,
  //         startY,
  //         width: endX - startX,
  //         height: endY - startY,
  //         color: currentColor,
  //         className: currentClass,
  //       };
  //       setBoxes((prevBoxes) => [...prevBoxes, newBox]);
  //       setSelectedBoxIndices([boxes.length]);
  //     }
  //   };

  useEffect(() => {
    setSelectedBoxIndices([boxes.length - 1]);
  }, [boxes]);

  const removeBox = (index) => {
    setBoxes((prevBoxes) => prevBoxes.filter((_, i) => i !== index));
  };

  const deleteSelectedBox = () => {
    setBoxes((prevBoxes) =>
      prevBoxes.filter((_, index) => !selectedBoxIndices.includes(index))
    );
    setSelectedBoxIndices([]);
  };

  const saveAnnotation = () => {
    // TODO: Send boxes to the server
    console.log(boxes);
  };

  return (
    <div>
      <Control
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        currentClass={currentClass}
        setCurrentClass={setCurrentClass}
        setImage={setImage}
        drawImage={drawImage}
        canvasRef={canvasRef}
        selectedLegendIndex={selectedLegendIndex}
        removeBox={removeBox}
        setSelectedLegendIndex={setSelectedLegendIndex}
        setBoxes={setBoxes}
        selectedBoxIndices={selectedBoxIndices}
        setSelectedBoxIndices={setSelectedBoxIndices}
      />
      <Canvas
        canvasRef={canvasRef}
        drawing={drawing}
        setDrawing={setDrawing}
        resizing={resizing}
        setResizing={setResizing}
        moving={moving}
        setMoving={setMoving}
        boxes={boxes}
        setBoxes={setBoxes}
        selectedBoxIndex={selectedBoxIndex}
        setSelectedBoxIndex={setSelectedBoxIndex}
        selectedBoxIndices={selectedBoxIndices}
        setSelectedBoxIndices={setSelectedBoxIndices}
        startX={startX}
        setStartX={setStartX}
        startY={startY}
        setStartY={setStartY}
        endX={endX}
        setEndX={setEndX}
        endY={endY}
        setEndY={setEndY}
        image={image}
        currentColor={currentColor}
        currentClass={currentClass}
      />
      <BoxLegend
        boxes={boxes}
        selectedBoxIndices={selectedBoxIndices}
        setSelectedBoxIndices={setSelectedBoxIndices}
        selectedLegendIndex={selectedLegendIndex}
        setSelectedLegendIndex={setSelectedLegendIndex}
        setBoxes={setBoxes}
      />
      <button onClick={saveAnnotation}>Save Annotation</button>
      <button onClick={deleteSelectedBox}>Delete Selected Box</button>
    </div>
  );
};

export default Annotation;
