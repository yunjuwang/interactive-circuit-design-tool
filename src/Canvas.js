import { IconResolver, PatternResolver } from "./Utils.js";
import { useRef } from "react";
import Moveable from "react-moveable";

function Draw({
  type,
  shape,
  x = 0,
  y = 0,
  scaleX = 1,
  scaleY = 1,
  rotate = 0,
  flip = false,
  editing = false,
}) {
  const baseStyle = {
    position: "absolute",
    fontSize: 500,
    stroke: editing ? "rgba(25, 118, 210, 1)" : "#ff0000",
    strokeWidth: "0.1px",
    fill: "none",
  };
  const circuitStyle = {
    position: "absolute",
    fontSize: 500,
    stroke: "#000",
    strokeWidth: "0.1px",
    fill: editing ? "rgba(25, 118, 210, 0.3)" : "rgba(0, 0, 0, 0.2)",
  };
  const patternStyle = {
    position: "absolute",
    stroke: "#000",
    strokeWidth: "0.1px",
    fill: editing ? "rgba(25, 118, 210, 0.3)" : "rgba(0, 0, 0, 0.2)",
  };
  const targetRef = useRef(null);

  return (
    <>
      {type == "base" || type == "circuit" ? (
        <IconResolver
          iconName={shape}
          className="target"
          targetRef={targetRef}
          transform={`translate(${x} ${y}) scale(${
            flip ? -scaleX : scaleX
          } ${scaleY}) rotate(${rotate})`}
          sx={
            type == "base"
              ? baseStyle
              : type == "circuit"
              ? circuitStyle
              : undefined
          }
        />
      ) : (
        <PatternResolver
          patternName={shape}
          className="target"
          targetRef={targetRef}
          transform={`translate(${x} ${y}) rotate(${rotate}) scale(${
            flip ? -scaleX : scaleX
          } ${scaleY}) `}
          style={patternStyle}
        />
      )}
      {editing ? (
        <Moveable
          target={targetRef}
          draggable={true}
          rotatable={true}
          scalable={true}
          onRender={(e) => {
            // e.target.style.cssText += e.cssText;
            e.target.style.transform = e.transform;
            console.log(e.transform);
          }}
        ></Moveable>
      ) : undefined}
    </>
  );
}

export default function Canvas({ bases, circuits, editingId }) {
  return (
    <div id="canvas">
      {bases
        .concat(circuits)
        // draw editing item last so it can be edited
        .sort((x, y) => (x.id == editingId ? 1 : y.id == editingId ? -1 : 0))
        .map((base) => (
          <Draw
            key={base.id}
            type={base.type}
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
    </div>
  );
}
