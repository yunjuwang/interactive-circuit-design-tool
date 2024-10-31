import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import Settings from "./Settings.js";
import Header from "./Header";
import Canvas from "./Canvas";

function App() {
  // system I/O
  const [input, setInput] = useState("");
  const handleInputChange = (event) => setInput(event.target.value);
  const [output, setOutput] = useState("");
  const handleOutputChange = (event) => setOutput(event.target.value);

  // Base
  const [baseShape, setBaseShape] = useState("");
  const handleBaseShapeChange = (shape) => {
    setBaseShape(shape);
  };
  const [baseSize, setBaseSize] = useState(30);
  const handleBaseSizeChange = (event, newValue) => {
    setBaseSize(newValue);
  };

  return (
    <div className="App">
      <Header />

      <div className="container">
        <div className="section" id="setting-section">
          <div>
            <h1>Settings</h1>

            <Settings
              input={input}
              handleInputChange={handleInputChange}
              output={output}
              handleOutputChange={handleOutputChange}
              baseShape={baseShape}
              handleBaseShapeChange={handleBaseShapeChange}
              baseSize={baseSize}
              handleBaseSizeChange={handleBaseSizeChange}
            />

            <div className="button">
              <Button variant="contained">Generate</Button>
            </div>
          </div>
        </div>

        <div className="section" id="result-section">
          <div>
            <h1>Result</h1>
            {/* <div className="canvas">Display svg img here!</div> */}
            <Canvas />
            <div className="button">
              <Button className="button" variant="contained">
                Export
              </Button>
            </div>
          </div>

          <div>
            <h1>Insruction</h1>
            <div>- Show insructions here!</div>
            <div>- Show insructions here!</div>
            <div>- Show insructions here!</div>
            <div>- </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
