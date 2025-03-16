import React, { useRef, useState } from "react";
import  {ReactSketchCanvas}  from "react-sketch-canvas";
import "./CanvasComponent.css";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [strokeColor, setStrokeColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [text, setText] = useState("");

  // Change Stroke Color
  const changeColor = (color) => {
    setIsEraser(false);
    canvasRef.current.eraseMode(false);
    setStrokeColor(color);
  };

  // Enable Eraser
  const enableEraser = () => {
    setIsEraser(true);
    canvasRef.current.eraseMode(true);
  };

  // Save Image
  const saveImage = async () => {
    const image = await canvasRef.current.exportImage("png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "doodle.png";
    link.click();
  };

  // Add Text
  const addText = async () => {
    if (text.trim() !== "") {
      await canvasRef.current.addText(text, {
        left: 100,
        top: 100,
        fill: strokeColor,
        fontSize: strokeWidth * 5,
      });
      setText("");
    }
  };

  return (
    <div className="canvas-container">
      <div className="canvas-wrapper">
        <ReactSketchCanvas
          ref={canvasRef}
          style={{ border: "2px solid black", width: "800px", height: "600px" }}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          eraserWidth={10}
          backgroundColor="white"
        />
      </div>

      {/* Controls */}
      <div className="controls">
        <button onClick={() => canvasRef.current.clearCanvas()} className="btn btn-danger">
          Clear
        </button>
        <button onClick={() => canvasRef.current.undo()} className="btn btn-primary">
          Undo
        </button>
        <button onClick={() => canvasRef.current.redo()} className="btn btn-success">
          Redo
        </button>
        <button onClick={enableEraser} className={`btn ${isEraser ? "btn-dark" : "btn-light"}`}>
          Eraser
        </button>
        <button onClick={saveImage} className="btn btn-purple">
          Save
        </button>
      </div>

      {/* Color & Brush Size */}
      <div className="color-picker">
        {["black", "red", "blue", "green", "yellow"].map((color) => (
          <button
            key={color}
            onClick={() => changeColor(color)}
            className="color-btn"
            style={{ backgroundColor: color }}
          />
        ))}
        <select onChange={(e) => setStrokeWidth(parseInt(e.target.value))} className="brush-size">
          {[2, 4, 6, 8, 10].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>

      {/* Add Text */}
      {/* <div className="text-input">
        <input
          type="text"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addText} className="btn btn-indigo">
          Add Text
        </button>
      </div> */}
    </div>
  );
};

export default CanvasComponent;
