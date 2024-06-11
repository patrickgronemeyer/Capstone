import axios from "axios";

export async function evaluateCrypto(symbol) {
  const response = await axios.get(`https://api.example.com/crypto/${symbol}`);
  const data = response.data;

  // Add your evaluation logic here
  const evaluation = {
    symbol: data.symbol,
    price: data.price,
    recommendation: "Buy" // Placeholder for your logic
  };

  return evaluation;
}
