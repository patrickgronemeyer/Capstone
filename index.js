import Navigo from "navigo";
import { camelCase } from "lodash";
import { header, nav, main, footer } from "./components";
import * as store from "./store";
import axios from "axios";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";

const router = new Navigo("/");

function render(state = store.home) {
  console.log('Rendering state:', state);
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

      // create a post axios call that stores request data including symbol interval and limit
      await axios
        .get(`${process.env.GTRADE_API_URL}/marketCharts/${symbol}/${interval}/${limit}`)
        .then(response => {
          // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
          store.marketChart.records = response.data;
          router.navigate("/marketChart");
        })
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }


  // new chart
  if (state.view === "marketChart") {
    const ctx = document.getElementById("chart").getContext("2d");
    const data = state.records.map(record => {
      return {
        x: record[0],
        y: [record[0], record[1], record[2], record[3], record[4], record[5], record[7]]
      };
    });

        new Chart(document.getElementById("chart"), {
          type: "line",
          data: {
            labels: state.records.map(record => record[0]),
            datasets: [
              {
                label: "Open",
                data: data.map(record => record.y[1]),
                borderColor: "blue",
                fill: false
              },
              {
                label: "High",
                data: data.map(record => record.y[2]),
                borderColor: "red",
                fill: false
              },
              {
                label: "Low",
                data: data.map(record => record.y[3]),
                borderColor: "green",
                fill: false
              },
              {
                label: "Close",
                data: data.map(record => record.y[4]),
                borderColor: "orange",
                fill: false
              },
              // {
              //   label: "volume",
              //   data: data.map(record => record.y[5]),
              //   borderColor: "purple",
              //   fill: false
              // },
              // {
              //   label: "Quote asset volume",
              //   data: data.map(record => record.y[7]),
              //   borderColor: "pink",
              //   fill: false
              // }
            ]
          },
          options: {
            spanGaps: true,
            scales: {
              x: {
                title: {
                  text: "Time"
                },
                type: "time",
                adapters: {
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


    //   if (state.view === "marketChart") {
    //     // const labels = state.records.map(record => {
    //     //   return record[0];
    //     // });

    //     const data = state.records.map(record => {
    //       return {
    //         // openTime: record[0],
    //         // open: record[1],
    //         // high: record[2],
    //         // low: record[3],
    //         // close: record[4],
    //         // volume: record[5],
    //         // closeTime: record[6],
    //         // quoteAssetVolume: record[7]
    //         // x: new Date(record[0]),
    //         x: record[0],
    //         y: record[2]
    //       };
    //     });

    //     // console.log("matsinet-index.js:92-labels:", labels);
    //     console.log("matsinet-index.js:93-data:", data);

    //     new Chart(document.getElementById("chart"), {
    //       type: "line",
    //       data: {
    //         datasets: [
    //           {
    //             label: "Price In USDT",
    //             data
    //           }
    //         ]
    //       },
    //       options: {
    //         scales: {
    //           x: {
    //             title: {
    //               text: "Time"
    //             },
    //             type: "time",
    //             adapters: {
    //               date: {
    //                 locale: enUS
    //               }
    //             }
    //           }
    //         }
    //       }
    //     });
    //   }
    // }


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
                store.marketChart.records = response.data;
                done();
              })
              .catch(error => {
                console.log("It puked", error);
                done();
              });
            break;

          case "cryptoInfoRecords":
            // New Axios get request utilizing already made environment variable
            axios
              // does not when making the APi call from browser,ERROR marketChart:1 Access to XMLHttpRequest at 'https://api.mexc.com/api/v3/klines?symbol=BTCUSDT&interval=60m' from origin 'http://localhost:1234' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
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
