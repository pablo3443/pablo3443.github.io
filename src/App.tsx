import styles from './App.module.scss';
// import LoginForm from './loginForm';

function App() {
  return (
    <div className={styles.resume}>
      <header className={styles.header}>
        <div className={styles.photo}>
          <img src="images/profile__photo.jpg" alt="Pavel Norin" />
        </div>
        <div className={styles.text}>
          <h1>Pavel Norin</h1>
          <p className={styles.title}>Javascript Developer</p>
          <p className={styles.contact}>pavelnaureen@hotmail.com</p>
          <a href="https://t.me/pablo3443" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>Telegram</a> | 
          <a href="https://www.linkedin.com/in/pablo3443" target="_blank" rel="noopener noreferrer" className={styles.contactLink}> LinkedIn</a>
        </div>
      </header>

      <section className={styles.experience}>
        <h2>Work Experience</h2>
        <ul>
          <li>
            <h3>Fullstack developer at Visme (2021 – 2025)</h3>
            <p>Built new interfaces for presentations app</p>
            <p>Added integrations with other platforms</p>
            <p>Added learning modules packaging (SCORM, xAPI)</p>
            <p>Added AI solutions</p>
          </li>
          <li>
            <h3>Javascript developer at CMW Labs (2019 – 2021)</h3>
            <p>Built user interfaces for low-code bpmn-platform</p>
            <p>Added dynamic SVG-elements for bpmn diagrams</p>
            <p>Implemented new charts and diagrams</p>
          </li>
          <li>
            <h3>Freelance Web Developer (2016 – 2019)</h3>
            <p>Created small websites.</p>
          </li>
        </ul>
      </section>

      <section className={styles.education}>
        <h2>Education</h2>
        <ul>
          <li>
            <h3>Bachelor in Biology</h3>
            <p>Moscow State University, Graduated in 2015</p>
          </li>
        </ul>
      </section>

      <section className={styles.languages}>
        <h2>Languages</h2>
        <ul>
          <li>English</li>
          <li>French</li>
          <li>Spanish</li>
          <li>Russian</li>
        </ul>
      </section>

      <section className={styles.technologies}>
        <h2>Technologies</h2>
        <ul>
          <li>JavaScript (ES6+)</li>
          <li>React, Vue</li>
          <li>TypeScript</li>
          <li>HTML5</li>
          <li>CSS3, SCSS, PostCSS</li>
          <li>Mobx, Mobx-state-tree</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>MySQL, PostgreSQL</li>
          <li>Git, GitHub</li>
          <li>Webpack, Babel</li>
          <li>Jest, Jasmine, Karma (Testing)</li>
          <li>Docker, Kubernetes</li>
          <li>AWS</li>
        </ul>
      </section>

      <section className={styles.portfolio}>
        {/* <LoginForm /> */}
      </section>
    </div>
  )
}

export default App
