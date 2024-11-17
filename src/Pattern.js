import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { PatternResolver } from "./Utils.js";

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
];

export function PatternOptions({}) {
  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
      {PATTERN_LIST.map((shape) => (
        <IconButton
          key={shape}
          // onClick={() => handleBaseShapeChange(shape)}
          // color={baseShape == shape ? "primary" : "default"}
          color="defalut"
        >
          <PatternResolver
            patternName={shape}
            width="24px"
            height="24px"
            transform={shape == "pattern_tree" ? "scale(2 2)" : "scale(3 3)"}
          />
        </IconButton>
      ))}
    </Stack>
  );
}
