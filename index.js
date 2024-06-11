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

  afterRender();
}

function afterRender() {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".nav-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

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
    .get(`${process.env.PIZZA_PLACE_API_URL}/weather/st%20louis`)
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
      .get(`${process.env.PIZZA_PLACE_API_URL}/weather`)
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


