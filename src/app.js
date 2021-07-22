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

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/current", async (req, res, next) => {
  const barFile = "bar.data";
  const rainFile = "rain.data";
  const tempFile = "temp.data";
  const promises = [barFile, rainFile, tempFile].map((fileName) => {
    return new Promise((resolve, reject) => {
      const filePath = path.join(".", "fs", fileName);
      fs.readFile(filePath, "utf-8", (error, data) => {
        // Read base file name.
        const ext = ".data";
        const elem = path.basename(fileName, ext);
        if (error) {
          resolve({ name: elem, value: "... data not found" });
        } else {
          const result = `{ "${elem}": ${data} }`;
          resolve(JSON.parse(result));
        }
      });
    });
  });

  Promise.all(promises)
    .then((results) => {
      const data = results.reduce((acc, item) => {
        return { ...acc, ...item };
      });
      // TODO: Output the device name and other useful data.
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

const port = process.env.PORT || 15600;

app.listen(port, () => {
  console.log("Application running on http://localhost:%i", port);
});

module.exports = app;
