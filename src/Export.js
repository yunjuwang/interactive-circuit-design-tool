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

    // rescale transform
    let svgTransform = svgNode.getAttribute("transform");
    svgTransform = svgTransform.replace(
      /translate\(([-\d.]+) ([-\d.]+)\)/,
      (match, x, y) => {
        x = (parseFloat(x) / 500) * 24;
        y = (parseFloat(y) / 500) * 24;

        return `translate(${x} ${y})`;
      }
    );

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
        newElementNode.setAttribute("transform-origin", "center");

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
