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

function readElement(ParentNode, OrigData) {
  var Children = ParentNode.childNodes;
  var OrigChildDat = OrigData.childNodes;

  for (var cd = 0; cd < Children.length; cd++) {
    var Child = Children[cd];

    var TagName = Child.tagName;
    if (ContainerElements.indexOf(TagName) != -1) {
      readElement(Child, OrigChildDat[cd]);
    } else if (TagName in RelevantStyles) {
      var StyleDef = window.getComputedStyle(OrigChildDat[cd]);

      var StyleString = "";
      for (var st = 0; st < RelevantStyles[TagName].length; st++) {
        StyleString +=
          RelevantStyles[TagName][st] +
          ":" +
          StyleDef.getPropertyValue(RelevantStyles[TagName][st]) +
          "; ";
      }

      Child.setAttribute("style", StyleString);
    }
  }
}

function getTimeStamp() {
  var now = new Date();
  return (
    now.getFullYear() +
    now.getMonth() +
    now.getDate() +
    now.getHours() +
    (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
    (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds())
  );
}

function exportStyledSVG(SVGElem) {
  console.log(SVGElem);
  var oDOM = SVGElem.cloneNode(true);
  readElement(oDOM, SVGElem);

  var data = new XMLSerializer().serializeToString(oDOM);
  var svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  var url = URL.createObjectURL(svg);

  var link = document.createElement("a");
  link.href = url;
  link.download = `interactive_circuit_design_${getTimeStamp()}`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function ExportButton() {
  const handleExport = () => {
    // var svg = document.querySelector("#canvas")?.childNodes;
    // var svg = document.querySelector("#canvas")?.firstChild;
    var svg = document.querySelector("#canvas");
    exportStyledSVG(svg);
  };

  return (
    <Button className="button" variant="contained" onClick={handleExport}>
      Export
    </Button>
  );
}
