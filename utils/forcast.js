const https = require("https");

const forcast = (lat, lon, callback) => {
  const weatherAPI =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=8735a70829d6f6bdd95e306f1d7259dd&units=metric";

  https
    .get(weatherAPI, (res) => {
      let data = "";

      // Accumulate data chunks
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const geoData = JSON.parse(data);
          if (geoData.length === 0) {
            callback(
              "Unable to find location. Please try another search.",
              undefined
            );
          } else {
            const body = JSON.parse(data);
            const { name } = body;
            const { description } = body?.weather[0];
            const { temp, feels_like } = body?.main;
            callback(
              undefined,
              `${(description)}. It is currently ${temp} degrees out there but it feels like ${feels_like} degrees.`
            );
          }
        } catch (error) {
          callback("Unable to parse location data!", undefined);
        }
      });
    })
    .on("error", (error) => {
      callback("Unable to connect to location service!", undefined);
    });
};

module.exports = forcast;
