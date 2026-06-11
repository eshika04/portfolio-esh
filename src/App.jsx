// === App.jsx ===
import React, { useState, useEffect } from 'react';
import './styles.css';
import meAnimated from './assets/me-animated.jpeg';
import meReal from './assets/me-real.jpeg';

const TECH1 = [
  { n: "C++",        ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { n: "HTML",       ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { n: "CSS",        ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { n: "JavaScript", ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { n: "React",      ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { n: "Node.js",    ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { n: "Python",     ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { n: "Java",       ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { n: "TypeScript", ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
];

const TECH2 = [
  { n: "VS Code",    ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { n: "Jupyter",    ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
  { n: "CodeBlocks", ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { n: "Git",        ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { n: "GitHub",     ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", inv: true },
  { n: "MySQL",      ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { n: "Django",     ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", inv: true },
  { n: "Flask",      ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", inv: true },
  { n: "Linux",      ic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
];

function Ticker({ items, rev }) {
  const d = [...items, ...items, ...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className={`ticker-track${rev ? ' rev' : ''}`}>
        {d.map((t, i) => (
          <span className="tech-pill" key={i}>
            <img
              src={t.ic}
              className={`tech-icon${t.inv ? ' invert' : ''}`}
              alt={t.n}
              onError={e => e.target.style.display = 'none'}
            />
            {t.n}
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => { document.body.className = theme; }, [theme]);

  useEffect(() => {
    const dot = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');
    const outer = document.getElementById('cur-outer');
    const sc = document.getElementById('sparkle-con');

    if (!dot || !ring || !outer || !sc) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let ox = 0, oy = 0;
    let lastSp = 0;

    const SHAPES = ['✦','★','✿','◆','✸'];
    const lerp = (a,b,t) => a + (b-a)*t;

    const spawnSp = (x,y) => {
      const el = document.createElement('div');
      el.className = 'sparkle';
      el.textContent = SHAPES[Math.floor(Math.random()*SHAPES.length)];
      const sz = 9 + Math.random()*13;
      const dx = (Math.random()-0.5)*70 + 'px';
      const dy = -(18 + Math.random()*55) + 'px';
      el.style.cssText = `left:${x}px;top:${y}px;font-size:${sz}px;color:hsl(${310 + Math.random()*40},100%,${65 + Math.random()*20}%);--dx:${dx};--dy:${dy};`;
      sc.appendChild(el);
      setTimeout(() => el.remove(), 650);
    };

    const mouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      const now = Date.now();
      if (now - lastSp > 55) { lastSp = now; spawnSp(mx,my); }
    };

    document.addEventListener('mousemove', mouseMove);

    let frameId;
    const animRing = () => {
      rx = lerp(rx,mx,0.12); ry = lerp(ry,my,0.12);
      ox = lerp(ox,mx,0.06); oy = lerp(oy,my,0.06);
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      outer.style.left = ox + 'px'; outer.style.top = oy + 'px';
      frameId = requestAnimationFrame(animRing);
    };
    animRing();

    const over = (e) => {
      if (e.target.closest('a,button,.project-card,.cert-card,.exp-card,.tech-pill,.glow-card')) {
        dot.style.transform = 'translate(-50%,-50%) scale(2.2)';
        ring.style.width = '18px'; ring.style.height = '18px';
        outer.style.width = '34px'; outer.style.height = '34px';
        ring.style.opacity = '0.4';
      }
    };

    const out = (e) => {
      if (e.target.closest('a,button,.project-card,.cert-card,.exp-card,.tech-pill,.glow-card')) {
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.width = '14px'; ring.style.height = '14px';
        outer.style.width = '28px'; outer.style.height = '28px';
        ring.style.opacity = '0.65';
      }
    };

    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">
          <span className="nav-logo-dot" />
          eshika.arya
        </div>
        <div className="nav-links">
          <a href="#work-edu">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#certs">Certificates</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-right">
          <button className="theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
            <span style={{ color: 'var(--pink)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <a href="#contact" className="btn-talk">Let's talk <span>↗</span></a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="container">
          <div className="hero-outer">
            <div className="hero-inner">

              {/* LEFT */}
              <div className="hero-left glow-card">
                <div className="hero-badge">
                  <span className="hero-badge-dot" />
                  Interning at Pipetech AI · Present
                </div>
                <h1 className="hero-h1">
                  <span className="white" style={{ display: 'block' }}>hi, i'm</span>
                  <span className="pink" style={{ display: 'block' }}>Eshika Arya</span>
                  <span className="white" style={{ display: 'block' }}>computer engg</span>
                  <span className="white" style={{ display: 'block' }}>undergrad<span className="hero-cursor" /></span>
                </h1>
                <p className="hero-desc">
                  Undergraduate Computer Engineering student at KJ Somaiya School of Engineering.
                  Keen eye towards perfection, highly motivated, and versatile enough to adapt to
                  new environments and mend into them.
                </p>
              </div>

              {/* RIGHT */}
              <div className="hero-right">
                <div className="hero-right-top">
                  <div className="avatar-wrap">
                    <img className="avatar-animated" src={meAnimated} alt="Eshika animated" />
                    <img className="avatar-real" src={meReal} alt="Eshika" />
                  </div>
                  <a href="/resume.pdf" target="_blank" className="resume-circle">
                    <span className="resume-circle-text">resume</span>
                    <span className="resume-circle-arrow">↗</span>
                  </a>
                </div>
                <div className="now-card glow-card">
                  <div className="now-top">
                    <span className="now-label">/now</span>
                    <span className="now-online"><span className="now-dot" />online</span>
                  </div>
                  <p className="now-text">
                    Currently — interning at Pipetech AI Technologies, and leading logistics at Insignia Art Club.
                  </p>
                </div>
                <div className="btech-card glow-card" style={{ border: '1px solid transparent' }}>
                  <span className="btech-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </span>
                  <div className="btech-title">B.Tech</div>
                  <div className="btech-sub">Computer Engineering · Class of 2029</div>
                </div>
              </div>

            </div>

            {/* BOTTOM ROW */}
            <div className="hero-sub-row">
              <div className="info-card glow-card">
                <div className="info-grid">
                  {[
                    { l: "Based in", v: "Navi Mumbai" },
                    { l: "School",   v: "KJSSE '29" },
                    { l: "Started",  v: "July 2025" },
                    { l: "Focus",    v: "Web + AI" },
                  ].map(c => (
                    <div className="info-item" key={c.l}>
                      <div className="info-lbl">{c.l}</div>
                      <div className="info-val">{c.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="code-card glow-card">
                <div className="dots-row">
                  <span className="dot-r" /><span className="dot-g" /><span className="dot-b" />
                </div>
                <div className="code-block">
                  <span className="kw">class</span> <span className="var">Eshika</span>:<br />
                  &nbsp;&nbsp;<span className="var">role</span> = <span className="str">"CE Student"</span><br />
                  &nbsp;&nbsp;<span className="var">loves</span> = [<span className="str">"clean ui"</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"problem solving"</span>]<br />
                  &nbsp;&nbsp;<span className="var">learning</span> = <span className="kw">True</span>&nbsp;<span className="cm"># always</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* PROJECTS + EDUCATION */}
      <section id="work-edu">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="section-label" style={{ marginBottom: 0 }}>Projects</div>
              <span className="section-right">more coming soon</span>
            </div>
            <div className="section-label" style={{ marginBottom: 0 }}>Education</div>
          </div>
          <div className="inner" style={{ alignItems: 'stretch' }}>
            <div className="project-card glow-card" style={{ height: '100%' }}>
              <div className="project-card-top">
                <div className="project-tag-pill">Flask · Python · HTML · CSS</div>
                <div className="proj-arrow">↗</div>
              </div>
              <h3>PYQ Portal</h3>
              <p>Web portal for accessing and practicing previous year questions. Planned for future development.</p>
              <div className="proj-status">Planned</div>
            </div>
            <div className="edu-card glow-card" style={{ height: '100%' }}>
              <div className="edu-item">
                <h3>KJ Somaiya School of Engineering</h3>
                <div className="edu-sub">B.Tech, Computer Engineering · Vidyavihar</div>
                <div className="edu-date">Jul 2025 — Aug 2029 (expected)</div>
              </div>
              <div className="edu-item">
                <h3>Poddar Brio International School</h3>
                <div className="edu-sub">High School (12th) · Badlapur</div>
                <div className="edu-date">2023 — 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div className="section-label" style={{ marginBottom: 0 }}>
              <span className="section-label-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="7" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span> Experience
            </div>
            <span className="section-right">timeline</span>
          </div>
          <div className="exp-card glow-card">
            <div className="exp-timeline">
              {[
                {
                  role: "SWE Intern",
                  company: "Pipetech AI Technologies",
                  date: "2026 – Present",
                  desc: "Working on AI-driven engineering tooling. Contributing to software development and building practical solutions with the team."
                },
                {
                  role: "Joint Logistics Head",
                  company: "Insignia Art Club",
                  date: "Oct 2025 – Jul 2026",
                  desc: "Coordinated logistics and operations for club events and exhibitions. Managed planning, scheduling, and resource allocation across organizing teams. Collaborated with team members on timely execution and oversaw event coordination and participant management."
                },
              ].map((e, i) => (
                <div className="exp-entry" key={i}>
                  <div className="exp-left">
                    <div className="exp-dot" />
                    <div className="exp-date">{e.date}</div>
                  </div>
                  <div className="exp-content">
                    <h3>{e.role} · <span style={{ fontWeight: 400 }}>{e.company}</span></h3>
                    <div className="exp-company">{e.company}</div>
                    <p>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* TECH STACK */}
      <section id="stack">
        <div className="container" style={{ marginBottom: 28 }}>
          <div className="section-label">
            <span className="section-label-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            Tech stack
          </div>
        </div>
        <div className="container">
          <div className="stack-outer">
            <Ticker items={TECH1} rev={false} />
            <div className="ticker-divider" />
            <Ticker items={TECH2} rev={true} />
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="inner">
            <div className="about-card glow-card">
              <div className="about-tag">&lt;/&gt; about</div>
              <h2>
                I'm a Computer Engineering undergrad with a <span className="highlight">keen eye for detail</span> and
                a soft spot for software that just feels right to use.
              </h2>
              <p>
                I'm highly motivated towards my profession, versatile enough to adapt to new environments and make them
                my own. Outside of code, I lead logistics for our college art club — turns out shipping events and
                shipping software aren't that different.
              </p>
            </div>
            <div className="about-right">
              <div className="skills-card glow-card">
                <div className="skills-title">other skills</div>
                {["Leadership", "Teamwork", "Time management", "Event coordination"].map(s => (
                  <div className="skill-row" key={s}>
                    <span>{s}</span>
                    <span className="skill-plus">+</span>
                  </div>
                ))}
              </div>
              <div className="resume-card glow-card" style={{ border: '1px solid transparent' }}>
                <div className="resume-file">resume.pdf</div>
                <div className="resume-title">grab the one-pager</div>
                <span className="resume-arrow">↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* CERTIFICATES */}
      <section id="certs">
        <div className="container">
          <div className="certs-top">
            <div className="section-label" style={{ marginBottom: 0 }}>
              <span className="section-label-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </span>
              Certificates
            </div>
            <span className="certs-count">01 verified</span>
          </div>
          <div className="certs-grid">
            <div className="cert-card glow-card">
              <div className="cert-card-top">
                <span className="cert-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </span>
                <span className="cert-year">2024</span>
              </div>
              <h3>The Complete Python Bootcamp: From Zero to Hero in Python</h3>
              <div className="cert-issuer">Udemy</div>
            </div>
            <div className="cert-card cert-upcoming-card glow-card">
              <div className="cert-card-top">
                <span className="cert-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </span>
                <span className="cert-upcoming-badge">upcoming</span>
              </div>
              <h3>Pipetech AI Internship Certificate</h3>
              <div className="cert-issuer">Coming after internship completion</div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="contact-card glow-card">
            <div className="contact-section-lbl">contact</div>
            <div className="contact-heading">
              let's build<br />
              <span className="pink">something!</span>
            </div>
            <div className="contact-links-row">
              <a href="mailto:eshikaarya04@gmail.com" className="contact-chip email">
                <span className="chip-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                eshikaarya04@gmail.com
              </a>
              <a href="tel:+919833062269" className="contact-chip">
                <span className="chip-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                +91 98330 62269
              </a>
              <a href="https://www.linkedin.com/in/eshika-arya-01a562382/" target="_blank" rel="noopener noreferrer" className="contact-chip">
                <span className="chip-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
                  </svg>
                </span>
                linkedin
              </a>
              <a href="https://github.com/eshika04" target="_blank" rel="noopener noreferrer" className="contact-chip">
                <span className="chip-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </span>
                github
              </a>
              <a href="#" className="contact-chip">
                <span className="chip-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                Navi Mumbai, IN
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p className="foot-text">© 2026 Eshika Arya. Made with <span className="heart">♥</span> care.</p>
        <p className="foot-text">portfolio v1 · last updated today</p>
      </footer>

      <div id="sparkle-con"></div>
      <div id="cur-outer"></div>
      <div id="cur-ring"></div>
      <div id="cur-dot"></div>
    </>
  );
}

export default App;