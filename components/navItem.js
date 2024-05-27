import html from "html-literal";

// I may need to add more buttons/links to the list
export default item => {
  return html`
    <li>
      <a href="${item.url}" title="${item.text}" data-navigo>${item.text}</a>
    </li>
  `;
};
