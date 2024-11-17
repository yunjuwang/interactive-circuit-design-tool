import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import laserCut_0 from "./img/laser_cut_0.jpg";
import laserCut_1 from "./img/laser_cut_1.jpg";
import laserCut_2 from "./img/laser_cut_2.jpg";

import filament from "./img/filament.jpg";
import pen from "./img/3d_pen.jpg";
import draw_1 from "./img/draw_1.jpg";

export function DrawCircuitImg() {
  return (
    <div className="img-container">
      <img src={filament} height="280px" />
      <img src={pen} height="280px" />
      <NavigateNextIcon />
      <img src={draw_1} height="280px" />
    </div>
  );
}

export function LaserCutImg() {
  return (
    <div className="img-container">
      <img src={laserCut_0} height="280px" />
      <NavigateNextIcon />
      <img src={laserCut_1} height="280px" />
      <NavigateNextIcon />
      <img src={laserCut_2} height="280px" />
    </div>
  );
}
