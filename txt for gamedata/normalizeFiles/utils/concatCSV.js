const getFilePaths = require('./getFilePaths');
const readCSV = require('./readCSV');
const writeCSV = require('./writeCSV');

const getIdParts = (id) =>
  id
    .substring(1, id.length - 1)
    .split('-')
    .map(Number);

const sortData = (data) => {
  return data.sort((a, b) => {
    const [a1, a2, a3] = getIdParts(a[0]);
    const [b1, b2, b3] = getIdParts(b[0]);

    if (a1 !== b1) {
      return a1 - b1;
    }
    if (a2 !== b2) {
      return a2 - b2;
    }
    return a3 - b3;
  });
};

/**
 * Concatenates multiple CSV files into a single CSV file.
 *
 * @param {string} folderPath - The path to the folder containing the CSV files.
 * @param {string} outputFilePath - The path to the output file where the concatenated CSV will be written.
 * @returns {Promise<void>} - A promise that resolves when the CSV files are concatenated successfully, or rejects with an error if an error occurs.
 */
const concatCSV = async (folderPath, outputFilePath) => {
  try {
    const filePaths = await getFilePaths(folderPath);

    let header = '';
    const data = [];

    for (const filePath of filePaths) {
      const csv = await readCSV(filePath);

      if (!header.length) {
        header = csv[0];
      }

      data.push(csv.slice(1));
    }

    const sortedData = sortData(data.flat());
    const concatenatedData = [header, ...sortedData];

    await writeCSV(outputFilePath, concatenatedData);

    console.log('CSV files concatenated successfully!');
  } catch (error) {
    console.error('Error concatenating CSV files:', error);
  }
};

module.exports = concatCSV;
