import { IconResolver } from "./IconUtils.js";

const DrawBase = ({ shape = "Circle", size = 400 }) => {
  return (
    <IconResolver
      iconName={shape}
      sx={{
        position: "absolute",
        fontSize: size,
        stroke: "#ff0000",
        strokeWidth: "0.1px",
        fill: "none",
      }}
    />
  );
};

const DrawCircuit = ({ shape = "Circle", size = 400 }) => {
  return (
    <IconResolver
      iconName={shape}
      sx={{
        position: "absolute",
        fontSize: size,
        // stroke: "#ff0000",
        // strokeWidth: "0.1px",
        fill: "#000",
      }}
    />
  );
};

export default function Canvas({
  baseShape = "Circle",
  baseSize = 400,
  circuits,
}) {
  return (
    <div className="canvas">
      {baseShape ? <DrawBase shape={baseShape} size={baseSize} /> : null}

      {circuits.map((circuit) => (
        <DrawCircuit shape={circuit.shape} size={400} />
      ))}
    </div>
  );
}
