import html from "html-literal";

export default state => html`
  <input type="search" name="symbol-search" id="search-box" />
  <button id="search-button">Search</button>

  <!-- <div id="data-table"></div>
  <table id="marketChart">
    <tr>
      <th>Open Time</th>
      <th class="narrow-column">Open</th>
      <th class="narrow-column">High</th>
      <th class="narrow-column">Low</th>
      <th class="narrow-column">Close</th>
      <th class="narrow-column">Volume</th>
      <th>Close Time</th>
    </tr>
    ${state.records
    .map(record => {
      return html`
        <tr>
          <td>${record.openTime}</td>
          <td class="narrow-column">${record.open}</td>
          <td class="narrow-column">${record.high}</td>
          <td>${record.low}</td>
          <td>${record.close}</td>
          <td>${record.closeTime}</td>
        </tr>
      `;
    })
    .join("")}
  </table> -->

  <section id="chart-container">
    <canvas id="chart"></canvas>
  </section>
`;
