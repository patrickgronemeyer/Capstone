import { Router } from "express";
import MarketChart from "../models/MarketChart.js";
import axios from "axios";

const router = Router();

// "/:symbol/:interval"
// Handle the request with HTTP GET method with query parameters and a url parameter
router.get("/:symbol/:interval/:limit", async (request, response) => {
  const { symbol, interval, limit } = request.params;
  try {
    const crypto = await axios
      // Get request to retrieve the current symbol data using the API key and providing the Kline data
      .get(
        `https://api.mexc.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`
      )
      .then(async mexData => {
        // Request body object for the api call crypto
        const data = {
          symbol,
          interval,
          limit
          //   openTime: crypto[0].openTime,
          //   open: crypto[0].open,
          //   high: crypto[0].high,
          //   low: crypto[0].low,
          //   close: crypto[0].close,
          //   closeTime: crypto[0].closeTime
        };

        const newMarketChart = new MarketChart(data);
        // Save the new MarketChart instance to the database
        const saveResponse = await newMarketChart.save();
        // Creates a new instance of the MarketChart model with the data from the API response
        response.json(mexData.data);
      });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

// All our routes go here
// Create Symbol data route
router.post("/", async (request, response) => {
  try {
    const newMarketChart = new MarketChart(request.body);

    const data = await newMarketChart.save();

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    // if error.name exists and error.name = validation error
    if ("openTime" in error && error.openTime === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// Get all Symbol data route
router.get("/", async (request, response) => {
  try {
    // Store the query params into a JavaScript Object
    const query = request.query; // Defaults to an empty object {}

    const data = await MarketChart.find(query);

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

export default router;
