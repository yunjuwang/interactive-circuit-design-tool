import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import { IconResolver } from "./Utils.js";

const BASE_SHAPE_LIST = [
  "Circle",
  "Square",
  // "Rectangle",
  "Pentagon",
  "Hexagon",
  "Star",
  "Favorite",
  "Extension",
  "Navigation",
  "Brightness2",
  "DarkMode",
  // "ModeComment",
  "ChatBubble",
  "Bookmark",
  "Cloud",
  // "DesktopMac",
  // "Work",
  // "Folder",
  "Label",
  "LocalOffer",
  // "Science",
  "Shield",
];

export function BaseSizeSlider({ baseSize, handleBaseSizeChange }) {
  return (
    <Box sx={{ width: 200 }}>
      <Typography id="input-slider" gutterBottom>
        Size: {baseSize}
      </Typography>
      <Slider
        value={baseSize}
        onChange={handleBaseSizeChange}
        min={300}
        max={500}
      />
    </Box>
  );
}

export function BaseList({ bases, editingId, handleSetEditingId }) {
  const editingBase = bases.find((base) => base.id == editingId);
  return (
    <>
      <div id="circuit-list">
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {bases.map((bases) => (
            <IconButton
              key={bases.id}
              onClick={() => handleSetEditingId(bases.id)}
              color={editingId == bases.id ? "primary" : "default"}
            >
              <IconResolver iconName={bases.shape} />
            </IconButton>
          ))}
        </Stack>
        {/* <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickAddCircuit}
        >
          Add New Pattern
        </Button> */}
      </div>

      {/* {editingId === "" || editingCircuit === undefined ? null : (
        <CircuitEditor
          editingId={editingCircuit.id}
          editingCircuit={editingCircuit}
          handleEdit={(newCircuit) =>
            handleEditCircuit(editingCircuit.id, newCircuit)
          }
          handleDelete={() => handleRemoveCircuit(editingCircuit.id)}
        />
      )} */}
    </>
  );
}

export function BaseOptions({ handleAddBase }) {
  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
      {BASE_SHAPE_LIST.map((shape) => (
        <IconButton
          key={shape}
          onClick={() => handleAddBase(shape)}
          // color={baseShape == shape ? "primary" : "default"}
        >
          <IconResolver iconName={shape} />
        </IconButton>
      ))}
    </Stack>
  );
}
