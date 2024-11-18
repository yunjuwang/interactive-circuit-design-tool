import { IconResolver, PatternResolver } from "./Utils.js";

const DrawBase = ({
  shape = "Circle",
  x = 0,
  y = 0,
  scaleX = 1,
  scaleY = 1,
  rotate = 0,
  flip = false,
  editing = false,
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
        stroke: editing ? "rgba(25, 118, 210, 1)" : "#ff0000",
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

export default function Canvas({ bases, circuits, editingId }) {
  return (
    <div id="canvas">
      {bases.map((base) => (
        <DrawBase
          key={base.id}
          shape={base.shape}
          x={base.x}
          y={base.y}
          scaleX={base.scaleX}
          scaleY={base.scaleY}
          rotate={base.rotate}
          flip={base.flip}
          editing={base.id == editingId}
        />
      ))}

      {circuits.map((item) =>
        item.type == "circuit" ? (
          <DrawCircuit
            key={item.id}
            shape={item.shape}
            x={item.x}
            y={item.y}
            scaleX={item.scaleX}
            scaleY={item.scaleY}
            rotate={item.rotate}
            flip={item.flip}
            editing={item.id == editingId}
          />
        ) : item.type == "pattern" ? (
          <DrawPattern
            key={item.id}
            shape={item.shape}
            x={item.x}
            y={item.y}
            scaleX={item.scaleX}
            scaleY={item.scaleY}
            rotate={item.rotate}
            flip={item.flip}
            editing={item.id == editingId}
          />
        ) : undefined
      )}
    </div>
  );
}
