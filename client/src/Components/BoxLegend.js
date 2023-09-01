import React from "react";

const BoxLegend = ({
  boxes,
  selectedBoxIndices,
  setSelectedBoxIndices,
  selectedLegendIndex,
  setSelectedLegendIndex,
  setBoxes,
}) => {
  const toggleSelectedBox = (index) => {
    const newSelectedBoxIndices = selectedBoxIndices.includes(index)
      ? selectedBoxIndices.filter((i) => i !== index)
      : [...selectedBoxIndices, index];

    // Update the state
    setSelectedBoxIndices(newSelectedBoxIndices);

    // Set the selected legend index
    setSelectedLegendIndex(index);
  };
  const removeBox = (index) => {
    setBoxes((prevBoxes) => prevBoxes.filter((_, i) => i !== index));
  };
  return (
    <div className="legend-container">
      {boxes.map((box, index) => (
        <div
          key={index}
          className={`legend ${
            selectedLegendIndex === index ? "selected-legend" : ""
          }`}
          onClick={() => toggleSelectedBox(index)}
        >
          <span
            className="legend-dot"
            style={{ backgroundColor: box.color }}
          ></span>
          {box.className}
          <button
            className="legend-close"
            onClick={(e) => {
              e.stopPropagation();
              removeBox(index);
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default BoxLegend;
