import { IconResolver, PatternResolver } from "./Utils.js";

const DrawBase = ({
  shape = "Circle",
  x = 0,
  y = 0,
  scaleX = 1,
  scaleY = 1,
  rotate = 0,
  flip = false,
}) => {
  return (
    <IconResolver
      iconName={shape}
      transform={`translate(${x} ${y}) scale(${
        flip ? -scaleX : scaleX
      } ${scaleY}) rotate(${rotate})`}
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
  flip = false,
  editing = false,
}) => {
  return (
    <IconResolver
      iconName={shape}
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${
        flip ? -scaleX : scaleX
      } ${scaleY}) `}
      sx={{
        position: "absolute",
        fontSize: 500,
        stroke: "#000",
        strokeWidth: "0.1px",
        fill: editing ? "rgba(25, 118, 210, 0.3)" : "rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};

const DrawPattern = ({
  shape = "pattern_corner_1",
  x = 0,
  y = 0,
  scaleX = 1,
  scaleY = 1,
  rotate = 0,
  flip = false,
  editing = false,
}) => {
  return (
    <PatternResolver
      patternName={shape}
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${
        flip ? -scaleX : scaleX
      } ${scaleY}) `}
      style={{
        position: "absolute",
        stroke: "#000",
        strokeWidth: "0.1px",
        fill: editing ? "rgba(25, 118, 210, 0.3)" : "rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};

export default function Canvas({ baseShape = "Circle", circuits, editingId }) {
  return (
    <div id="canvas">
      {baseShape ? <DrawBase shape={baseShape} /> : null}

      <DrawPattern />

      {circuits.map((circuit) => (
        <DrawCircuit
          key={circuit.id}
          shape={circuit.shape}
          x={circuit.x}
          y={circuit.y}
          scaleX={circuit.scaleX}
          scaleY={circuit.scaleY}
          rotate={circuit.rotate}
          flip={circuit.flip}
          editing={circuit.id == editingId}
        />
      ))}
    </div>
  );
}
