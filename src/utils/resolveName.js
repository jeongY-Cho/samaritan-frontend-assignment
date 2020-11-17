export default (name) => {
  // strip invalid characters
  const strName = name.replace(/[^\-0-9a-zA-Z]/g, "");

  // if left with string of digits then return it
  if (/^[0-9]*$/.test(strName)) return strName;

  // strip numbers and replace spaces with hyphens
  return strName.replace(/[0-9]/g, "").replace(" ", "-").toLowerCase();
};
