/*
Provide local weather data to remote server.

Copyright (C) 2021  Daniele Tentoni

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

"use strict";

const fs = require("fs");
const path = require("path");

/**
 * Process the result from the file read.
 * @param {String} fileName Name of file used.
 * @param {Error} error Error from read file.
 * @param {String} data Data from read file.
 * @returns Parsed value from file. Is empty if there was and error during the process.
 */
const processData = (fileName, error, data) => {
  // Read base file name.
  const ext = ".data";
  const elem = path.basename(fileName, ext);
  if (error) {
    // If there's an error, the application must return a null value.
    return { name: elem, value: "" };
  } else {
    const result = `{ "${elem}": ${data} }`;
    return JSON.parse(result);
  }
};

/**
 * Read a file and process his contents.
 * @param {String} fileName Name of file used.
 * @returns Promise completed when data from file are processed.
 */
const read = (fileName) =>
  new Promise((resolve, reject) => {
    // Suppose that all sensors put results in this folder.
    const filePath = path.join(".", "fs", fileName);
    fs.readFile(filePath, "utf-8", (error, data) => {
      const res = processData(fileName, error, data);
      resolve(res);
    });
  });

// Don't read data from any source: specify every resource file name.
const cloudsFile = "clouds.data";
const humidityFile = "humidity.data";
const pressureFile = "pressure.data";
const rainFile = "rain.data";
const snowFile = "snow.data";
const tempFile = "temp.data";
const tempMaxFile = "tempMax.data";
const tempMinFile = "tempMin.data";
const weatherDescriptionFile = "weatherDescription.data";
const weatherIconFile = "weatherIcon.data";
const files = [
  cloudsFile,
  humidityFile,
  pressureFile,
  rainFile,
  snowFile,
  tempFile,
  tempMaxFile,
  tempMinFile,
  weatherDescriptionFile,
  weatherIconFile,
];

/**
 * Read all files defined in files array and return their contents.
 * @returns Promise completed after all reads.
 */
const promises = () => Promise.all(files.map((fileName) => read(fileName)));

/**
 * Read all files to get weather data.
 * @param {Request} req Express Request.
 * @param {Response} res Express Response.
 * @returns Response to the client.
 */
const readAll = async (req, res) => {
  try {
    const results = await promises();

    console.log("Read");
    const data = results.reduce((acc, item) => {
      return { ...acc, ...item };
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  readAll,
  files,
};
