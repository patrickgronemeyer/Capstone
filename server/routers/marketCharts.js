import { Router } from "express";
import MarketChart from "../models/MarketChart";
import axios from "axios";

const router = Router();

// "/:symbol/:interval"
// Handle the request with HTTP GET method with query parameters and a url parameter
router.get("/:symbol", async (request, response) => {
  const symbol = request.params.symbol;

  const crypto = await axios
    // Get request to retrieve the current symbol data using the API key and providing the Kline data
    .get(
      `https://api.mexc.com/api/v3/klines?symbol=${symbol}USDT&interval=60m`
    );

  const data = {
    symbol,
    // interval,
    openTime: crypto.data.openTime,
    open: crypto.data.open, // Assuming open price is the first data point
    high: crypto.data.high, // You might need to adjust based on actual data structure
    low: crypto.data.low, // You might need to adjust based on actual data structure
    close: crypto.data.close, // Assuming close price is the last data point
    closeTime: crypto.data.closeTime
  };

  const newMarketChart = new MarketChart(data);

  const saveResponse = await newMarketChart.save();

  response.json(data);
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
    if ("name" in error && error.name === "ValidationError")
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
