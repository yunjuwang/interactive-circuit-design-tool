import { IconResolver } from "./IconUtils.js";

const DrawBase = ({ shape = "Circle", size = 400 }) => {
  return (
    <IconResolver
      iconName={shape}
      sx={{
        fontSize: size,
        stroke: "#ff0000",
        strokeWidth: "0.1px",
        fill: "none",
      }}
    />
  );
};

export default function Canvas({ baseShape = "Circle", baseSize = 400 }) {
  return (
    <div className="canvas">
      <DrawBase shape={baseShape} size={baseSize} />
    </div>
  );
}
