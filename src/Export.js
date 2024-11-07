import Button from "@mui/material/Button";

var ContainerElements = ["svg", "g"];
var RelevantStyles = {
  rect: ["fill", "stroke", "stroke-width"],
  path: ["fill", "stroke", "stroke-width"],
  circle: ["fill", "stroke", "stroke-width"],
  line: ["stroke", "stroke-width"],
  text: ["fill", "font-size", "text-anchor"],
  polygon: ["stroke", "fill"],
};

function GetTimeStamp() {
  var now = new Date();
  return `${now.getFullYear()}${
    now.getMonth() + 1
  }${now.getDate()}${now.getHours()}${
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
  }${now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()}`;
}

function ExportSvg(svg) {
  var data = new XMLSerializer().serializeToString(svg);
  var blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  var url = URL.createObjectURL(blob);

  var link = document.createElement("a");
  link.href = url;
  link.download = `interactive_circuit_design_${GetTimeStamp()}`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function GenerateSvgFromCanvas(canvas) {
  // create a new svg container
  const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  newSvg.setAttribute("viewBox", "0 0 24 24");
  newSvg.setAttribute("height", "500px");
  newSvg.setAttribute("width", "500px");

  // deal with all svgs, collect all the element inside
  const svgNodes = canvas.childNodes;

  for (let i = 0; i < svgNodes.length; i++) {
    const svgNode = svgNodes[i];
    const svgStyle = window.getComputedStyle(svgNode);

    let svgTransform = svgNode.getAttribute("transform");
    console.log(svgTransform);
    const scale = svgTransform.match(/scale\(([-\d.]+) ([-\d.]+)\)/);
    const scaleX = parseFloat(scale[1]);
    const scaleY = parseFloat(scale[2]);
    const rotate = svgTransform.match(/rotate\(([-\d.]+)\)/)[1];
    const rotateRadians = (rotate * Math.PI) / 180;
    const centerX = 12;
    const centerY = 12;

    svgTransform = svgTransform.replace(
      /translate\(([-\d.]+) ([-\d.]+)\)/,
      (match, x, y) => {
        // rescale transform
        x = (parseFloat(x) / 500) * 24;
        y = (parseFloat(y) / 500) * 24;
        console.log(x, y);
        // change transform-origin from (0 0) to center
        // x = x - centerX_rotated * (1 - scaleX);
        // y = y - centerY_rotated * (1 - scaleY);
        // x = x + centerX * (scaleX - 1);
        // y = y + centerY * (scaleY - 1);

        // x = x - centerX_rotated * (1 - scaleX);
        // y = y - centerY_rotated * (1 - scaleY);

        // 旋轉角度轉換為弧度
        let rotateRad = (rotate * Math.PI) / 180;

        // // 旋轉後的偏移量
        // let deltaX = x - centerX;
        // let deltaY = y - centerY;

        // // 使用旋轉矩陣公式計算旋轉後的坐標
        // let rotatedX =
        //   deltaX * Math.cos(angleRad) - deltaY * Math.sin(angleRad) + centerX;
        // let rotatedY =
        //   deltaX * Math.sin(angleRad) + deltaY * Math.cos(angleRad) + centerY;

        // // 調整 translate，使基準點為左上角 (0,0)
        // x = x + centerX * (scaleX - 1) - rotatedX;
        // y = y + centerY * (scaleY - 1) - rotatedY;

        // const centerX = 12;
        // const centerY = 12;
        const centerX_scaled = centerX * scaleX;
        const centerY_scaled = centerY * scaleY;
        // scale
        x = x + centerX * (1 - scaleX);
        y = y + centerY * (1 - scaleY);

        let newXr = centerX * (1 - scaleX);
        let newYr = centerY * (1 - scaleY);

        let X1 =
          12 + (x - 12) * Math.cos(rotateRad) - (y - 12) * Math.sin(rotateRad);
        let X2 =
          newXr +
          (x - newXr) * Math.cos(rotateRad) -
          (y - newYr) * Math.sin(rotateRad);
        let deltaX = X1 - X2;
        console.log("X1: " + X1 + " X2: " + X2 + " deltaX: " + deltaX);

        let Y1 =
          12 + (x - 12) * Math.sin(rotateRad) + (y - 12) * Math.cos(rotateRad);
        let Y2 =
          newYr +
          (x - newXr) * Math.sin(rotateRad) +
          (y - newYr) * Math.cos(rotateRad);
        let deltaY = Y1 - Y2;
        x = x + deltaX;
        y = y + deltaY;
        // x =
        //   x +
        //   12 *
        //     (scaleX -
        //       scaleX * Math.cos(rotateRad) +
        //       (2 - scaleY) * Math.sin(rotateRad));

        // // // rotate
        // x =
        //   x - centerX_scaled * (1 - Math.sin(rotateRad) - Math.cos(rotateRad));
        // y =
        //   y - centerY_scaled * (1 - Math.cos(rotateRad) + Math.sin(rotateRad));
        // // rotate
        // x = x - 12 * (1 - Math.sin(rotateRad) - Math.cos(rotateRad));
        // y = y - 12 * (1 - Math.cos(rotateRad) + Math.sin(rotateRad));

        // const centerX_rotated =
        //   centerX * Math.cos(rotateRad) - centerY * Math.sin(rotateRad);
        // const centerY_rotated =
        //   centerX * Math.sin(rotateRad) + centerY * Math.cos(rotateRad);
        // const centerX_rotated =
        //   centerX * Math.cos(rotateRad) - centerY * Math.sin(rotateRad);
        // const centerY_rotated =
        //   centerX * Math.sin(rotateRad) + centerY * Math.cos(rotateRad);

        // console.log(
        //   "center_rotated: " + centerX_rotated + " " + centerY_rotated
        // );

        // // scale
        // x = x + centerX_rotated * (1 - scaleX);
        // y = y + centerY_rotated * (1 - scaleY);

        // scale
        // x = x + centerX_rotated * (1 - scaleX);
        // y = y + centerY_rotated * (1 - scaleY);

        return `translate(${x} ${y})`;
      }
    );
    console.log(svgTransform);
    const elementNodes = svgNode.childNodes;

    // deal with all elements(path) in svg
    for (let j = 0; j < elementNodes.length; j++) {
      const elementNode = elementNodes[j];
      const newElementNode = elementNode.cloneNode(true);
      const tagName = elementNode.tagName;

      if (tagName in RelevantStyles) {
        var styleString = "";

        for (var st = 0; st < RelevantStyles[tagName].length; st++) {
          styleString += `${
            RelevantStyles[tagName][st]
          }:${svgStyle.getPropertyValue(RelevantStyles[tagName][st])}; `;
        }

        newElementNode.setAttribute("style", styleString);
        newElementNode.setAttribute("transform", svgTransform);
        // newElementNode.setAttribute("transform-origin", "center"); //not working in some app

        newSvg.appendChild(newElementNode);
      }
    }
  }
  return newSvg;
}

export function ExportButton() {
  const handleExport = () => {
    const canvas = document.querySelector("#canvas");
    const newSvg = GenerateSvgFromCanvas(canvas);

    ExportSvg(newSvg);
  };

  return (
    <Button className="button" variant="contained" onClick={handleExport}>
      Export
    </Button>
  );
}
