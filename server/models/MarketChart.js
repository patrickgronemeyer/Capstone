import mongoose from "mongoose";

// change scheme for market chart
const marketChartSchema = new mongoose.Schema({
  openTime: {
    type: Date,
    required: true,
    index: true // Index to optimize queries on the open time
  },
  symbol: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9]*$/
  },
  // interval: {
  //   type: String,
  //   required: true,
  //   validate: /^[A-Za-z0-9]*$/
  // },
  open: {
    type: Number,
    required: true
  },
  high: {
    type: Number,
    required: true
  },
  low: {
    type: Number,
    required: true
  },
  close: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  closeTime: {
    type: Date,
    required: true
  }
});

const MarketChart = mongoose.model("MarketChart", marketChartSchema);

export default MarketChart;
