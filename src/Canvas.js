import { IconResolver, PatternResolver } from "./Utils.js";
import { useRef, useEffect } from "react";
import Moveable from "react-moveable";
import { flushSync } from "react-dom";
import { InputSlider } from "./Slider.js";

export function CanvasScaleSlider({ canvasScale, setCanvasScale }) {
  return (
    <InputSlider
      InputName="Canvas Scale(cm) :"
      value={canvasScale}
      setValue={setCanvasScale}
      minValue={3}
      maxValue={30}
      sx={{
        minWidth: "300px",
        position: "absolute",
        left: "68px",
        bottom: "8px",
      }}
    />
  );
}

function DrawScaleRuler({ canvasScale = 5 }) {
  let scales = [];
  for (let i = 0; i <= canvasScale * 10; i++) {
    if (i % 10 == 0) {
      scales.push(
        <li key={i}>
          <span>{i / 10}</span>
        </li>
      );
    } else {
      scales.push(<li key={i}> </li>);
    }
  }

  return (
    <>
      <div className="ruler-container">
        <ul className="ruler">{scales}</ul>
      </div>
      <div className="ruler-container">
        <ul className="ruler vertical">{scales}</ul>
      </div>
    </>
  );
}

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
    // strokeWidth: "0.1px",
    strokeWidth: "0px",
    fill: editing ? "rgba(25, 118, 210, 0.3)" : "rgba(0, 0, 0, 0.2)",
  };
  const patternStyle = {
    position: "absolute",
    stroke: "#000",
    // strokeWidth: "0.1px",
    strokeWidth: "0px",
    fill: editing ? "rgba(25, 118, 210, 0.3)" : "rgba(0, 0, 0, 0.2)",
  };

  const moveableRef = useRef(null);

  useEffect(() => {
    const svgComponent = document.querySelector(".target");
    if (svgComponent) {
      svgComponent.setAttribute(
        "style",
        `transform: translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY}) rotate(${rotate}deg)`
      );
    }
    moveableRef.current?.updateRect();
  }, [x, y, scaleX, scaleY, rotate]);

  let newX, newY, newScaleX, newScaleY, newRotate;

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
          sx={patternStyle}
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
          onDragStart={(e) => {
            e.set([x, y]);
          }}
          onDrag={(e) => {
            newX = parseInt(e.translate[0]);
            newY = parseInt(e.translate[1]);

            newX = newX > 200 ? 200 : newX < -200 ? -200 : newX;
            newY = newY > 200 ? 200 : newY < -200 ? -200 : newY;

            e.target.setAttribute(
              "style",
              `transform: translate(${newX}px, ${newY}px) scale(${scaleX}, ${scaleY}) rotate(${rotate}deg)`
            );
          }}
          onDragEnd={(e) => {
            setX(newX);
            setY(newY);
          }}
          onScaleStart={(e) => {
            e.set([scaleX, scaleY]);
          }}
          onScale={(e) => {
            newScaleX = parseFloat(e.scale[0].toFixed(2));
            newScaleY = parseFloat(e.scale[1].toFixed(2));

            newScaleX =
              newScaleX > 1.0 ? 1.0 : newScaleX < 0.01 ? 0.01 : newScaleX;
            newScaleY =
              newScaleY > 1.0 ? 1.0 : newScaleY < 0.01 ? 0.01 : newScaleY;

            e.target.setAttribute(
              "style",
              `transform: translate(${x}px, ${y}px) scale(${newScaleX}, ${newScaleY}) rotate(${rotate}deg)`
            );
          }}
          onScaleEnd={(e) => {
            setScaleX(newScaleX);
            setScaleY(newScaleY);
          }}
          onRotateStart={(e) => {
            e.set(rotate);
          }}
          onRotate={(e) => {
            newRotate = parseInt(e.rotation);
            newRotate =
              newRotate > 360 ? 360 : newRotate < -360 ? -360 : newRotate;

            e.target.setAttribute(
              "style",
              `transform: translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY}) rotate(${newRotate}deg)`
            );
          }}
          onRotateEnd={(e) => {
            setRotate(newRotate);
          }}
          onRender={(e) => {
            // e.target.style.transform = e.transform;
            // console.log(e.transform);
          }}
        ></Moveable>
      ) : undefined}
    </>
  );
}

export function Canvas({
  bases,
  circuits,
  editingId,
  setX,
  setY,
  setScaleX,
  setScaleY,
  setRotate,
  lockScale,
  canvasScale,
}) {
  return (
    <div id="canvas">
      <DrawScaleRuler canvasScale={canvasScale} />
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
