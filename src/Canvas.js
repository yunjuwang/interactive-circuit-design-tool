import { IconResolver, PatternResolver } from "./Utils.js";
import { useRef, useEffect } from "react";
import Moveable from "react-moveable";
import { flushSync } from "react-dom";

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
  setX,
  setY,
  setScaleX,
  setScaleY,
  setRotate,
  lockScale,
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

  const moveableRef = useRef(null);

  useEffect(() => {
    moveableRef.current?.updateRect();
  }, [x, y, scaleX, scaleY, rotate]);

  return (
    <>
      {type == "base" || type == "circuit" ? (
        <IconResolver
          iconName={shape}
          className={editing ? "target" : undefined}
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
          className={editing ? "target" : undefined}
          transform={`translate(${x} ${y}) rotate(${rotate}) scale(${
            flip ? -scaleX : scaleX
          } ${scaleY}) `}
          style={patternStyle}
        />
      )}
      {editing ? (
        <Moveable
          flushSync={flushSync}
          ref={moveableRef}
          target={".target"}
          draggable={true}
          rotatable={true}
          scalable={true}
          keepRatio={lockScale}
          onDrag={(e) => {
            setX(parseInt(e.translate[0]));
            setY(parseInt(e.translate[1]));
          }}
          onScale={(e) => {
            const newX = parseFloat((scaleX * e.scale[0]).toFixed(2));
            const newY = parseFloat((scaleY * e.scale[1]).toFixed(2));

            setScaleX(newX);
            setScaleY(newY);
          }}
          onRotate={(e) => {
            setRotate(parseInt(e.rotation));
          }}
          onRender={(e) => {
            console.log(e.transform);
          }}
        ></Moveable>
      ) : undefined}
    </>
  );
}

export default function Canvas({
  bases,
  circuits,
  editingId,
  setX,
  setY,
  setScaleX,
  setScaleY,
  setRotate,
  lockScale,
}) {
  return (
    <div id="canvas">
      {bases
        .concat(circuits)
        // draw editing item last so it can be edited
        .sort((x, y) => (x.id == editingId ? 1 : y.id == editingId ? -1 : 0))
        .map((item) => (
          <Draw
            key={item.id}
            type={item.type}
            shape={item.shape}
            x={item.x}
            y={item.y}
            scaleX={item.scaleX}
            scaleY={item.scaleY}
            rotate={item.rotate}
            flip={item.flip}
            editing={item.id == editingId}
            setX={setX}
            setY={setY}
            setScaleX={setScaleX}
            setScaleY={setScaleY}
            setRotate={setRotate}
            lockScale={lockScale}
          />
        ))}
    </div>
  );
}
