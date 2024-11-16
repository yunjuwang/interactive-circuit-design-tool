import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function InputSelect({ input, handleInputChange }) {
  return (
    <Box sx={{ minWidth: 120 }} id="input-select">
      <FormControl fullWidth>
        <InputLabel id="input-select-label">Input</InputLabel>
        <Select
          labelId="input-select-label"
          value={input}
          label="Input"
          onChange={handleInputChange}
        >
          <MenuItem value={"input_touch"}>Touch Sensor</MenuItem>
          <MenuItem value={"input_temperature"}>Temperature Sensor</MenuItem>
          <MenuItem value={"input_moisture"}>Moisture Sensor</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export function OutputSelect({ output, handleOutputChange }) {
  return (
    <Box sx={{ minWidth: 120 }} id="output-select">
      <FormControl fullWidth>
        <InputLabel id="output-select-label">Output</InputLabel>
        <Select
          labelId="output-select-label"
          value={output}
          label="Output"
          onChange={handleOutputChange}
        >
          <MenuItem value={"output_led"}>LED</MenuItem>
          <MenuItem value={"output_sound"}>Sound</MenuItem>
          <MenuItem value={"output_vibration"}>Vibration</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
