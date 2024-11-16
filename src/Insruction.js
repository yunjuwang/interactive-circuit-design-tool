import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";

import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";

import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DrawIcon from "@mui/icons-material/Draw";
import ContentCutIcon from "@mui/icons-material/ContentCut";

import { InputSelect, OutputSelect } from "./SystemIO.js";

import { TimelineTitle, TimelineIcon } from "./Timeline.js";

export function GetWireColor(output) {
  switch (output) {
    case "output_led":
      return <span style={{ color: "orange" }}>ORANGE</span>;

    case "output_sound":
      return <span style={{ color: "green" }}>GREEN</span>;

    case "output_vibration":
      return <span style={{ color: "blue" }}>BLUE</span>;

    default:
      return;
  }
}

export function Insruction({ output }) {
  function GetWireColor() {
    switch (output) {
      case "output_led":
        return <span style={{ color: "orange" }}>ORANGE</span>;

      case "output_sound":
        return <span style={{ color: "green" }}>GREEN</span>;

      case "output_vibration":
        return <span style={{ color: "blue" }}>BLUE</span>;

      default:
        return;
    }
  }
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: "2px",
        },
      }}
    >
      {/* step 1 */}
      <TimelineItem>
        <TimelineIcon step={1} />
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <TimelineTitle title={"Design Your System"} desc={""} />
          <div className="section">PUT CONTENT HERE</div>
        </TimelineContent>
      </TimelineItem>
      {/* step 2 */}
      <TimelineItem>
        <TimelineIcon step={2} />
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <TimelineTitle
            title={"Design Your circuit"}
            desc={"Design your circuit and export!"}
          />
        </TimelineContent>
      </TimelineItem>
      {/* step 3 */}
      <TimelineItem>
        <TimelineIcon step={3} />
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <TimelineTitle
            title={"Laser Cut"}
            desc={
              <>
                Cut the <span style={{ color: "red" }}>RED</span> lines and
                Engrave the <span style={{ color: "black" }}>BLACK</span> parts
              </>
            }
          />
        </TimelineContent>
      </TimelineItem>
      {/* step 4 */}
      <TimelineItem>
        <TimelineIcon step={4} />
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <TimelineTitle
            title={"3D pen & Conductive Filament"}
            desc={
              <>
                Trace over the engraved sections, and connect the{" "}
                {GetWireColor()} wire from the output module
              </>
            }
          />
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
