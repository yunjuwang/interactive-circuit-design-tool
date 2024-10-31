import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import PentagonIcon from "@mui/icons-material/Pentagon";
import HexagonIcon from "@mui/icons-material/Hexagon";
import StarIcon from "@mui/icons-material/Star";
import HeartIcon from "@mui/icons-material/Favorite";
import PuzzleIcon from "@mui/icons-material/Extension";

export function BaseSizeSlider({ baseSize, handleBaseSizeChange }) {
  return (
    <Box sx={{ width: 200 }}>
      <Typography id="input-slider" gutterBottom>
        Size: {baseSize}
      </Typography>
      <Slider value={baseSize} onChange={handleBaseSizeChange} />
    </Box>
  );
}

export function BaseShapeButtons({ baseShape, handleBaseShapeChange }) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        onClick={() => handleBaseShapeChange("circle")}
        color={baseShape == "circle" ? "primary" : "default"}
      >
        <CircleIcon />
      </IconButton>

      <IconButton
        onClick={() => handleBaseShapeChange("quare")}
        color={baseShape == "quare" ? "primary" : "default"}
      >
        <SquareIcon />
      </IconButton>

      <IconButton
        onClick={() => handleBaseShapeChange("pentagon")}
        color={baseShape == "pentagon" ? "primary" : "default"}
      >
        <PentagonIcon />
      </IconButton>

      <IconButton
        onClick={() => handleBaseShapeChange("hexagon")}
        color={baseShape == "hexagon" ? "primary" : "default"}
      >
        <HexagonIcon />
      </IconButton>

      <IconButton
        onClick={() => handleBaseShapeChange("star")}
        color={baseShape == "star" ? "primary" : "default"}
      >
        <StarIcon />
      </IconButton>

      <IconButton
        onClick={() => handleBaseShapeChange("heart")}
        color={baseShape == "heart" ? "primary" : "default"}
      >
        <HeartIcon />
      </IconButton>

      <IconButton
        onClick={() => handleBaseShapeChange("puzzle")}
        color={baseShape == "puzzle" ? "primary" : "default"}
      >
        <PuzzleIcon />
      </IconButton>
    </Stack>
  );
}
