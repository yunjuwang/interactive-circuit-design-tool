import "./App.css";
import { useState } from "react";
import Header from "./Header";
import Canvas from "./Canvas";
import SearchIconsDialog from "./Dialog.js";
import { InputSelect, OutputSelect } from "./SystemIO.js";
import { BaseShapeButtons, BaseSizeSlider } from "./Base.js";
import { CircuitList } from "./Circuit.js";
import { ExportButton } from "./Export.js";

function App() {
  // system I/O
  const [input, setInput] = useState("");
  const handleInputChange = (event) => setInput(event.target.value);
  const [output, setOutput] = useState("");
  const handleOutputChange = (event) => setOutput(event.target.value);

  // Base
  const [baseShape, setBaseShape] = useState("");
  const handleBaseShapeChange = (shape) => setBaseShape(shape);
  const [baseSize, setBaseSize] = useState(400);
  const handleBaseSizeChange = (event, newValue) => setBaseSize(newValue);

  // Circuit
  const [currCircuitId, setCurrCircuitId] = useState(0);
  const [circuits, setCircuits] = useState([]);
  const handleAddCircuit = (selectedIcon) => {
    setCircuits([
      ...circuits, // old items
      {
        id: currCircuitId,
        shape: selectedIcon,
        size: 300,
        x: 0,
        y: 0,
        scaleX: 0.5,
        scaleY: 0.5,
        rotate: 0,
      },
    ]);
    setCurrCircuitId(currCircuitId + 1);
  };
  const handleEditCircuit = (editId, newCircuit) => {
    setCircuits(
      circuits.map((circuit) => (circuit.id == editId ? newCircuit : circuit))
    );
  };
  const handleRemoveCircuit = (removeId) =>
    setCircuits(circuits.filter((circuit) => circuit.id != removeId));

  //Select Icon Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleClickSelect = (selectedIcon) => {
    handleAddCircuit(selectedIcon);
    setOpenDialog(false);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="section" id="setting-section">
          <div>
            <h1>Settings</h1>

            <div id="settings">
              <h2>Base</h2>
              <div className="section">
                <BaseShapeButtons
                  baseShape={baseShape}
                  handleBaseShapeChange={handleBaseShapeChange}
                />
                <BaseSizeSlider
                  baseSize={baseSize}
                  handleBaseSizeChange={handleBaseSizeChange}
                />
              </div>
              <h2>Circuit</h2>
              <CircuitList
                circuits={circuits}
                handleClickAddCircuit={handleClickOpenDialog}
                handleEditCircuit={handleEditCircuit}
                handleRemoveCircuit={handleRemoveCircuit}
              />
              <SearchIconsDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                handleSelect={handleClickSelect}
              />
              <h2>System I/O</h2>
              <InputSelect
                input={input}
                handleInputChange={handleInputChange}
              />
              <OutputSelect
                output={output}
                handleOutputChange={handleOutputChange}
              />
            </div>
          </div>
        </div>

        <div className="section" id="result-section">
          <div>
            <h1>Result</h1>
            {/* <div className="canvas">Display svg img here!</div> */}
            <Canvas
              baseShape={baseShape}
              baseSize={baseSize}
              circuits={circuits}
            />
            <div className="button">
              <ExportButton />
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
