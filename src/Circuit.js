import { IconResolver, PatternResolver } from "./Utils.js";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";

export function AddMoreCircuitButton({ handleClickAddCircuit }) {
  return (
    <Button
      variant="contained"
      startIcon={<SavedSearchIcon />}
      onClick={handleClickAddCircuit}
      sx={{ position: "absolute", right: "20px", bottom: "15px" }}
    >
      More
    </Button>
  );
}

// crcuit & pattern
export function CircuitList({ items, editingId, handleSetEditingId }) {
  return (
    <div id="circuit-list">
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        {items.map((item) => (
          <IconButton
            key={item.id}
            color={editingId == item.id ? "primary" : "default"}
            onClick={() => handleSetEditingId(item.id)}
          >
            {item.type == "circuit" ? (
              <IconResolver iconName={item.shape} />
            ) : item.type == "pattern" ? (
              <PatternResolver
                patternName={item.shape}
                width="24px"
                height="24px"
                color={editingId == item.id ? "primary" : "default"}
                transform={
                  item.shape == "pattern_tree" ? "scale(2 2)" : "scale(3 3)"
                }
              />
            ) : undefined}
          </IconButton>
        ))}
      </Stack>
    </div>
  );
}
