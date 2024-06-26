import mongoose from "mongoose";
// I developed a Node.js Express REST API server for managing long-term data storage via MongoDB Atlas, tested with Thunder Client.

// change scheme for market chart
const marketChartSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: false,
    validate: /^[A-Za-z0-9]*$/
  },
  interval: {
    type: String,
    // required: false,
    validate: /^[A-Za-z0-9]*$/
  },
  limit: {
    type: String,
    // required: false,
    validate: /^[A-Za-z0-9]*$/
  }
});

const MarketChart = mongoose.model("MarketChart", marketChartSchema);

export default MarketChart;

// interval: {
//   type: String,
//   // required: false,
//   validate: /^[A-Za-z0-9]*$/
// },
// limit: {
//   type: String,
//   // required: false,
//   validate: /^[A-Za-z0-9]*$/
// },
