import "./App.css";
import { useState } from "react";
import Header from "./Header";
import Canvas from "./Canvas";
import SearchIconsDialog from "./Dialog.js";
import { InputSelect, OutputSelect } from "./SystemIO.js";
import { BaseShapeButtons, BaseSizeSlider } from "./Base.js";
import { CircuitList } from "./Circuit.js";
import { ExportButton } from "./Export.js";
import { Insruction, GetWireColor } from "./Insruction.js";

import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";

import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";

import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DrawIcon from "@mui/icons-material/Draw";
import ContentCutIcon from "@mui/icons-material/ContentCut";

import { TimelineTitle, TimelineIcon } from "./Timeline.js";

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

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

  function NextStepButton({ target }) {
    return (
      <div className="next-step">
        <Button variant="outlined" href={target}>
          Next Step
        </Button>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: "1px",
          },
        }}
      >
        {/* step 1 */}
        <TimelineItem>
          <TimelineIcon step={1} />
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTitle title={"Step 1: Design Your System"} desc={""} />
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
            <NextStepButton target="#circuit-design" />
          </TimelineContent>
        </TimelineItem>
        {/* step 2 */}
        <TimelineItem id="circuit-design">
          <TimelineIcon step={2} />
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTitle
              title={"Step 2: Design Your circuit"}
              desc={"Design your circuit and export!"}
            />
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
            <NextStepButton target="#laser-cut" />
          </TimelineContent>
        </TimelineItem>
        {/* step 3 */}
        <TimelineItem id="laser-cut">
          <TimelineIcon step={3} />
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTitle
              title={"Step 3: Laser Cut"}
              desc={
                <>
                  Cut the <b style={{ color: "red" }}>RED</b> lines and Engrave
                  the <b style={{ color: "black" }}>BLACK</b> parts
                </>
              }
            />
            <NextStepButton target="#3D-pen" />
          </TimelineContent>
        </TimelineItem>
        {/* step 4 */}
        <TimelineItem id="3D-pen">
          <TimelineIcon step={4} />
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTitle
              title={"Step 4: 3D pen & Conductive Filament"}
              desc={
                <>
                  Trace over the engraved sections, and connect the{" "}
                  {GetWireColor(output)} wire from the output module
                </>
              }
            />
          </TimelineContent>
        </TimelineItem>
        {/* step 5 */}
        <TimelineItem id="?">
          <TimelineIcon step={5} />
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTitle
              title={"Step 5: Connect"}
              desc={
                <>
                  Trace over the engraved sections, and connect the{" "}
                  {GetWireColor(output)} wire from the output module
                </>
              }
            />
          </TimelineContent>
        </TimelineItem>
      </Timeline>

      {/* <Insruction output={output} /> */}

      {/* <div className="container">
        <div className="section">
          <div>
            <h1>What</h1>
            <h2>System I/O</h2>
            <InputSelect input={input} handleInputChange={handleInputChange} />
            <OutputSelect
              output={output}
              handleOutputChange={handleOutputChange}
            />
          </div>
          <div>
            <h1>Insruction</h1>
            <div>
              <Insruction output={output} />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
