import { useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DrawIcon from "@mui/icons-material/Draw";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";

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
export function Step({ step, title, desc, children }) {
  function _GetIcon() {
    return step == 1 ? (
      <SettingsSuggestIcon />
    ) : step == 2 ? (
      <AutoFixHighIcon />
    ) : step == 3 ? (
      <ContentCutIcon />
    ) : step == 4 ? (
      <DrawIcon />
    ) : step == 5 ? (
      <SettingsInputComponentIcon />
    ) : undefined;
  }
  function NextStepButton() {
    return (
      <div className="next-step">
        <Button variant="outlined" href={"#step-" + (step + 1)}>
          Next Step
        </Button>
      </div>
    );
  }
  function CompletedButton() {
    const [completed, setCompleted] = useState(false);
    return (
      <div className="next-step">
        <Button variant="outlined" onClick={() => setCompleted(true)}>
          Completed!
        </Button>
        {completed ? (
          <h4>
            Thank you for participating in the workshop! :3 &#128151; <br />
            Please help to fill out the{" "}
            <Link href="https://forms.gle/Wtu8Z8riBnyMFSvD7" target="_blank">
              questionnaire
            </Link>{" "}
            !
          </h4>
        ) : undefined}
      </div>
    );
  }
  return (
    <TimelineItem id={"step-" + step}>
      <TimelineSeparator>
        <TimelineDot color="primary">{_GetIcon()}</TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span">
          Step {step}: {title}
        </Typography>
        <Typography color="text.secondary">{desc}</Typography>
        {children}
        {step != 5 ? <NextStepButton /> : <CompletedButton />}
      </TimelineContent>
    </TimelineItem>
  );
}
export function Instruction({ children }) {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: "1px",
        },
      }}
    >
      {children}
    </Timeline>
  );
}
