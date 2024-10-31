import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import { IconResolver } from "./IconUtils.js";

const BASE_ICON_LIST = [
  "Circle",
  "Square",
  "Pentagon",
  "Hexagon",
  "Star",
  "Favorite",
  "Extension",
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
    <Stack direction="row" spacing={1}>
      {BASE_ICON_LIST.map((iconName) => (
        <IconButton
          onClick={() => handleBaseShapeChange(iconName)}
          color={baseShape == iconName ? "primary" : "default"}
        >
          <IconResolver iconName={iconName} />
        </IconButton>
      ))}
    </Stack>
  );
}
