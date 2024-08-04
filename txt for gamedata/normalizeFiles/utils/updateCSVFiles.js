const getFilePaths = require('./getFilePaths');
const readCSV = require('./readCSV');
const writeCSV = require('./writeCSV');

/**
 * Updates a CSV file with the provided data.
 * @param {string} filePath - The path to the CSV file.
 * @param {Object.<string, Array<string>>} mainDataObject - The main data object containing the updated values.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the update was successful.
 */
const updateFile = async (filePath, mainDataObject) => {
  const data = await readCSV(filePath);

  const updatedData = data.map((row, index) => {
    if (index === 0) {
      return mainDataObject.header;
    }

    const foundRow = mainDataObject[row[0]];

    if (foundRow) {
      return [row[0], row[1], foundRow[2]];
    }

    return row;
  });

  return writeCSV(filePath, updatedData, ';');
};

/**
 * Adds a target column to CSV files in the specified folder using data from the main CSV file.
 *
 * @param {string} folderPath - The path to the folder containing the CSV files.
 * @param {string} mainDataPath - The path to the main CSV file.
 */
const updateCSVFiles = async (folderPath, mainDataPath) => {
  const mainData = await readCSV(mainDataPath);

  /**
   * Object containing the main data with target column added.
   * @type {Object.<string, Array<string>>}
   */
  const mainDataObject = mainData.reduce((obj, row, index) => {
    // Skip the header row
    if (index === 0) {
      obj.header = row;
    } else {
      obj[row[0]] = row;
    }

    return obj;
  }, {});

  try {
    const filePaths = await getFilePaths(folderPath);

    for (const filePath of filePaths) {
      await updateFile(filePath, mainDataObject);
    }

    console.log('CSV files updated successfully!');
  } catch (err) {
    console.error(err);
  }
};

module.exports = updateCSVFiles;
