import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Header";
import Canvas from "./Canvas";
import SearchIconsDialog from "./Dialog.js";
import { InputSelect, OutputSelect } from "./SystemIO.js";
import { BaseOptions, BaseList } from "./Base.js";
import { CircuitList } from "./Circuit.js";
import { Editor } from "./Editor.js";
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
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(-1);
  const [editingItem, setEditingItem] = useState(undefined);

  useEffect(() => {
    setEditingItem(items.find((item) => item.id == editingId));
  }, [editingId]);

  const handleRemoveItem = (removeId) => {
    setItems(items.filter((item) => item.id != removeId));
    setEditingId(-1);
  };

  const handleEditItem = (editId, newItem) => {
    setItems(items.map((item) => (item.id == editId ? newItem : item)));
  };

  // Base
  const handleAddBase = (selectedIcon) => {
    setItems([
      ...items, // old items
      {
        id: currId,
        type: "base",
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
    setEditingId(currId);
    setCurrId(currId + 1);
  };

  // Circuit
  const handleAddCircuit = (selectedIcon) => {
    setItems([
      ...items, // old items
      {
        id: currId,
        type: "circuit",
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
    setEditingId(currId);
    setCurrId(currId + 1);
  };

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
                bases={items.filter((item) => item.type == "base")}
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
                circuits={items.filter((item) => item.type == "circuit")}
                editingId={editingId}
                handleSetEditingId={setEditingId}
                handleClickAddCircuit={handleClickOpenDialog}
              />
              <h3>Editor</h3>
              {editingId === -1 ? (
                <>Select Editing Item First</>
              ) : (
                <Editor
                  editingId={editingId}
                  editingItem={editingItem}
                  handleEdit={(newItem) =>
                    handleEditItem(editingItem.id, newItem)
                  }
                  handleDelete={() => handleRemoveItem(editingId)}
                />
              )}
              <SearchIconsDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                handleSelect={handleClickSelect}
              />
            </div>
            <div className="section" id="circuit-result-section">
              <h3>Result</h3>
              <Canvas
                bases={items.filter((item) => item.type == "base")}
                circuits={items.filter((item) => item.type == "circuit")}
                editingId={editingId}
              />
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
