import { InputSelect, OutputSelect } from "./Selects.js";
import { BaseShapeButtons, BaseSizeSlider } from "./Base.js";

export default function Settings({
  input,
  handleInputChange,
  output,
  handleOutputChange,
  baseShape,
  handleBaseShapeChange,
  baseSize,
  handleBaseSizeChange,
}) {
  return (
    <div id="settings">
      <h2>System I/O</h2>
      <InputSelect input={input} handleInputChange={handleInputChange} />
      <OutputSelect output={output} handleOutputChange={handleOutputChange} />

      <h2>Base</h2>
      <div className="section">
        <BaseShapeButtons
          baseShape={baseShape}
          handleBaseShapeChange={handleBaseShapeChange}
        />
        <BaseSizeSlider
          baseSize={baseSize}
          handleBaseSizeChange={handleBaseSizeChange}
        />
      </div>
      <h2>Circuit</h2>
      <div className="section">
        <BaseShapeButtons />
        <BaseSizeSlider />
      </div>
    </div>
  );
}
