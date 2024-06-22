import html from "html-literal";

export default state => html`
  <section id="crypto selector background">
    <form id="crypto form" method="POST" action="">
      <h2>Market Chart</h2>
      <div>
        <label for="symbol">Symbol:</label>
        <input
          type="text"
          id="symbol"
          name="symbol"
          placeholder="Enter cryptocurrency symbol"
          required
          oninput="this.value = this.value.toUpperCase()"
        />
      </div>
      <div>
        <label for="interval">Interval:</label>
        <select id="interval" name="interval">
          <option value="1m">1 minute</option>
          <option value="5m">5 minutes</option>
          <option value="15m">15 minutes</option>
          <option value="30m">30 minutes</option>
          <option value="60m">1 hour</option>
          <option value="4h">4 hours</option>
          <option value="1d">1 day</option>
          <option value="1W">1 week</option>
          <option value="1M">1 month</option>
        </select>
      </div>
      <div>
        <label for="limit">Limit:</label>
        <select id="limit" name="limit">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <input type="submit" name="submit" value="Submit" id="submit" />
    </form>

    <section id="chart-container">
      <canvas id="chart"></canvas>
    </section>
  </section>
`;
