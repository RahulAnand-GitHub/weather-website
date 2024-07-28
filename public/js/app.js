// console.log("Client side JavaScript is loaded.");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const placePara = document.querySelector("#place");
const locationPara = document.querySelector("#forcastData");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  placePara.textContent = "Loading...";
  locationPara.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          placePara.textContent = data.error;
        } else {
          placePara.textContent = data.palce;
          locationPara.textContent = data.forcastData;
        }
      });
    }
  );
});
