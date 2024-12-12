import { IconResolver, PatternResolver } from "./Utils.js";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";

const PATTERN_LIST = [
  "pattern_zigzag_1",
  "pattern_zigzag_2",
  "pattern_zigzag_3",
  "pattern_zigzag_4",

  "pattern_corner_1",
  "pattern_corner_2",
  "pattern_line_1",
  "pattern_line_2",
  "pattern_dot",
  "pattern_end",

  "pattern_zigzag2_1",
  "pattern_zigzag2_2",
  "pattern_zigzag2_3",
  "pattern_tree",
  "pattern_tree_corner",
];

function AddMoreCircuitButton({ handleClickAddCircuit }) {
  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={<SavedSearchIcon />}
      onClick={handleClickAddCircuit}
      sx={{ position: "relative", top: "1px", left: "10px", height: "32px" }}
    >
      More
    </Button>
  );
}

export function PatternOptions({ handleAddPattern, handleClickAddCircuit }) {
  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
      {PATTERN_LIST.map((shape) => (
        <IconButton key={shape} onClick={() => handleAddPattern(shape)}>
          <PatternResolver
            patternName={shape}
            width="24px"
            height="24px"
            color="default"
            transform={shape == "pattern_tree" ? "scale(2 2)" : "scale(3 3)"}
          />
        </IconButton>
      ))}
      <AddMoreCircuitButton handleClickAddCircuit={handleClickAddCircuit} />
    </Stack>
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
