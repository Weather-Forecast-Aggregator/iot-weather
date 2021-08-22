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

const request = require("supertest");
const app = require("../src/app");
const chai = require("chai");
const expect = chai.expect;
const chai_http = require("chai-http");
chai.use(chai_http);

describe("GET /", () => {
  it("respons with successful result!", async () => {
    const result = await request(app)
      .get("/info")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(result).to.have.status(200);
    expect(result).to.be.an("object");
    expect(result.body).to.have.a.property("name", process.env.DEVICE_NAME);
    expect(result.body).to.have.a.property("files").to.be.an("array");
  });

  it("responds with successful result!", async () => {
    const result = await request(app)
      .get("/current")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(result).to.have.status(200);
    expect(result).to.be.an("object");
    expect(result.body).to.have.a.property("data");
    expect(result.body.data).to.be.an("object");
    expect(result.body.data).to.have.a.property("clouds", 4);
    expect(result.body.data).to.have.a.property("humidity", 20);
    expect(result.body.data).to.have.a.property("pressure", 990);
    expect(result.body.data).to.have.a.property("rain", 1);
    expect(result.body.data).to.have.a.property("snow", 0);
    expect(result.body.data).to.have.a.property("temp", 26);
    expect(result.body.data).to.have.a.property("tempMax", 28);
    expect(result.body.data).to.have.a.property("tempMin", 24);
    expect(result.body.data).to.have.a.property(
      "weatherDescription",
      "Partly Cloudy"
    );
    expect(result.body.data).to.have.a.property(
      "weatherIcon",
      "mdi-weather-partly-cloudy"
    );
  });
});
