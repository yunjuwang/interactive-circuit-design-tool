import { useState, useEffect } from "react";
import { IconResolver } from "./IconUtils.js";
import { InputSlider } from "./Slider.js";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LockIcon from "@mui/icons-material/Lock";

function CircuitEditor({
  editingId,
  editingCircuit,
  handleEdit,
  handleDelete,
}) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [scaleX, setScaleX] = useState(0.5);
  const [scaleY, setScaleY] = useState(0.5);
  const [rotate, setRotate] = useState(0);
  const [lockScale, setLockScale] = useState(true);
  useEffect(() => {
    if (editingId === "" || editingCircuit === undefined) return;

    setX(editingCircuit.x);
    setY(editingCircuit.y);
    setScaleX(editingCircuit.scaleX);
    setScaleY(editingCircuit.scaleY);
    setRotate(editingCircuit.rotate);
  }, [editingId]);

  useEffect(() => {
    if (editingId === "" || editingCircuit === undefined) return;

    const newCircuit = {
      id: editingId,
      shape: editingCircuit.shape,
      size: 300,
      x: x,
      y: y,
      scaleX: scaleX,
      scaleY: scaleY,
      rotate: rotate,
    };
    handleEdit(newCircuit);
  }, [x, y, scaleX, scaleY, rotate]);

  function SetScaleX_locked(scale) {
    let diff = scale - scaleX;
    setScaleX(scale);
    setScaleY(scaleY + diff);
  }
  function SetScaleY_locked(scale) {
    let diff = scale - scaleY;
    setScaleX(scaleX + diff);
    setScaleY(scale);
  }

  return (
    <div className="section">
      <div className="circuit-edior-delete-btn">
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
      <h4 className="circuit-edior-title">Position</h4>
      <div className="slider-section">
        <div className="slider slider-x">
          <InputSlider InputName="X" value={x} setValue={setX} />
        </div>
        <div className="slider">
          <InputSlider InputName="Y" value={y} setValue={setY} />
        </div>
      </div>
      <h4 className="circuit-edior-title">
        Scale
        <ToggleButton
          size="small"
          value="lockScale"
          selected={lockScale}
          onChange={() => setLockScale((prev) => !prev)}
          sx={{ marginLeft: "5px", padding: "0px" }}
        >
          <LockIcon />
        </ToggleButton>
      </h4>

      <div className="slider-section">
        <div className="slider slider-x">
          <InputSlider
            InputName="X"
            value={scaleX}
            setValue={lockScale ? SetScaleX_locked : setScaleX}
            minValue={-1}
            maxValue={1}
            step={0.01}
          />
        </div>
        <div className="slider">
          <InputSlider
            className="slider"
            InputName="Y"
            value={scaleY}
            setValue={lockScale ? SetScaleY_locked : setScaleY}
            minValue={-1}
            maxValue={1}
            step={0.01}
          />
        </div>
      </div>
      <h4 className="circuit-edior-title">Rotate</h4>
      <div className="slider">
        <InputSlider
          InputName=""
          value={rotate}
          setValue={setRotate}
          minValue={-360}
          maxValue={360}
        />
      </div>
    </div>
  );
}

export function CircuitList({
  circuits,
  handleClickAddCircuit,
  handleEditCircuit,
  handleRemoveCircuit,
}) {
  const [editingId, setEditingId] = useState(0);
  const editingCircuit = circuits.find((circuit) => circuit.id == editingId);
  return (
    <>
      <div id="circuit-list">
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {circuits.map((circuit) => (
            <IconButton
              key={circuit.id}
              onClick={() => setEditingId(circuit.id)}
              color={editingId == circuit.id ? "primary" : "default"}
            >
              <IconResolver iconName={circuit.shape} />
            </IconButton>
          ))}
        </Stack>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickAddCircuit}
        >
          Add New Pattern
        </Button>
      </div>

      {editingId === "" || editingCircuit === undefined ? null : (
        <CircuitEditor
          editingId={editingCircuit.id}
          editingCircuit={editingCircuit}
          handleEdit={(newCircuit) =>
            handleEditCircuit(editingCircuit.id, newCircuit)
          }
          handleDelete={() => handleRemoveCircuit(editingCircuit.id)}
        />
      )}
    </>
  );
}
