import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import { IconResolver } from "./IconUtils.js";

const BASE_SHAPE_LIST = [
  "Circle",
  "Square",
  "Rectangle",
  "Pentagon",
  "Hexagon",
  "Star",
  "Favorite",
  "Extension",
  "Navigation",
  "Brightness2",
  "DarkMode",
  "ModeComment",
  "ChatBubble",
  "Bookmark",
  "Cloud",
  "DesktopMac",
  "Work",
  "Folder",
  "Label",
  "LocalOffer",
  "Science",
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

export function BaseShapeButtons({ baseShape, handleBaseShapeChange }) {
  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
      {BASE_SHAPE_LIST.map((shape) => (
        <IconButton
          key={shape}
          onClick={() => handleBaseShapeChange(shape)}
          color={baseShape == shape ? "primary" : "default"}
        >
          <IconResolver iconName={shape} />
        </IconButton>
      ))}
    </Stack>
  );
}
