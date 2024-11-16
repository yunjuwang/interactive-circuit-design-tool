import "./App.css";
import { useState } from "react";
import Header from "./Header";
import Canvas from "./Canvas";
import SearchIconsDialog from "./Dialog.js";
import { InputSelect, OutputSelect } from "./SystemIO.js";
import { BaseShapeButtons, BaseSizeSlider } from "./Base.js";
import { CircuitList } from "./Circuit.js";
import { ExportButton } from "./Export.js";

import { Instruction, Step, GetWireColor } from "./Instruction.js";

function App() {
  // system I/O
  const [input, setInput] = useState("");
  const handleInputChange = (event) => setInput(event.target.value);
  const [output, setOutput] = useState("");
  const handleOutputChange = (event) => setOutput(event.target.value);

  // Base
  const [baseShape, setBaseShape] = useState("");
  const handleBaseShapeChange = (shape) => setBaseShape(shape);

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
      <Instruction>
        <Step step={1} title="Design Your System" desc="">
          <div className="container">
            <div className="section" id="setting-section">
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
        </Step>
        <Step
          step={2}
          title="Design Your Circuit"
          desc="Design your circuit and export!"
        >
          <div className="container">
            <div className="section" id="circuit-edit-section">
              <div id="settings">
                <h2>Base</h2>
                <div className="section">
                  <BaseShapeButtons
                    baseShape={baseShape}
                    handleBaseShapeChange={handleBaseShapeChange}
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
              </div>
            </div>

            <div className="section" id="circuit-result-section">
              <div>
                <h1>Result</h1>
                <Canvas baseShape={baseShape} circuits={circuits} />
                <div className="button">
                  <ExportButton />
                </div>
              </div>
            </div>
          </div>
        </Step>
        <Step
          step={3}
          title="Laser Cut"
          desc={
            <>
              Cut the <b style={{ color: "red" }}>RED</b> lines and Engrave the{" "}
              <b style={{ color: "black" }}>BLACK</b> parts
            </>
          }
        ></Step>
        <Step
          step={4}
          title="3D pen & Conductive Filament"
          desc={
            <>
              Trace over the engraved sections, and connect the{" "}
              {GetWireColor(output)} wire from the output module
            </>
          }
        ></Step>
        <Step step={5} title="Connect" desc={""}></Step>
      </Instruction>
    </div>
  );
}

export default App;
