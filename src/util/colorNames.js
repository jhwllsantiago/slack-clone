const colorNames = [
  "#DB7093",
  "#9932CC",
  "#CD5C5C",
  "#FF7F50",
  "#006400",
  "#4682B4",
  "#BC8F8F",
  "#000080",
  "#800000",
  "#5F9EA0",
  "#BDB76B",
  "#FF4500",
  "#C71585",
  "#8B0000",
  "#4B0082",
];

export const colorById = (id) => {
  return colorNames[parseInt(id) % 15];
};

export default colorById;
