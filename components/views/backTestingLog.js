import html from "html-literal";

export default state => html`
  <div>
    <h1>Backtesting Log</h1>
    <form id="backtesting-log-form">
      <label for="symbol">Symbol:</label>
      <input
        type="text"
        id="symbol"
        name="symbol"
        value="${state.symbol}"
        readonly
      />
      <label for="price">Price:</label>
      <input
        type="text"
        id="price"
        name="price"
        value="${state.price}"
        readonly
      />
      <label for="recommendation">Recommendation:</label>
      <input
        type="text"
        id="recommendation"
        name="recommendation"
        value="${state.recommendation}"
        readonly
      />
      <button type="submit">Save</button>
    </form>
    <div id="log-entries">
      ${state.logEntries
        .map(
          entry => html`
            <div class="log-entry">
              <p>Symbol: ${entry.symbol}</p>
              <p>Price: ${entry.price}</p>
              <p>Recommendation: ${entry.recommendation}</p>
            </div>
          `
        )
        .join("")}
    </div>
  </div>
`;

export async function saveLogEntry(entry) {
  // Logic to save entry to database
}
