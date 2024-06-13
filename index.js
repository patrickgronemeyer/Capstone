import Navigo from "navigo";
import { camelCase } from "lodash";
import { header, nav, main, footer } from "./components";
import * as store from "./store";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
    ${header(state)}
    ${nav(store.nav)}
    ${main(state)}
    ${footer()}
  `;
  router.updatePageLinks();

  afterRender(state);
}

function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".nav-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });

// submit/searchbutton button
if (state.view === "marketChart") {
  // Add an event handler for the submit button on the form
  document
    .getElementById("search-button")
    .addEventListener("click", event => {
      event.preventDefault();
      const symbol = document.getElementById("search-box").value;
      axios
        .get(`${process.env.GTRADE_API_URL}/marketCharts?${symbol}`)
        .then(response => {
          // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
          store.MarketChart.marketCharts = response.data;
          router.navigate("/marketChart");
        })
        .catch(error => {
          console.log("It puked", error);
        });
    });

  //   .get(https://api.mexc.com/api/v3/klines?symbol=${symble}USDT&interval=60m)
  // https://api.mexc.com/api/v3/klines?symbol=${symble}   BTC USDT&interval=60m


  router.hooks({
    before: (done, params) => {
      // We need to know what view we are on to know what data to fetch
      const view = params && params.data && params.data.view
        ? camelCase(params.data.view)
        : "home";


      // Add a switch case statement to handle multiple routes
      switch (view) {
        // Add a case for each view that needs data from an API
        case "home":
          axios
            // Get request to retrieve the current weather data using the API key and providing a city name
            .get(`${process.env.GTRADE_API_URL}/weather/st%20louis`)
            .then(response => {
              console.log("Weather Data", response.data);
              // Create an object to be stored in the Home state from the response
              store.home.weather = {
                city: response.data.name,
                temp: response.data.main.temp,
                feelsLike: response.data.main.feels_like,
                description: response.data.weather[0].main
              };

              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
          break;

        case "weather":
          // New Axios get request utilizing already made environment variable
          axios
            .get(`${process.env.GTRADE_API_URL}/weather`)
            .then(response => {
              console.log("response", response);

              // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
              store.weather.records = response.data;
              done();
            })
            .catch(error => {
              console.log("It puked", error);
              done();
            });
          break;

        case "marketChart":
          // New Axios get request utilizing already made environment variable
          axios
// does not when making the APi call from browser,ERROR marketChart:1 Access to XMLHttpRequest at 'https://api.mexc.com/api/v3/klines?symbol=BTCUSDT&interval=60m' from origin 'http://localhost:1234' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
            .get(`${process.env.GTRADE_API_URL}/marketCharts`)
            .then(response => {
              console.log("response", response);

              // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
              store.marketCharts.records = response.data;
              done();
            })
            .catch(error => {
              console.log("It puked", error);
              done();
            });
          break;


        default:
          done();
      }
    },
    already: params => {
      const view =
        params && params.data && params.data.view
          ? camelCase(params.data.view)
          : "home";


      render(store[view]);
    }
  });


router
  .on({
    "/": () => render(store.home),
    ":view": ({ data, params }) => {
      // data?.view checks if view exists, then ternary runs
      const view = data?.view ? camelCase(data.view) : "home";
      if (view in store) {
        // store[view]
        render(store[view]);
      } else {
        console.log(`View ${view} not defined`);
        render(store.viewNotFound);
      }
    }
  })
  .notFound(() => render(store.viewNotFound))
  .resolve();


