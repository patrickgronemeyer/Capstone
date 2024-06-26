// These lines import the necessary modules and libraries for the application. Navigo is a routing library, lodash is a
//utility library, store is the application state, axios is a promise-based HTTP client, chart.js is a charting library,
//and date-fns is a library for working with dates.
import Navigo from "navigo";
import { camelCase } from "lodash";
import { header, nav, main, footer } from "./components";
import * as store from "./store";
import axios from "axios";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";


// This line creates a new instance of the Navigo router, which is used for handling routing in the application.
// The "/" argument specifies the root URL for the application.
const router = new Navigo("/");


// This function, render, is responsible for updating the DOM with the appropriate components based on the current
// state of the application. It takes in a state object as an argument, which contains the current state of the application.
// This line sets the inner HTML of the element with the ID "root" to the concatenation of the results of calling the
// header, nav, main, and footer functions with the state object as an argument, and the store.nav object as an argument
// for the nav function.
function render(state = store.home) {
  console.log('Rendering state:', state);    //This line logs the current state of the application to the console for debugging purposes.
  document.querySelector("#root").innerHTML = `
    ${header(state)}
    ${nav(store.nav)}
    ${main(state)}
    ${footer()}
  `;
  router.updatePageLinks();  //This line updates the links in the router to match the current state of the application.
  afterRender(state); //This line calls the afterRender function with the state object as an argument.
}

