import Button from "@mui/material/Button";

import TouchAppIcon from "@mui/icons-material/TouchApp";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";

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
    scaleX: 0.39,
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
    scaleX: 0.39,
    scaleY: 0.4,
    rotate: 0,
    flip: false,
  },
  {
    id: 4,
    type: "base",
    shape: "Square",
    x: 160,
    y: 58,
    scaleX: 0.39,
    scaleY: 0.39,
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
  {
    id: 9,
    type: "pattern",
    shape: "pattern_tree_corner",
    x: 122,
    y: 20,
    scaleX: 0.27,
    scaleY: 0.27,
    rotate: 0,
    flip: false,
  },
  {
    id: 11,
    type: "pattern",
    shape: "pattern_tree_corner",
    x: 198,
    y: 20,
    scaleX: 0.27,
    scaleY: 0.27,
    rotate: 90,
    flip: false,
  },
  {
    id: 12,
    type: "pattern",
    shape: "pattern_tree_corner",
    x: 198,
    y: 97,
    scaleX: 0.27,
    scaleY: 0.27,
    rotate: 180,
    flip: false,
  },
  {
    id: 13,
    type: "pattern",
    shape: "pattern_tree_corner",
    x: 122,
    y: 97,
    scaleX: 0.27,
    scaleY: 0.27,
    rotate: 270,
    flip: false,
  },
];

const VASE_SCALE = 20;
const VASE = [
  {
    id: 0,
    type: "base",
    shape: "Square",
    x: -188,
    y: -75,
    scaleX: 0.33,
    scaleY: 0.8,
    rotate: 0,
    flip: false,
  },
  {
    id: 1,
    type: "base",
    shape: "Square",
    x: -50,
    y: -75,
    scaleX: 0.33,
    scaleY: 0.8,
    rotate: 0,
    flip: false,
  },
  {
    id: 2,
    type: "base",
    shape: "Square",
    x: 75,
    y: -75,
    scaleX: 0.27,
    scaleY: 0.8,
    rotate: 0,
    flip: false,
  },
  {
    id: 3,
    type: "base",
    shape: "Square",
    x: 200,
    y: -75,
    scaleX: 0.27,
    scaleY: 0.8,
    rotate: 0,
    flip: false,
  },
  {
    id: 4,
    type: "base",
    shape: "Square",
    x: -200,
    y: 140,
    scaleX: 0.27,
    scaleY: 0.27,
    rotate: 0,
    flip: false,
  },
  {
    id: 5,
    type: "circuit",
    shape: "WaterDrop",
    x: -187,
    y: -155,
    scaleX: 0.12,
    scaleY: 0.12,
    rotate: 0,
    flip: false,
  },
  {
    id: 6,
    type: "circuit",
    shape: "WaterDrop",
    x: -187,
    y: -78,
    scaleX: 0.12,
    scaleY: 0.12,
    rotate: 0,
    flip: false,
  },
  {
    id: 7,
    type: "circuit",
    shape: "WaterDrop",
    x: -187,
    y: 0,
    scaleX: 0.12,
    scaleY: 0.12,
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

  function _UseTemplate3() {
    setItems(VASE);
    setCurrId(VASE.length);
    setEditingId(-1);
    setCanvasScale(VASE_SCALE);
  }

  return (
    <>
      <Button startIcon={<TouchAppIcon />} onClick={_UseTemplate}>
        Simple Touch Sensor
      </Button>
      <Button startIcon={<ViewInArIcon />} onClick={_UseTemplate2}>
        3D Light Box
      </Button>
      <Button startIcon={<LocalDrinkIcon />} onClick={_UseTemplate3}>
        Water Level Sense Vase
      </Button>
    </>
  );
}
