import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
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
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          Step 1
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <AutoFixHighIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Interactive Circuits Toolkit
          </Typography>
          <Typography color="text.secondary">
            Design your circuit and export!
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          Step 2
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <ContentCutIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Laser Cut
          </Typography>
          <Typography color="text.secondary">
            Cut the <span style={{ color: "red" }}>RED</span> lines and Engrave
            the <span style={{ color: "black" }}>BLACK</span> parts
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          Step 3
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <DrawIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            3D pen & Conductive Filament
          </Typography>
          <Typography color="text.secondary">
            Trace over the engraved sections, and connect the {GetWireColor()}{" "}
            wire from the output module
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
