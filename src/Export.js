import Button from "@mui/material/Button";

// var ContainerElements = ["svg", "g"];
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

function GenerateSvgFromCanvas(canvas, canvasScale) {
  // create a new svg container
  const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  newSvg.setAttribute("viewBox", `0 0 ${canvasScale} ${canvasScale}`);

  // deal with all svgs, collect all elements inside
  const svgNodes = canvas.childNodes;

  for (let i = 0; i < svgNodes.length; i++) {
    const svgNode = svgNodes[i];

    if (svgNode.nodeName != "svg") continue;

    const svgStyle = window.getComputedStyle(svgNode);
    let svgTransform = svgNode.getAttribute("transform");

    const scale = svgTransform.match(/scale\(([-\d.]+) ([-\d.]+)\)/);
    const scaleX = parseFloat(scale[1]);
    const scaleY = parseFloat(scale[2]);
    const rotate = svgTransform.match(/rotate\(([-\d.]+)\)/)[1];
    const rotateRad = (rotate * Math.PI) / 180;
    const centerX = 12;
    const centerY = 12;

    svgTransform = svgTransform
      .replace(/translate\(([-\d.]+) ([-\d.]+)\)/, (match, x, y) => {
        // rescale transform
        x = (parseFloat(x) / 500) * 24;
        y = (parseFloat(y) / 500) * 24;

        // scale
        // (12, 12) > (0, 0)
        x = x + centerX * (1 - scaleX);
        y = y + centerY * (1 - scaleY);

        // rotate
        // (12, 12) > (scaledOrigX, scaledOrigY)
        const scaledOrigX = centerX * (1 - scaleX);
        const scaledOrigY = centerY * (1 - scaleY);
        const rotatedOnCenterX =
          centerX +
          (x - centerX) * Math.cos(rotateRad) -
          (y - centerY) * Math.sin(rotateRad);
        const rotatedOnScaledOrigX =
          scaledOrigX +
          (x - scaledOrigX) * Math.cos(rotateRad) -
          (y - scaledOrigY) * Math.sin(rotateRad);
        const deltaX = rotatedOnCenterX - rotatedOnScaledOrigX;

        const rotatedOnCenterY =
          centerY +
          (x - centerX) * Math.sin(rotateRad) +
          (y - centerY) * Math.cos(rotateRad);
        const rotatedOnScaledOrigY =
          scaledOrigY +
          (x - scaledOrigX) * Math.sin(rotateRad) +
          (y - scaledOrigY) * Math.cos(rotateRad);
        const deltaY = rotatedOnCenterY - rotatedOnScaledOrigY;

        x = x + deltaX;
        y = y + deltaY;

        return `translate(${x} ${y})`;
      })
      // scale SVG according to canvasScale
      .replace(/scale\(([-\d.]+) ([-\d.]+)\)/, (match, x, y) => {
        x = (x * canvasScale) / 24;
        y = (y * canvasScale) / 24;

        return `scale(${x} ${y})`;
      });
    const elementNodes = svgNode.childNodes;

    // deal with all elements(path) in svg
    for (let j = 0; j < elementNodes.length; j++) {
      const elementNode = elementNodes[j];
      const newElementNode = elementNode.cloneNode(true);
      const tagName = elementNode.tagName;

      if (tagName in RelevantStyles) {
        var styleString = "";

        for (var st = 0; st < RelevantStyles[tagName].length; st++) {
          // replace editing circuit color
          let propertyValue = svgStyle.getPropertyValue(
            RelevantStyles[tagName][st]
          );
          if (propertyValue == "rgba(25, 118, 210, 0.3)") {
            propertyValue = "rgba(0, 0, 0, 0.2)";
          } else if (propertyValue == "rgba(25, 118, 210, 1)") {
            propertyValue = "rgba(0, 0, 0, 0.2)";
          }
          styleString += `${RelevantStyles[tagName][st]}:${propertyValue}; `;
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

export function ExportButton({ canvasScale }) {
  const handleExport = () => {
    const canvas = document.querySelector("#canvas");
    const newSvg = GenerateSvgFromCanvas(canvas, parseInt(canvasScale) * 10);

    ExportSvg(newSvg);
  };

  return (
    <Button className="button" variant="contained" onClick={handleExport}>
      Export
    </Button>
  );
}