// This function, afterRender, is called after the DOM has been updated with the appropriate components.
// It adds an event listener to the "click" event of the element with the class "nav-bars" in the nav bar,
// which toggles the visibility of the nav menu on mobile devices.
function afterRender(state) {
  // ?add menu toggle to bars icon in nav bar
  document.querySelector(".nav-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });


  // If the current view is "marketChart", it adds an event listener to the "submit" event of the form,
  // which prevents the default form submission behavior, extracts the values from the form elements,
  // creates the URL for the API call, makes the API call using axios, logs the response to the console,
  // stores the response in the state, and calls the render function to update the DOM with the new data.API
  // ?submit/searchbutton button
  if (state.view === "marketChart") {
    // event handler for the submit button on the form
    document.querySelector("form").addEventListener("submit", async event => {
      event.preventDefault();

      // Get the form elements
      const symbolInput = document.getElementById("symbol");
      const intervalInput = document.getElementById("interval");
      const limitInput = document.getElementById("limit");

      // Extract the values from the form elements
      const symbol = symbolInput.value.toUpperCase();
      const interval = intervalInput.value;
      const limit = limitInput.value;

      // Create the URL for the API call that stores request data including symbol interval and limit
      await axios
        .get(`${process.env.GTRADE_API_URL}/marketCharts/${symbol}/${interval}/${limit}`)
        .then(response => {
          // Store the response to the state.
          store.marketChart.records = response.data;
          router.navigate("/marketChart");
        })
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }



  if (state.view === "marketChart") {
    const ctx = document.getElementById("chart").getContext("2d");
    const data = state.records.map(record => {
      // openTime: record[0],
      // open: record[1],
      // high: record[2],
      // low: record[3],
      // close: record[4],
      // volume: record[5],
      // closeTime: record[6],
      // quoteAssetVolume: record[7]
      // x: new Date(record[0])

      //This return statement is for passing the array data set from the api call into the chart js function.
      return {
        x: record[0],
        y: [record[0], record[1], record[2], record[3], record[4], record[5], record[7]]
      };
    });
    // This line creates a new Chart.js chart on the element with the ID "chart".
    new Chart(document.getElementById("chart"), {
      type: "line", // This line sets the type of chart to a line chart.
      data: {   // This line sets the data for the chart.
        labels: state.records.map(record => record[0]),  // This line maps the array of records to an array of labels for the chart, using the first element of each record.
        datasets: [
          {// This line creates a new dataset.
            label: "Open", // This line sets the label for the dataset to "Open".
            data: data.map(record => record.y[1]),// This line maps the array of records to an array of data points for the dataset, using the second element of the y array for each record.
            borderColor: "blue",// This line sets the border color for the dataset/line to blue.
            fill: false// This line sets the fill color for the dataset to false.
          },
          {// This line creates a new dataset.
            label: "High",
            data: data.map(record => record.y[2]),
            borderColor: "red",
            fill: false
          },
          {// This line creates a new dataset.
            label: "Low",
            data: data.map(record => record.y[3]),
            borderColor: "green",
            fill: false
          },
          {// This line creates a new dataset.
            label: "Close",
            data: data.map(record => record.y[4]),
            borderColor: "orange",
            fill: false
          },
          // {// This line creates a new dataset.
          //   label: "volume",
          //   data: data.map(record => record.y[5]),
          //   borderColor: "purple",
          //   fill: false
          // },
          // {// This line creates a new dataset.
          //   label: "Quote asset volume",
          //   data: data.map(record => record.y[7]),
          //   borderColor: "pink",
          //   fill: false
          // }
        ]
      },
      options: {   // This line sets the options for the chart.
        spanGaps: true,  //This option is specifically to allow more than the default three sets of data
        scales: {   // This line sets the scales for the chart.
          x: {  // This line sets the x-axis scale for the chart.
            title: { //These next couple lines are used to convert server machine time into real world time
              text: "Time" // This line sets the time scale options for the x-axis scale.
            },
            type: "time", // This line sets the type of the x-axis scale to a time scale.
            adapters: {  // This line sets the display formats for the time scale.
              date: {
                locale: enUS
              }
            }
          }
        }
      }
    });
  }
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
      // New Case for the home View
      case "home":
        axios
          // Get request to retrieve the current weather data using the API key and providing a city name
          .get(`${process.env.GTRADE_API_URL}/weathers/st%20louis`)
          .then(response => {
            console.log("Weather Data", response.data);
            // Create an object to be stored in the Home state from the response
            store.home.weather = response.data;

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
          .get(`${process.env.GTRADE_API_URL}/weathers`)
          .then(response => {
            console.log("response", response);

            // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
            store.weather.records = response.data;
            // Call the render function to update the DOM with the new market chart data.
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;
      // New Case for the marketChart View.
      case "marketChart":
        // New Axios get request utilizing already made environment variable using a proxy server
        axios
          .get(`${process.env.GTRADE_API_URL}/marketCharts`)
          .then(response => {
            console.log("response", response);
            // Create an object with the market chart data and store it in the state.
            store.marketChart.records = response.data;
            // Call the render function to update the DOM with the new market chart data.
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;


      // This line defines a function called "getData" that takes in a "params" object as an argument.
      // The function is asynchronous, meaning it returns a promise.
      // The function has an inner function called "done" that takes in an "error" object as an argument.
      // The function uses a switch statement to handle different cases based on the value of the "view" property of the "params" object.
      // New Case for the cryptoInfoRecords View.
      case "cryptoInfoRecords":
        // New Axios get request utilizing already made environment variable using a proxy server
        axios
          .get(`${process.env.GTRADE_API_URL}/marketCharts`)
          .then(response => {
            console.log("response", response);

            // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
            store.cryptoInfoRecords.records = response.data;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;
      // Default case for any other view.
      default:
        // Call the render function to update the DOM with the default state.
        done();
    }
  },

  // This line defines an anonymous function called "already", which takes in a "params" object as an argument.
  // The function checks if the "data" property of the "params" object exists and if it has a "view" property.
  // If it does, it calls the "camelCase" function (which converts a string to camel case) on the "view" property and stores the result in the "view" variable.
  // If the "data" property doesn't exist or doesn't have a "view" property, it sets the "view" variable to "home".
  // Finally, it calls the "render" function and passes in the result of `store[view]` (which is the state object associated with the view).
  already: params => {
    const view =
      params && params.data && params.data.view
        ? camelCase(params.data.view)
        : "home";
    render(store[view]);
  }
});




// This line sets up a router object and defines what should happen when certain routes are triggered.
router
  // When the root route ("/") is triggered, call the render function and pass in the home state object.
  .on({
    "/": () => render(store.home),
    // When a route with a dynamic segment (:view) is triggered, call the render function and pass in the state object associated with the view.
    ":view": ({ data, params }) => {
      // Use the optional chaining operator (data?.view) to check if the view property exists in the data object.
      // If it does, call the camelCase function to convert the view property to camel case and store the result in the view variable.
      // If the view property doesn't exist, set the view variable to "home".
      // data?.view checks if view exists, then ternary runs
      const view = data?.view ? camelCase(data.view) : "home";
      // Check if the view variable is a key in the store object.
      if (view in store) {
        // If it is, call the render function and pass in the state object associated with the view.
        // store[view]
        render(store[view]);
      } else {
        // If it isn't, log a message to the console and call the render function with the view not found state object.
        console.log(`View ${view} not defined`);
        render(store.viewNotFound);
      }
    }
  })
  // If a route is not found, call the render function with the view not found state object.
  .notFound(() => render(store.viewNotFound))
  // Resolve the router, which starts listening for route changes and triggers the appropriate actions.
  .resolve();

