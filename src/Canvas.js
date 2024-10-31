import { IconResolver } from "./IconUtils.js";

export default function Canvas({ base = "Circle", size = 400 }) {
  return (
    <div className="canvas">
      <IconResolver
        iconName={base}
        sx={{
          fontSize: size,
          stroke: "#000",
          strokeWidth: "0.1px",
          fill: "#fff",
        }}
      />
    </div>
  );
}
