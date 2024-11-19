import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

const Input = styled(MuiInput)`
  width: 40px;
  font-size: 12.5px;
`;

export function InputSlider({
  InputName,
  value,
  setValue,
  minValue = -200,
  maxValue = 200,
  step = 1,
}) {
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < minValue) {
      setValue(minValue);
    } else if (value > maxValue) {
      setValue(maxValue);
    }
  };

  return (
    <Box sx={{ minWidth: 160 }}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item sx={{ fontSize: "13px" }}>
          {InputName}
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            step={step}
            min={minValue}
            max={maxValue}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: step,
              min: minValue,
              max: maxValue,
              type: "number",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
