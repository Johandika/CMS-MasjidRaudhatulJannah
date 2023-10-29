function replaceBackslashesWithSlashes(inputString) {
  return inputString?.replace(/\\/g, "/");
}

const formatPathGambar = (data) => {
  return replaceBackslashesWithSlashes(data);
};

export default formatPathGambar;
