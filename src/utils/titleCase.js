export default (str) => {
  return str
    .split(" ")
    .map((segment) => {
      return segment[0].toUpperCase() + segment.slice(1);
    })
    .join(" ");
};
