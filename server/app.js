/* eslint-disable prettier/prettier */
// 'Import' the Express module instead of http
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import weather from "./routers/weather.js"
import marketCharts from "./routers/marketCharts.js"

// Load environment variables from .env file
dotenv.config();

// get the PORT from the environment variables, OR use 4040 as default
const PORT = process.env.PORT || 4040;

// Initialize the Express application
const app = express();

mongoose.connect(
  process.env.MONGODB,{
      // Configuration options to remove deprecation warnings, just include them to remove clutter
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

// making data base in mongoDB using mongoose
const db = mongoose.connection
// connect to mongoDB and error reporting
db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
"open",
console.log.bind(console, "Successfully opened connection to Mongo!")
);


//logging middleware functions: functions that have access to the request and response Objects of their respective scopes.
const logging = (request, response, next) => {
    console.log(`${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`);
    next();
  };


  // CORS Middleware
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const cors = (request, response, next) => {
    response.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, Accept,Authorization,Origin"
    );
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    response.setHeader("Access-Control-Allow-Credentials", true);
    next();
  };

// app, logging middleware before any of your route configurations, order of these matters.
app.use(cors);
// converts json in to node.js
app.use(express.json());

app.use(logging);

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(JSON.stringify({ message: "Service healthy" }));
});

// /new and needed, "/xxxx" are"end points" that are invoked in Root index.js
app.use("/marketCharts", marketCharts);
app.use("/weather", weather);

// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));
