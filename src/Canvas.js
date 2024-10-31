import { IconResolver } from "./IconUtils.js";

export default function Canvas({ baseShape = "Circle", baseSize = 400 }) {
  return (
    <div className="canvas">
      <IconResolver
        iconName={baseShape}
        sx={{
          fontSize: baseSize,
          stroke: "#000",
          strokeWidth: "0.1px",
          fill: "#fff",
        }}
      />
    </div>
  );
}
