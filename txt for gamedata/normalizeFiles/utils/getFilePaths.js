const fs = require('fs/promises');
const path = require('path');

/**
 * Retrieves all file paths within a given folder path, including subfolders.
 * @param {string} folderPath - The path of the folder to retrieve file paths from.
 * @returns {Promise<string[]>} - A promise that resolves to an array of file paths.
 */
const getFilePaths = async (folderPath) => {
  const files = await fs.readdir(folderPath);

  const filePaths = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      const subFiles = await getFilePaths(filePath);
      filePaths.push(...subFiles);
    } else if (path.extname(file) === '.csv') {
      filePaths.push(filePath);
    }
  }

  return filePaths;
};

module.exports = getFilePaths;
