import Button from "@mui/material/Button";

const SIMPLE_TOUCH_SENSOR_SCALE = 3;
const SIMPLE_TOUCH_SENSOR = [
  {
    id: 0,
    type: "base",
    shape: "Circle",
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    flip: false,
  },
  {
    id: 1,
    type: "circuit",
    shape: "Circle",
    x: 0,
    y: 0,
    scaleX: 0.75,
    scaleY: 0.75,
    rotate: 0,
    flip: false,
  },
  {
    id: 2,
    type: "circuit",
    shape: "Circle",
    x: 0,
    y: 183,
    scaleX: 0.13,
    scaleY: 0.13,
    rotate: 0,
    flip: false,
  },
];

const LIGHT_BOX_SCALE = 30;
const LIGHT_BOX = [
  {
    id: 0,
    type: "base",
    shape: "Square",
    x: -160,
    y: -110,
    scaleX: 0.4,
    scaleY: 0.4,
    rotate: 0,
    flip: false,
  },
  {
    id: 1,
    type: "base",
    shape: "Square",
    x: 0,
    y: -110,
    scaleX: 0.4,
    scaleY: 0.4,
    rotate: 0,
    flip: false,
  },
  {
    id: 2,
    type: "base",
    shape: "Square",
    x: -160,
    y: 60,
    scaleX: 0.4,
    scaleY: 0.4,
    rotate: 0,
    flip: false,
  },
  {
    id: 3,
    type: "base",
    shape: "Square",
    x: 0,
    y: 60,
    scaleX: 0.4,
    scaleY: 0.4,
    rotate: 0,
    flip: false,
  },
  {
    id: 4,
    type: "base",
    shape: "Square",
    x: 160,
    y: 60,
    scaleX: 0.4,
    scaleY: 0.4,
    rotate: 0,
    flip: false,
  },
  {
    id: 5,
    type: "pattern",
    shape: "pattern_tree",
    x: -160,
    y: -90,
    scaleX: 0.27,
    scaleY: 0.27,
    rotate: 0,
    flip: false,
  },
  {
    id: 6,
    type: "pattern",
    shape: "pattern_tree",
    x: 0,
    y: -90,
    scaleX: 0.27,
    scaleY: 0.2700000000000001,
    rotate: 0,
    flip: false,
  },
  {
    id: 7,
    type: "pattern",
    shape: "pattern_tree",
    x: -160,
    y: 80,
    scaleX: 0.27,
    scaleY: 0.27,
    rotate: 0,
    flip: false,
  },
  {
    id: 8,
    type: "pattern",
    shape: "pattern_tree",
    x: 0,
    y: 80,
    scaleX: 0.27,
    scaleY: 0.27,
    rotate: 0,
    flip: false,
  },
];

export function TemplateButton({
  setItems,
  setCurrId,
  setEditingId,
  setCanvasScale,
}) {
  function _UseTemplate() {
    setItems(SIMPLE_TOUCH_SENSOR);
    setCurrId(SIMPLE_TOUCH_SENSOR.length);
    setEditingId(-1);
    setCanvasScale(SIMPLE_TOUCH_SENSOR_SCALE);
  }

  function _UseTemplate2() {
    setItems(LIGHT_BOX);
    setCurrId(LIGHT_BOX.length);
    setEditingId(-1);
    setCanvasScale(LIGHT_BOX_SCALE);
  }

  return (
    <>
      <Button onClick={_UseTemplate}>Simple Touch Sensor</Button>
      <Button onClick={_UseTemplate2}>3D Light Box</Button>
    </>
  );
}
