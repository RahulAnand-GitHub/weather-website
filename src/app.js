const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../utils/geocode");
const forcast = require("../utils/forcast");

const app = express();

//Define paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup ha ndlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static diractory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rahul",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rahul",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Rahul",
    message: "How may I help you?",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide address term.",
    });
  }
  geocode(address, (error, { latitude, longitude, place }={}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forcast(latitude, longitude, (error, forcastData) => {
      if(error){
        return res.send({
          error
        })
      }
      res.send({
        palce: address,
        forcastData
      })
    });
  });
  // console.log(address)
  // res.send([
  //   {
  //     address: address,
  //   },
  // ]);
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term.",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rahul",
    errorMsg: "Help article not found.",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Hansraj",
    errorMsg: "Error 404: Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
