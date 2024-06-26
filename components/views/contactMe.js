import html from "html-literal";

export default state => html`
  <header>
    <h1>Contact Me</h1>
  </header>

  <section>
    <h2>Feel free to email me.</h2>
    <form
  action="https://formspree.io/f/mgvwwrva"
  method="POST"
>
  <label>
    Your email:
    <input type="email" name="email">
  </label>
  <label>
    Your message:
    <textarea name="message" placeholder="click and drag the lower right corner to enlarge the window"></textarea>
  </label>

  <button type="submit">Send</button>
</form>

    <ul>

        LinkedIn:
        <a href="https://www.linkedin.com/in/sec-cloud/" target="_blank"
          >LinkedIn Profile</a
        >
      </li>
    </ul>
  </section>
`;
