import { IconResolver } from "./Utils.js";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export function CircuitList({
  circuits,
  editingId,
  handleSetEditingId,
  handleClickAddCircuit,
}) {
  return (
    <>
      <div id="circuit-list">
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {circuits.map((circuit) => (
            <IconButton
              key={circuit.id}
              onClick={() => handleSetEditingId(circuit.id)}
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
    </>
  );
}
