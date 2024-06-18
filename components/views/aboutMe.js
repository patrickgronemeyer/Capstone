import html from "html-literal";
import profilePicTest from "../../docs/Pics/profilePicTest.png";

export default state => html`
  <body>
    <header>
      <h1>Patrick Gronemeyer - Developer & Cybersecurity Professional</h1>
    </header>
    <main>
      <section id="professional-summary">
        <h2>Personal Information</h2>
        <!--Ensure that the path to your profile image (profile.jpg) remains valid across different pages. Place the image in the same directory as your HTML files. Also add Css for profile picture picture-->
        <p>I am passionate about technology and programming.</p>
        <img
          src="../../docs/Pics/profilePicTest.png"
          alt="profilePicTest"
          id="profilePicTest"
          width="200"
          height="200"
        />
        <p>
          A dedicated developer and cybersecurity professional with a penchant
          for detail. Proficient in JavaScript, cloud computing, DevOps, and
          cybersecurity practices. Leveraging technologies like Azure, Docker,
          Express, Splunk, and RESTful APIs, integrating security best practices
          into development pipelines.
        </p>
      </section>

      <section id="skills">
        <h2>Technical Skills</h2>
        <ul>
          <li>
            <strong>Programming Languages:</strong> JavaScript, HTML, CSS, SQL,
            Node.js, Express, Markdown
          </li>
          <li>
            <strong>Tools & Frameworks:</strong> Git/GitHub, Navigo, Jira,
            Docker, Metasploit, VMware, Azure
          </li>
          <li>
            <strong>Systems & Network Security:</strong> Linux, Kali Linux,
            Nessus, Security Onion, SIEMs
          </li>
          <li>
            <strong>Specializations:</strong> Web Development, REST APIs, Cloud
            Computing, DevSecOps
          </li>
        </ul>
      </section>

      <section id="projects">
        <h2>Notable Projects</h2>
        <ul>
          <li>
            <strong>Securing Cloud Applications:</strong> Developed a cyber-blog
            application with Docker and Azure services, integrating security
            features like SSL and WAF.
          </li>
          <li>
            <strong>Full-Stack Web Development Capstone:</strong> Created a
            Single Page Application (SPA), leveraging a REST API server with
            Node.js and MongoDB.
          </li>
          <li>
            <strong>Penetration Test & Report:</strong> Conducted network
            security testing using tools like Metasploit and Nessus.
          </li>
        </ul>
      </section>

      <section id="experience">
        <h2>Work Experience</h2>
        <ul>
          <li>
            <strong
              >Director of Extraction - Mr. NiceGuy (2018 - Present):</strong
            >
            Edited SOPs and developed training documentation.
          </li>
          <li>
            <strong>Consultant - Fiber Source (2017 - 2021):</strong> Managed
            supply logistics in textile companies and led customer advocacy
            efforts.
          </li>
          <li>
            <strong>Founding Member - CBD Gold (2016 - 2020):</strong>
            Coordinated B2B client management and procurement operations.
          </li>
        </ul>
      </section>

      <section id="education-certifications">
        <h2>Education & Certifications</h2>
        <ul>
          <li>
            <strong>Certificate in Cybersecurity:</strong> University of Oregon
          </li>
          <li>
            <strong>Bachelor of Science in Business Administration:</strong>
            University of Central Missouri
          </li>
          <li>
            <strong>Certifications:</strong> CompTIA A+, Net+, Security+,
            ICAgile Agile Certification
          </li>
        </ul>
      </section>

      <section id="links">
        <h2>Links</h2>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/sec-cloud/" target="_blank"
              >LinkedIn Profile</a
            >
          </li>
          <li>
            <a
              href="https://www.credly.com/badges/18781f05-a81b-410f-a65a-3d8441175ec2/public_url"
              target="_blank"
              >CompTIA A+ Certification</a
            >
          </li>
          <li>
            <a
              href="https://www.credly.com/badges/5fa1eb22-f382-4a77-a540-4da8605be6ce/public_url"
              target="_blank"
              >CompTIA Security+ Certification</a
            >
          </li>
        </ul>
      </section>
    </main>
  </body>
`;
