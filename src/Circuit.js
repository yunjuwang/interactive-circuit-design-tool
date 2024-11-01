import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconResolver } from "./IconUtils.js";

export function CircuitList({ circuits, handleRemoveCircuit }) {
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
        </div>
      ))}
    </>
  );
}
