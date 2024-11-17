import "./App.css";
import { useState } from "react";
import Header from "./Header";
import Canvas from "./Canvas";
import SearchIconsDialog from "./Dialog.js";
import { InputSelect, OutputSelect } from "./SystemIO.js";
import { BaseOptions, BaseList } from "./Base.js";
import { CircuitList } from "./Circuit.js";
import { PatternOptions } from "./Pattern.js";
import { ExportButton } from "./Export.js";

import { Instruction, Step, GetWireColor } from "./Instruction.js";
import { LaserCutImg, DrawCircuitImg } from "./Image.js";

function App() {
  // system I/O
  const [input, setInput] = useState("");
  const handleInputChange = (event) => setInput(event.target.value);
  const [output, setOutput] = useState("");
  const handleOutputChange = (event) => setOutput(event.target.value);

  // unique id shared by base & circuit
  const [currId, setCurrId] = useState(0);
  // Base
  const [bases, setBases] = useState([]);
  const handleAddBase = (selectedIcon) => {
    setBases([
      ...bases, // old items
      {
        id: currId,
        shape: selectedIcon,
        size: 300,
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        flip: false,
      },
    ]);
    setCurrId(currId + 1);
  };

  // Circuit
  const [circuits, setCircuits] = useState([]);
  const [editingId, setEditingId] = useState(0);

  const handleAddCircuit = (selectedIcon) => {
    setCircuits([
      ...circuits, // old items
      {
        id: currId,
        shape: selectedIcon,
        size: 300,
        x: 0,
        y: 0,
        scaleX: 0.5,
        scaleY: 0.5,
        rotate: 0,
        flip: false,
      },
    ]);
    setCurrId(currId + 1);
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
              <h3>Decide Your System I/O...</h3>
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
              <h3>Base</h3>
              <BaseList
                bases={bases}
                editingId={editingId}
                handleSetEditingId={setEditingId}
              />
              <div className="section">
                <BaseOptions handleAddBase={handleAddBase} />
              </div>
              <h3>Circuit</h3>
              <div className="section">
                <PatternOptions />
              </div>

              <CircuitList
                circuits={circuits}
                editingId={editingId}
                handleSetEditingId={setEditingId}
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
            <div className="section" id="circuit-result-section">
              <h3>Result</h3>
              <Canvas bases={bases} circuits={circuits} editingId={editingId} />
              <div className="button">
                <ExportButton />
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
        >
          <LaserCutImg />
        </Step>
        <Step
          step={4}
          title="3D pen & Conductive Filament"
          desc={"Trace over the engraved sections"}
        >
          <DrawCircuitImg />
        </Step>
        <Step
          step={5}
          title="Connect"
          desc={
            <>
              Connect the {GetWireColor(output)} wire from the output module and
              complete!
            </>
          }
        ></Step>
      </Instruction>
    </div>
  );
}

export default App;
