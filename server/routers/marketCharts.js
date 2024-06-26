import { Router } from "express"; // Import the Router class from the Express library
import MarketChart from "../models/MarketChart.js"; // Import the MarketChart model
import axios from "axios"; // Import the axios library for making HTTP requests

const router = Router(); // Create a new instance of the Router class

// Handle the GET request with the specified parameters
router.get("/:symbol/:interval/:limit", async (request, response) => {
  const { symbol, interval, limit } = request.params; // Destructure the request parameters
  try {
    const crypto = await axios // Make a GET request to the specified URL
      .get(
        `https://api.mexc.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`
      )
      .then(async mexData => {
        // Handle the response
        const data = {
          // Create a new object with the extracted parameters
          symbol,
          interval,
          limit
        };

        const newMarketChart = new MarketChart(data); // Create a new instance of the MarketChart model
        const saveResponse = await newMarketChart.save(); // Save the new instance to the database
        response.json(mexData.data); // Send the response data
      });
  } catch (error) {
    console.log(error); // Log any errors that occur
    response.status(500).json(error); // Send an error response
  }
});

// Handle the POST request
router.post("/", async (request, response) => {
  try {
    const newMarketChart = new MarketChart(request.body); // Create a new instance of the MarketChart model
    const data = await newMarketChart.save(); // Save the new instance to the database
    response.json(data); // Send the response data
  } catch (error) {
    console.log(error); // Log any errors that occur
    if ("openTime" in error && error.openTime === "ValidationError") {
      // Check if the error is a validation error
      return response.status(400).json(error.errors); // Send a 400 Bad Request response with the error data
    }
    return response.status(500).json(error.errors); // Send a 500 Internal Server Error response with the error data
  }
});

// Handle the GET request for all symbols
router.get("/", async (request, response) => {
  try {
    const query = request.query; // Destructure the query parameters
    const data = await MarketChart.find(query); // Find all instances of the MarketChart model that match the query
    response.json(data); // Send the response data
  } catch (error) {
    console.log(error); // Log any errors that occur
    return response.status(500).json(error.errors); // Send a 500 Internal Server Error response with the error data
  }
});

export default router; // Export the router instance
