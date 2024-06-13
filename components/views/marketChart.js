import html from "html-literal";
import MarketChart from "../../server/models/MarketChart";

export default state => html`
  <head>
    <input type="search" name="symble-search" id="search-box" />
    <button id="search-button">Search</button>

    <title>Live Crypto Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  <body>
    <canvas id="cryptoChart" width="400" height="200"></canvas>
    <script src="marketChat.js"></script>
  </body>
`;
