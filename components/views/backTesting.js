import html from "html-literal";
import { evaluateCrypto } from "../../evaluations/evaluateLogic";

export default state => {
  async function handleSearch() {
    const symbol = document.querySelector("#crypto-symbol").value;
    const result = await evaluateCrypto(symbol);
    document.querySelector("#result").innerHTML = `
      <p>Symbol: ${result.symbol}</p>
      <p>Price: ${result.price}</p>
      <p>Recommendation: ${result.recommendation}</p>
    `;
  }

  return html`
    <div>
      <h1>Backtesting</h1>
      <input
        type="text"
        id="crypto-symbol"
        placeholder="Enter cryptocurrency symbol"
      />
      <button onclick="${handleSearch}">Evaluate</button>
      <div id="result"></div>
    </div>
  `;
};
