const https = require("https");

const geocode = (address, callback) => {
  const url =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    encodeURIComponent(address) +
    "&limit=1&appid=8735a70829d6f6bdd95e306f1d7259dd";

  https
    .get(url, (res) => {
      let data = "";

      // Accumulate data chunks
      res.on("data", (chunk) => {
        data += chunk;
      });

      // On end of response
      res.on("end", () => {
        try {
          const geoData = JSON.parse(data);
          if (geoData.length === 0) {
            callback(
              "Unable to find location. Please try another search.",
              undefined
            );
          } else {
            const { name, lat, lon } = geoData[0];
            callback(undefined, {
              place: name,
              latitude: lat,
              longitude: lon,
            });
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

module.exports = geocode;
