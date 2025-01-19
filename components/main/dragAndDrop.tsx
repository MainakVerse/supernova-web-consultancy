'use client'
import { useRef, useState } from "react";

export default function DragAndDrop({ initialState }) {
  const [data, setData] = useState(initialState);
  const dragItem = useRef(null);
  const dragContainer = useRef(null);

  const handleDragStart = (e, item, container) => {
    dragItem.current = item;
    dragContainer.current = container;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    dragItem.current = null;
    dragContainer.current = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary for dropping to work
  };

  const handleDrop = (e, targetContainer) => {
    e.preventDefault();
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;

    if (!item || !sourceContainer || sourceContainer === targetContainer) return;

    setData((prev) => {
      const newData = { ...prev };

      // Remove item from the source container
      newData[sourceContainer] = newData[sourceContainer].filter((i) => i !== item);

      // Add item to the target container
      newData[targetContainer] = [...newData[targetContainer], item];

      return newData;
    });

    dragItem.current = null;
    dragContainer.current = null;
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around", gap: "1rem" }}>
      {Object.keys(data).map((container, index) => (
        <div
          key={index}
          onDrop={(e) => handleDrop(e, container)}
          onDragOver={handleDragOver}
          style={{
            background: "#f0f0f0",
            padding: "1rem",
            width: 250,
            minHeight: 300,
            border: "2px dashed #ccc",
            borderRadius: 8,
          }}
        >
          <h2 style={{ textAlign: "center", color: "#333" }}>{container}</h2>
          {data[container].map((item, idx) => (
            <div
              key={idx}
              onDragStart={(e) => handleDragStart(e, item, container)}
              onDragEnd={handleDragEnd}
              draggable
              style={{
                userSelect: "none",
                padding: 16,
                margin: "0 0 8px 0",
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
                borderRadius: 4,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                cursor: "move",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
