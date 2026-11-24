import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { skills } from '../data'

export default function About() {
  useReveal()

  return (
    <div className="inner-page">
      <div className="page-header reveal">
        <Link to="/" className="back-link">← Back</Link>
        <span className="page-eyebrow">About me</span>
        <h1 className="page-title">Builder. Hacker. <em>Founder.</em></h1>
      </div>

      {/* ── INTRO STORY ── */}
      <section className="about-story reveal" style={{ animationDelay: '0.1s' }}>
        <div className="story-block">
          <div className="story-text">
            <p className="story-lead">
              Hey! I'm <strong>Vatsal Goyal</strong> — a full-stack developer, startup founder, and
              Google Gemini Ambassador from Ghaziabad. I'm currently in my 3rd year of B.Tech CSE
              at <strong>IMS Engineering College (AKTU)</strong>.
            </p>
            <p>
              I started coding in my first year — not to pass exams, but because I genuinely
              wanted to build things. Fast forward to today: I've shipped <strong>7+ real products</strong>,
              competed in <strong>8+ hackathons</strong> at IITs, IIMs, and national stages,
              and founded a blockchain startup that got incubated at <strong>IIT Delhi</strong>.
            </p>
            <p>
              I believe the best way to learn is to <em>ship</em>. Every project I build solves
              a real problem — whether it's a college sports fest platform handling thousands of
              registrations, an AI genomics tool, or a food traceability blockchain.
            </p>
          </div>
          <img src="/images/vatsal-casual.jpg" alt="Vatsal Goyal" className="about-photo story-photo" />
        </div>
      </section>

      {/* ── HACKATHON STORY with photos ── */}
      <section className="about-story reveal" style={{ animationDelay: '0.15s' }}>
        <h2 className="section-title">🏆 The Hackathon Journey</h2>

        <div className="exp-block">
          <div className="exp-images">
            <img src="/images/hackwithup-stage.jpg" alt="HackWithUP Stage" className="exp-img exp-img-main" />
            <img src="/images/hackwithup-college.jpg" alt="College Celebration" className="exp-img exp-img-side" />
          </div>
          <div className="exp-text">
            <div className="exp-label">🏆 HackWithUttarPradesh 2025 · Chandigarh University</div>
            <h3 className="exp-title">3rd Place &amp; ₹10,000 Prize — 21,000+ Registrations</h3>
            <p>
              This was the moment everything clicked. We built <strong>TrueChain</strong> — a
              blockchain-based food provenance system — in 30 hours. The idea: farmers connect
              to manufacturers, distributors, and retailers through trackable supply chains,
              preventing counterfeiting at every step.
            </p>
            <p>
              Competing against 21,000+ teams nationally, we took <strong>3rd place in the
              Blockchain & Web3 track</strong> and walked away with ₹10,000. Coming back to
              college and celebrating with the Director and HODs — that felt surreal.
            </p>
          </div>
        </div>

        <div className="exp-block exp-block-reverse">
          <div className="exp-images">
            <img src="/images/rift-team.jpg" alt="RIFT Hackathon Team" className="exp-img exp-img-main" />
          </div>
          <div className="exp-text">
            <div className="exp-label">⚡ RIFT '26 · PW Institute of Innovation</div>
            <h3 className="exp-title">Semi-Finalist · Rank 6 — Healthcare Track (8,000+ Teams)</h3>
            <p>
              Built <strong>VitalGeneAI</strong> — an AI-powered pharmacogenomic decision support
              system using Google's Gemini API. It analyzes genomic VCF data to identify drug
              response variants and generate CPIC-aligned medication recommendations.
            </p>
            <p>
              What made this special: our team connected with another team from a different state,
              and we collaborated — I handled the full-stack development while they took care of
              the video presentation. That's what hackathons are really about.
            </p>
          </div>
        </div>
      </section>

      {/* ── IIT DELHI STARTUP ── */}
      <section className="about-story reveal" style={{ animationDelay: '0.2s' }}>
        <h2 className="section-title">🚀 Startup & Incubation</h2>
        <div className="exp-block">
          <div className="exp-images">
            <img src="/images/iit-delhi-incubator.jpg" alt="IIT Delhi Incubator Summit" className="exp-img exp-img-main" />
          </div>
          <div className="exp-text">
            <div className="exp-label">🏛️ IIT Delhi · eDC INCon 2026 Incubator Summit</div>
            <h3 className="exp-title">TrueChain — Pitched at IIT Delhi Startup Incubation</h3>
            <p>
              After winning HackWithUP, TrueChain was selected for the <strong>IIT Delhi eDC
              INCon 2026 Incubator Summit</strong>. I walked into one of India's most prestigious
              tech institutions as a founder — presenting a blockchain B2B SaaS to investors
              and industry leaders.
            </p>
            <p>
              TrueChain enables end-to-end food supply chain traceability: farmer → manufacturer
              → distributor → wholesaler → retailer — each step tracked and verified on-chain.
              It's anti-counterfeiting by design.
            </p>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="about-story reveal" style={{ animationDelay: '0.22s' }}>
        <h2 className="section-title">🎯 Leadership & Roles</h2>
        <div className="exp-block exp-block-reverse">
          <div className="exp-images">
            <img src="/images/vatsal-certificate.jpg" alt="Chakravyuh Certificate" className="exp-img exp-img-main" />
          </div>
          <div className="exp-text">
            <div className="exp-label">🏅 IMSEC Sports Society · 2026–Present</div>
            <h3 className="exp-title">Sports Main Coordinator & Club Head</h3>
            <p>
              I head the entire sports department at IMS Engineering College — planning,
              organizing and executing all inter-department and inter-college sporting events.
              I also built <strong>Chakravyuh 2K26</strong>, the official AKTU multi-college
              sports fest platform, handling participant registration, role-based admin panel,
              scheduling, and live deployment for thousands of students.
            </p>
          </div>
        </div>

        <div className="exp-block" style={{ marginTop: '32px' }}>
          <div className="exp-images">
            <img src="/images/gfg-vp-seminar.jpg" alt="With GFG VP Chandan Jha" className="exp-img exp-img-main" />
          </div>
          <div className="exp-text">
            <div className="exp-label">💚 GeeksforGeeks Campus Mantri · Jan–Jun 2026</div>
            <h3 className="exp-title">Organized GFG Seminar with VP Chandan Jha</h3>
            <p>
              As the official GFG Campus Representative, I organized coding sessions, DSA
              workshops, and mentorship events across campus. The highlight was personally
              inviting and hosting <strong>Chandan Jha (VP, GeeksforGeeks)</strong> for a
              seminar at IMSEC — connecting 100+ students with industry leadership.
            </p>
          </div>
        </div>

        <div className="about-roles-extra">
          <div className="role-mini-card">
            <span className="role-mini-icon">🔵</span>
            <div>
              <strong>Google Student Ambassador</strong>
              <span className="role-mini-sub">GID: 7505 · 2026–Present · 1,000+ students reached</span>
              <p>Promotes Google AI tools — Gemini, Canvas, Deep Research, Gemini Live, Code Assist — through workshops and AI hackathons at IMSEC.</p>
            </div>
          </div>
          <div className="role-mini-card">
            <span className="role-mini-icon">🤖</span>
            <div>
              <strong>Generative AI Intern — AKTU–IBM PBEL</strong>
              <span className="role-mini-sub">Feb–May 2026 · IBM SkillsBuild Certified</span>
              <p>Built a Student Performance Analysis ML model using Linear Regression. Earned IBM PBEL 2.3 – Gen AI certification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery link card */}
      <section className="reveal" style={{ animationDelay: '0.25s', marginBottom: '48px' }}>
        <div className="gallery-link-banner">
          <div>
            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>📸 Photos, Moments & Certificates</h2>
            <p style={{ margin: '6px 0 0', color: 'var(--muted)', fontSize: '0.88rem' }}>See all hackathon photos, certificates (IBM, GFG, HackWithUP) and event moments in one place.</p>
          </div>
          <a href="/gallery" className="btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>View Gallery →</a>
        </div>
      </section>

      {/* ── Journey Timeline ── */}
      <section className="about-timeline reveal" style={{ animationDelay: '0.28s' }}>
        <h2 className="section-title">Journey So Far</h2>
        <div className="timeline-list">
          {[
            { year: '2024', icon: '🎓', event: 'Joined IMS Engineering College, Ghaziabad (AKTU) — B.Tech CSE' },
            { year: '2024', icon: '⚡', event: 'Started building real products — first React projects shipped' },
            { year: '2025', icon: '⛓️', event: 'Founded TrueChain — Blockchain food provenance startup. Won ₹10k at HackWithUP (21k+ registrations, Nov 2025)' },
            { year: '2026', icon: '🚀', event: 'Pitched TrueChain at IIT Delhi eDC INCon 2026 Incubator Summit' },
            { year: '2026', icon: '🏅', event: 'Sports Main Coordinator & Club Head — IMSEC Sports Society (2026–Present)' },
            { year: '2026', icon: '🔵', event: 'Selected as Google Student Ambassador · GID: 7505 (2026–Present)' },
            { year: '2025', icon: '🌐', event: 'Represented IMSEC at IIT Delhi (eDC Blueprint 6.0) & IIM Shillong (DRISHTI-NE)' },
            { year: '2025', icon: '🏟️', event: 'Built Chakravyuh 2K26 — official AKTU multi-college sports fest platform' },
            { year: '2026', icon: '🤖', event: 'Generative AI Intern — AKTU-IBM PBEL · Earned IBM SkillsBuild certification' },
            { year: '2026', icon: '💚', event: 'Campus Mantri at GeeksforGeeks IMSEC — hosted GFG VP Chandan Jha seminar' },
            { year: '2026', icon: '🧬', event: "RIFT '26 — VitalGeneAI ranked 6th in Healthcare Track (8k+ registrations)" },
          ].map((t, i) => (
            <div key={i} className="tl-item">
              <div className="tl-icon">{t.icon}</div>
              <div className="tl-content">
                <span className="tl-year">{t.year}</span>
                <p className="tl-event">{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="about-skills-section reveal" style={{ animationDelay: '0.3s' }}>
        <h2 className="section-title">Tech Stack</h2>
        <div className="skills-category-grid">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat} className="skill-cat-card">
              <h4 className="skill-cat-title">{cat.replace(/_/g, ' ')}</h4>
              <div className="skill-pills">
                {items.map(s => (
                  <span key={s} className="skill-pill">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Hobbies ── */}
      <section className="hobbies-section reveal" style={{ animationDelay: '0.35s' }}>
        <h2 className="section-title">Beyond the Code</h2>
        <p className="hobbies-sub">When I'm not building things, here's what you'll find me doing:</p>
        <div className="hobbies-grid">
          {[
            { icon: '🏸', label: 'Badminton',   desc: 'Court hustle, smashes & quick reflexes' },
            { icon: '🏀', label: 'Basketball',  desc: 'Team sport, strategy & fast breaks' },
            { icon: '♟️', label: 'Chess',        desc: 'Thinking 10 moves ahead, always' },
            { icon: '🏏', label: 'Cricket',      desc: 'Weekend matches & big sixes' },
            { icon: '🏊', label: 'Swimming',     desc: 'Clear mind, clean strokes' },
            { icon: '✈️', label: 'Travel',       desc: 'Exploring new cities & cultures' },
            { icon: '🍜', label: 'Food Hunting', desc: 'Street food to fine dining — all in' },
            { icon: '💡', label: 'Building',     desc: 'Side projects, wild ideas, late nights' },
          ].map(h => (
            <div key={h.label} className="hobby-card">
              <span className="hobby-icon">{h.icon}</span>
              <h4 className="hobby-label">{h.label}</h4>
              <p className="hobby-desc">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
