# Iot Weather

Iot weather provider simulator.

Deployed to [Heroku](https://iot-weather-simulator.herokuapp.com/). Status: [![Deploy](https://github.com/Weather-Forecast-Aggregator/iot-weather/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/Weather-Forecast-Aggregator/iot-weather/actions/workflows/deploy.yml).

Solved deploy to heroku bug thanks to [onlinejudge95](https://github.com/AkhileshNS/heroku-deploy/issues/92#issuecomment-841797339)

Docker tutorial from: [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

This software is a part of [Weather Vortex](https://github.com/Weather-Vortex) project.

## How to build

```sh
sudo docker build . -t <your username>/iot-weather
```

You can see your container with `[sudo] docker images` command.

## How to run

Execute the following command:

```sh
sudo docker run -p 49160:15600 -d daniele.tentoni2/iot-weather
```

Note: the `-d` option tell docker to run in detached mode. So you have to run those commands to see logs:

```sh
sudo docker ps
sudo docker logs <container id>
```

## How to test

Run the following command to send an http request to container running on localhost:

```sh
curl -i localhost:49160
```

## Data read

| Name        | File name | Measure Unit             |
| ----------- | --------- | ------------------------ |
| Temperature | temp.data | Integer, Celsius         |
| Pressure    | pres.data | Integer, mb              |
| Rain        | rain.data | Integer, 0 = no, 1 = yes |

Those data could be improved during the project run.

## License

Provide local weather data to remote server.

Copyright (C) 2021 Daniele Tentoni

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
