import html from "html-literal";

export default state => html`
  <table id="crypto-info">
    <tr>
      <th>Symbol</th>
      <th>Interval </th>
      <th>Limit</th>
      <th>Created At</th>
    </tr>
    ${state.records
      .map(record => {
        return html`
          <tr>
            <td>${record.symbol}</td>
            <td>${record.interval}</td>
            <td>${record.limit}</td>
            <td>${record?.createdAt}</td>
          </tr>
        `;
      })
      .join("")}
  </table>
`;
