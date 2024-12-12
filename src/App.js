import "./App.css";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Header from "./Header";
import { Canvas, CanvasScaleSlider } from "./Canvas";
import Button from "@mui/material/Button";

import SearchIconsDialog from "./Dialog.js";
import { InputSelect, OutputSelect } from "./SystemIO.js";
import { BaseOptions, BaseList } from "./Base.js";
import { CircuitList, PatternOptions } from "./Circuit.js";
import { Editor } from "./Editor.js";
import { ExportButton } from "./Export.js";
import { Instruction, Step, GetWireColor } from "./Instruction.js";
import { LaserCutImg, DrawCircuitImg } from "./Image.js";
import { Template } from "./Template.js";

import AddCircleIcon from "@mui/icons-material/AddCircle";

function App() {
  // system I/O
  const [input, setInput] = useState("");
  const handleInputChange = (event) => setInput(event.target.value);
  const [output, setOutput] = useState("");
  const handleOutputChange = (event) => setOutput(event.target.value);

  // Items (bases & circuits)
  const [items, setItems] = useState([]);
  const [currId, setCurrId] = useState(0); // unique id
  const [editingId, setEditingId] = useState(-1);
  const [editingItem, setEditingItem] = useState(undefined);

  useEffect(() => {
    setEditingItem(items.find((item) => item.id == editingId));
  }, [editingId]);

  const handleAddItem = (newItem) => {
    setItems([
      ...items, // old items
      newItem,
    ]);
    setEditingId(currId);
    setCurrId(currId + 1);
  };

  const handleCopyItem = (copyId) => {
    const copiedItem = items.find((item) => item.id == copyId);
    const newItem = { ...copiedItem, id: currId }; // do deep copy
    handleAddItem(newItem);
  };

  const handleRemoveItem = (removeId) => {
    setItems(items.filter((item) => item.id != removeId));
    setEditingId(-1);
  };

  const handleEditItem = (editId, newItem) => {
    setItems(items.map((item) => (item.id == editId ? newItem : item)));
  };

  // Editing item properties (for editor & moveable)
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [lockScale, setLockScale] = useState(true);
  const [flip, setFlip] = useState(false);

  // Canvas Scale
  const [canvasScale, setCanvasScale] = useState(5);

  useEffect(() => {
    if (editingId === -1 || editingItem === undefined) return;

    const newItem = {
      id: editingId,
      type: editingItem.type,
      shape: editingItem.shape,
      x: x,
      y: y,
      scaleX: scaleX,
      scaleY: scaleY,
      rotate: rotate,
      flip: flip,
    };
    handleEditItem(editingId, newItem);
  }, [x, y, scaleX, scaleY, rotate, flip]);

  // Base
  const handleAddBase = (selectedIcon) => {
    const newBase = {
      id: currId,
      type: "base",
      shape: selectedIcon,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      flip: false,
    };
    handleAddItem(newBase);
  };

  // Circuit
  const handleAddCircuit = (selectedIcon) => {
    const newCircuit = {
      id: currId,
      type: "circuit",
      shape: selectedIcon,
      x: 0,
      y: 0,
      scaleX: 0.5,
      scaleY: 0.5,
      rotate: 0,
      flip: false,
    };
    handleAddItem(newCircuit);
  };

  // Pattern
  const handleAddPattern = (selectedShape) => {
    setItems([
      ...items, // old items
      {
        id: currId,
        type: "pattern",
        shape: selectedShape,
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

  // Select Icon Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setEditingId(-1);
    setOpenDialog(true);
  };
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
          <div className="section" id="template-section">
            <h4>Use Template</h4>
            <Template
              setItems={setItems}
              setCurrId={setCurrId}
              setEditingId={setEditingId}
              setCanvasScale={setCanvasScale}
            />
          </div>
          <div className="container">
            <div className="section" id="circuit-select-section">
              <h4>Add Base</h4>

              <div className="section">
                <AddCircleIcon
                  fontSize="large"
                  sx={{
                    color: "#ccc",
                    position: "absolute",
                    left: "-10px",
                    top: "-8px",
                  }}
                />
                <BaseOptions handleAddBase={handleAddBase} />
              </div>
              <h4>Add Circuit</h4>

              <div className="section">
                <AddCircleIcon
                  fontSize="large"
                  sx={{
                    color: "#ccc",
                    position: "absolute",
                    left: "-10px",
                    top: "-8px",
                  }}
                />
                <PatternOptions
                  handleAddPattern={handleAddPattern}
                  handleClickAddCircuit={handleClickOpenDialog}
                />
              </div>
              <SearchIconsDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                handleSelect={handleClickSelect}
              />
            </div>
            <div className="section" id="circuit-edit-section">
              <h4>Editor</h4>
              <div className="section">
                <BaseList
                  bases={items.filter((item) => item.type == "base")}
                  editingId={editingId}
                  handleSetEditingId={setEditingId}
                />
                <Divider sx={{ margin: "8px -5px" }} />
                <CircuitList
                  items={items.filter(
                    (item) => item.type == "circuit" || item.type == "pattern"
                  )}
                  editingId={editingId}
                  handleSetEditingId={setEditingId}
                />
              </div>
              {editingId === -1 ? (
                <Typography color="text.secondary">
                  Select item to edit...
                </Typography>
              ) : (
                <>
                  <Editor
                    editingId={editingId}
                    editingItem={editingItem}
                    handleCopy={() => handleCopyItem(editingId)}
                    handleDelete={() => handleRemoveItem(editingId)}
                    x={x}
                    setX={setX}
                    y={y}
                    setY={setY}
                    scaleX={scaleX}
                    setScaleX={setScaleX}
                    scaleY={scaleY}
                    setScaleY={setScaleY}
                    rotate={rotate}
                    setRotate={setRotate}
                    lockScale={lockScale}
                    setLockScale={setLockScale}
                    flip={flip}
                    setFlip={setFlip}
                  />
                  <Button
                    className="button"
                    variant="outlined"
                    onClick={() => setEditingId(-1)}
                  >
                    Deselect
                  </Button>
                </>
              )}
            </div>
            <div className="section" id="circuit-result-section">
              <Canvas
                bases={items.filter((item) => item.type == "base")}
                circuits={items.filter(
                  (item) => item.type == "circuit" || item.type == "pattern"
                )}
                editingId={editingId}
                setX={setX}
                setY={setY}
                setScaleX={setScaleX}
                setScaleY={setScaleY}
                setRotate={setRotate}
                lockScale={lockScale}
                canvasScale={canvasScale}
              />
              <CanvasScaleSlider
                canvasScale={canvasScale}
                setCanvasScale={setCanvasScale}
              />
              <ExportButton />
            </div>
          </div>
        </Step>
        <Step
          step={3}
          title="Laser Cut"
          desc={
            <>
              Cut the <b style={{ color: "red" }}>RED</b> lines and engrave the{" "}
              <b style={{ color: "black" }}>BLACK</b> parts
            </>
          }
        >
          <LaserCutImg />
        </Step>
        <Step
          step={4}
          title="3D pen & Conductive Filament"
          desc={"Trace over the engraved parts"}
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
