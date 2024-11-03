import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconResolver } from "./IconUtils.js";
import { InputSlider } from "./Slider.js";
import Stack from "@mui/material/Stack";

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

  return (
    <div>
      <IconButton className="float-right" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      <h6>Position</h6>
      <InputSlider InputName="X" value={x} setValue={setX} />
      <InputSlider InputName="Y" value={y} setValue={setY} />
      <h6>Scale</h6>
      <InputSlider
        InputName="X"
        value={scaleX}
        setValue={setScaleX}
        minValue={0}
        maxValue={1}
        step={0.01}
      />
      <InputSlider
        InputName="Y"
        value={scaleY}
        setValue={setScaleY}
        minValue={0}
        maxValue={1}
        step={0.01}
      />
      <h6>Rotate</h6>
      <InputSlider
        InputName=""
        value={rotate}
        setValue={setRotate}
        minValue={0}
        maxValue={360}
      />
    </div>
  );
}

export function CircuitList({
  circuits,
  handleEditCircuit,
  handleRemoveCircuit,
}) {
  const [editingId, setEditingId] = useState(0);
  const editingCircuit = circuits.find((circuit) => circuit.id == editingId);
  return (
    <>
      <Stack direction="row" spacing={1}>
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
