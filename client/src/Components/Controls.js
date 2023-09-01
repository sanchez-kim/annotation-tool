import React, { useEffect } from "react";

const Control = ({
  currentColor,
  setCurrentColor,
  currentClass,
  setCurrentClass,
  setImage,
  drawImage,
  canvasRef,
  selectedLegendIndex,
  removeBox,
  setSelectedLegendIndex,
  setBoxes,
  selectedBoxIndices,
  setSelectedBoxIndices,
}) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        drawImage(canvasRef.current.getContext("2d"), img, canvasRef.current);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Delete") {
      if (selectedLegendIndex !== null) {
        removeBox(selectedLegendIndex);
        setSelectedLegendIndex(null);
      } else {
        setBoxes((prevBoxes) =>
          prevBoxes.filter((_, index) => !selectedBoxIndices.includes(index))
        );
        setSelectedBoxIndices([]);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedBoxIndices,
    selectedLegendIndex,
    removeBox,
    setBoxes,
    setSelectedBoxIndices,
    setSelectedLegendIndex,
  ]);
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <label>Color: </label>
      <input
        type="color"
        value={currentColor}
        onChange={(e) => setCurrentColor(e.target.value)}
      />
      <label>Class: </label>
      <input
        type="text"
        value={currentClass}
        onChange={(e) => setCurrentClass(e.target.value)}
      />
    </div>
  );
};

export default Control;
