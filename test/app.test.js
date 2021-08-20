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

const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("GET /", () => {
  it("responds with successful result!", (done) => {
    request(app)
      .get("/current")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("responds with current mock data!", (done) => {
    request(app)
      .get("/current")
      .expect({
        data: {
          clouds: 4,
          humidity: 20,
          pres: 990,
          rain: 1,
          snow: 0,
          temp: 26,
          tempMax: 28,
          tempMin: 24,
          weatherDescription: "Partly Cloudy",
          weatherIcon: "mdi-weather-partly-cloudy",
        },
      })
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});
