import html from "html-literal";
import logo from "../docs/pics/logo1.png";

export default state => html`
  <header>
    <span>
      <a href="/"><img class="header-logo" src="${logo}" alt=""/></a>
    <span>
    <h1>${state.header}</h1>
  </header>
`;
