import html from "html-literal";

export default state => html`
  <header>
    <!-- Main heading of the web page with an ID attribute -->
    <h1 id="main-header">G-Trade</h1>
    <!-- Introduction paragraph for the web page -->
    <p>Here's a brief introduction to my website.</p>
  </header>
  <section>
  <h3>
    The weather in ${state.weather.city} is ${state.weather.description}.
    Temperature is ${state.weather.temp}F, and it feels like
    ${state.weather.feelsLike}F.
  </h3>

`;
