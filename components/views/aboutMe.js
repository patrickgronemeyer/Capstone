import html from "html-literal";
import profilePicTest from "../../docs/Pics/profilePicTest.png";

export default state => html`
  ;
  <section>
    <h2>Personal Information</h2>
    <!--Ensure that the path to your profile image (profile.jpg) remains valid across different pages. Place the image in the same directory as your HTML files. Also add Css for profile picture picture-->
    <p>I am passionate about technology and programming.</p>
    <img
      src="docs/pics/profile-pic-test.png"
      alt="Profile Picture"
      width="200"
      height="200"
    />
  </section>

  <section id="professional-summary">
    <h2>Professional Summary</h2>
    <!-- web link is to my LinkedIn profile picture. check to see where this pic shows up on page-->
    <img
      src="https://media.licdn.com/dms/image/D5635AQHtinimu2GGzA/profile-framedphoto-shrink_200_200/0/1690852386841?e=1715641200&v=beta&t=g47vZs4HSWqmkuNhncHsMw1t_QXKmasPd0UHpBrkcxc"
      alt="Patrick Gronemeyer"
      id="profile-image"
    />
    <p>
      A dedicated developer and cybersecurity professional with a penchant for
      detail. Proficient in JavaScript, cloud computing, DevOps, and
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
        <strong>Tools & Frameworks:</strong> Git/GitHub, Navigo, Jira, Docker,
        Metasploit, VMware, Azure
      </li>
      <li>
        <strong>Systems & Network Security:</strong> Linux, Kali Linux, Nessus,
        Security Onion, SIEMs
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
        <strong>Full-Stack Web Development Capstone:</strong> Created a Single
        Page Application (SPA), leveraging a REST API server with Node.js and
        MongoDB.
      </li>
      <li>
        <strong>Penetration Test & Report:</strong> Conducted network security
        testing using tools like Metasploit and Nessus.
      </li>
    </ul>
  </section>

  <section id="experience">
    <h2>Work Experience</h2>
    <ul>
      <li>
        <strong>Director of Extraction - Mr. NiceGuy (2018 - Present):</strong>
        Edited SOPs and developed training documentation.
      </li>
      <li>
        <strong>Consultant - Fiber Source (2017 - 2021):</strong> Managed supply
        logistics in textile companies and led customer advocacy efforts.
      </li>
      <li>
        <strong>Founding Member - CBD Gold (2016 - 2020):</strong> Coordinated
        B2B client management and procurement operations.
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
        <strong>Certifications:</strong> CompTIA A+, Net+, Security+, ICAgile
        Agile Certification
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
          href="https://www.your-secure-profile.com/securityplusbadge"
          target="_blank"
          >CompTIA Security+ Badge</a
        >
      </li>
    </ul>
  </section>
`;
