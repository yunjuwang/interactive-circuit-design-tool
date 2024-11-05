import { IconResolver } from "./IconUtils.js";

const DrawBase = ({
  shape = "Circle",
  x = 0,
  y = 0,
  scaleX = 1,
  scaleY = 1,
  rotate = 0,
}) => {
  return (
    <IconResolver
      iconName={shape}
      transform={`translate(${x} ${y}) scale(${scaleX} ${scaleY}) rotate(${rotate})`}
      sx={{
        position: "absolute",
        fontSize: 500,
        stroke: "#ff0000",
        strokeWidth: "0.1px",
        fill: "none",
      }}
    />
  );
};

const DrawCircuit = ({
  shape = "Circle",
  x = 0,
  y = 0,
  scaleX = 0.5,
  scaleY = 0.5,
  rotate = 0,
}) => {
  return (
    <IconResolver
      iconName={shape}
      transform={`translate(${x} ${y}) scale(${scaleX} ${scaleY}) rotate(${rotate})`}
      sx={{
        position: "absolute",
        fontSize: 500,
        stroke: "#000",
        strokeWidth: "0.1px",
        fill: "rgba(0,0,0,0.2)",
      }}
    />
  );
};

export default function Canvas({ baseShape = "Circle", circuits }) {
  return (
    <div id="canvas">
      {baseShape ? <DrawBase shape={baseShape} /> : null}

      {circuits.map((circuit) => (
        <DrawCircuit
          shape={circuit.shape}
          x={circuit.x}
          y={circuit.y}
          scaleX={circuit.scaleX}
          scaleY={circuit.scaleY}
          rotate={circuit.rotate}
        />
      ))}
    </div>
  );
}
