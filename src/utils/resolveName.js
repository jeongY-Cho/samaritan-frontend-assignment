export default (name) => {
  const strName = name.replace(/[^0-9a-zA-Z]/g, "");
  if (/^[0-9]*$/.test(strName)) return strName;

  const aa = strName.replace(/[0-9]/g, "").replace(" ", "-").toLowerCase();
  console.log(aa);
  return aa;
};
