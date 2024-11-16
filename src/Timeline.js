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
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";

export function TimelineTitle({ title, desc }) {
  return (
    <>
      <Typography variant="h6" component="span">
        {title}
      </Typography>
      <Typography color="text.secondary">{desc}</Typography>
    </>
  );
}

export function TimelineIcon({ step }) {
  return (
    <TimelineSeparator>
      <TimelineDot color="primary">
        {step == 1 ? (
          <SettingsSuggestIcon />
        ) : step == 2 ? (
          <AutoFixHighIcon />
        ) : step == 3 ? (
          <ContentCutIcon />
        ) : step == 4 ? (
          <DrawIcon />
        ) : step == 5 ? (
          <SettingsInputComponentIcon />
        ) : undefined}
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
  );
}
