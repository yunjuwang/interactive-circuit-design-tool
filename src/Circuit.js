import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconResolver } from "./IconUtils.js";
import { InputSlider } from "./Slider.js";

function CircuitEditor({ circuit, handleEdit, handleDelete }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [scaleX, setScaleX] = useState(0.5);
  const [scaleY, setScaleY] = useState(0.5);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const newCircuit = {
      id: circuit.id,
      shape: circuit.shape,
      size: 300,
      x: x,
      y: y,
      scaleX: scaleX,
      scaleY: scaleY,
      rotate: rotate,
    };
    handleEdit(newCircuit);
  }, [x, y, scaleX, scaleY, rotate, circuit]);

  return (
    <div>
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
  return (
    <>
      {circuits.map((circuit) => (
        <div key={circuit.id} className="section">
          #{circuit.id} {circuit.shape}
          <IconResolver iconName={circuit.shape} />
          <IconButton
            className="float-right"
            onClick={() => handleRemoveCircuit(circuit.id)}
          >
            <DeleteIcon />
          </IconButton>
          <CircuitEditor
            circuit={circuit}
            handleEdit={(newCircuit) =>
              handleEditCircuit(circuit.id, newCircuit)
            }
          />
        </div>
      ))}
    </>
  );
}
