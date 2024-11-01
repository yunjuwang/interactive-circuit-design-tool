export function CircuitList({ baseSize, handleBaseSizeChange }) {
  return (
    <Box sx={{ width: 200 }}>
      <Typography id="input-slider" gutterBottom>
        Size: {baseSize}
      </Typography>
      <Slider
        value={baseSize}
        onChange={handleBaseSizeChange}
        min={300}
        max={500}
      />
    </Box>
  );
}
