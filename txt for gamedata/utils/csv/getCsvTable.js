const formatStr = (input) => {
  let str = input;

  if (str[0] === '"') {
    str = str.slice(1);
  }

  if (str[str.length - 1] === '"') {
    str = str.slice(0, -1);
  }

  return str;
};

const getCsvLine = ([key, value]) => `"${formatStr(key)}";"${formatStr(value)}"`;

const getCsvTable = (entries) => `"Location";"Source"
${entries.map(getCsvLine).join('\r\n')}`;

module.exports = getCsvTable;
