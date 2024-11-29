import * as MuiIcons from "@mui/icons-material";
import { styled } from "@mui/system";
import { unstable_styleFunctionSx } from "@mui/system";

import { ReactComponent as PatternCornerSvg_1 } from "./pattern/pattern_corner_1.svg";
import { ReactComponent as PatternCornerSvg_2 } from "./pattern/pattern_corner_2.svg";
import { ReactComponent as PatternDotSvg } from "./pattern/pattern_dot.svg";
import { ReactComponent as PatternEndSvg } from "./pattern/pattern_end.svg";
import { ReactComponent as PatternLineSvg_1 } from "./pattern/pattern_line_1.svg";
import { ReactComponent as PatternLineSvg_2 } from "./pattern/pattern_line_2.svg";

import { ReactComponent as PatternZigzagSvg_1 } from "./pattern/pattern_zigzag_1.svg";
import { ReactComponent as PatternZigzagSvg_2 } from "./pattern/pattern_zigzag_2.svg";
import { ReactComponent as PatternZigzagSvg_3 } from "./pattern/pattern_zigzag_3.svg";
import { ReactComponent as PatternZigzagSvg_4 } from "./pattern/pattern_zigzag_4.svg";

import { ReactComponent as PatternZigzagSvg2_1 } from "./pattern/pattern_zigzag2_1.svg";
import { ReactComponent as PatternZigzagSvg2_2 } from "./pattern/pattern_zigzag2_2.svg";
import { ReactComponent as PatternZigzagSvg2_3 } from "./pattern/pattern_zigzag2_3.svg";
import { ReactComponent as PatternTreeSvg } from "./pattern/pattern_tree.svg";

const patterns = {
  pattern_corner_1: PatternCornerSvg_1,
  pattern_corner_2: PatternCornerSvg_2,
  pattern_dot: PatternDotSvg,
  pattern_end: PatternEndSvg,
  pattern_line_1: PatternLineSvg_1,
  pattern_line_2: PatternLineSvg_2,
  pattern_zigzag_1: PatternZigzagSvg_1,
  pattern_zigzag_2: PatternZigzagSvg_2,
  pattern_zigzag_3: PatternZigzagSvg_3,
  pattern_zigzag_4: PatternZigzagSvg_4,
  pattern_zigzag2_1: PatternZigzagSvg2_1,
  pattern_zigzag2_2: PatternZigzagSvg2_2,
  pattern_zigzag2_3: PatternZigzagSvg2_3,
  pattern_tree: PatternTreeSvg,
};

const _PatternResolver = ({ patternName, color, ...props }) => {
  const PatternComponent = patterns[patternName];

  if (!PatternComponent) {
    console.error(`Pattern "${patternName}" not found`);
    return null; // You can return a default icon or an empty element here
  }

  return <PatternComponent {...props} />;
};

export const PatternResolver = styled(_PatternResolver)(
  unstable_styleFunctionSx
);

export const IconResolver = ({ iconName, ...props }) => {
  const IconComponent = MuiIcons[iconName];

  if (!IconComponent) {
    console.error(`Icon "${iconName}" not found`);
    return null; // You can return a default icon or an empty element here
  }

  return <IconComponent {...props} />;
};
