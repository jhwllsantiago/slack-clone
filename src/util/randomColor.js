const randomColor = (limit) => {
  let range = Math.min(Math.max(parseInt(limit), 0), 255);
  range = isNaN(range) ? 255 : range;
  const r = Math.floor(Math.random() * range);
  const g = Math.floor(Math.random() * range);
  const b = Math.floor(Math.random() * range);
  return `rgb(${r}, ${g}, ${b})`;
};
export default randomColor;
