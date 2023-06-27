const getCsvLine = ([key, value]) => `"${key}";"${value}"`;

const getCsvTable = (entries) => `"Location";"Source"
${entries.map(getCsvLine).join('\r\n')}`;

module.exports = getCsvTable;
