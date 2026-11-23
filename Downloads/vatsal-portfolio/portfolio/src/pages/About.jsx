import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { roles, skills } from '../data'

const timeline = [
  { year: '2024', event: 'Joined IMS Engineering College, Ghaziabad (AKTU) — B.Tech CSE', icon: '🎓' },
  { year: '2024', event: 'Started building real products — first React projects shipped', icon: '⚡' },
  { year: '2025', event: 'Founded TrueChain — Blockchain startup. Won ₹10k at HackWithUP (21k+ registrations)', icon: '⛓️' },
  { year: '2025', event: 'Pitched TrueChain at IIT Delhi Startup Incubation', icon: '🚀' },
  { year: '2025', event: 'Became Sports Main Coordinator, IMSEC Sports Society', icon: '🏅' },
  { year: '2025', event: 'Selected as Google Gemini Student Ambassador (GID: 7505)', icon: '🔵' },
  { year: '2025', event: 'Represented IMSEC at IIT Delhi (eDC Blueprint 6.0) & IIM Shillong (DRISHTI-NE)', icon: '🌐' },
  { year: '2026', event: 'Generative AI Intern — AKTU-IBM PBEL · Earned IBM SkillsBuild certification', icon: '🤖' },
  { year: '2026', event: 'Campus Mantri at GeeksforGeeks IMSEC', icon: '💚' },
  { year: '2026', event: 'RIFT \'26 — VitalGeneAI ranked 6th in Healthcare Track (8k+ registrations)', icon: '🧬' },
  { year: '2026', event: 'Built Chakravyuh 2K26 — official sports fest platform (AKTU multi-college)', icon: '🏟️' },
]

const achievements = [
  { label: '8+',   sub: 'Hackathons', color: '#7c3aed' },
  { label: '₹10k', sub: 'Prize Won',  color: '#f59e0b' },
  { label: '21k+', sub: 'Competition registrations', color: '#06b6d4' },
  { label: '7+',   sub: 'Projects Shipped', color: '#10b981' },
  { label: '1k+',  sub: 'Students Reached', color: '#ec4899' },
  { label: '3',    sub: 'IIT/IIM Events',   color: '#a78bfa' },
]

export default function About() {
  useReveal()

  return (
    <div className="inner-page">
      <div className="page-header reveal">
        <Link to="/" className="back-link">← Back</Link>
        <span className="page-eyebrow">About me</span>
        <h1 className="page-title">Builder. Hacker. <em>Founder.</em></h1>
      </div>

      {/* ── Bio + Photo ── */}
      <div className="about-bio-wrap reveal" style={{ animationDelay: '0.1s' }}>
        <div className="about-bio-text">
          <p>
            Hey! I'm <strong>Vatsal Goyal</strong> — a 3rd-year B.Tech CSE student at <strong>IMS Engineering College, Ghaziabad (AKTU)</strong>,
            building real products that solve real problems.
          </p>
          <p>
            I'm the <strong>founder of TrueChain</strong> — a blockchain food provenance startup that won <strong>₹10,000 at HackWithUttarPradesh</strong>
            (21,000+ registrations) and was pitched at <strong>IIT Delhi Startup Incubation</strong>. I've competed in <strong>8+ hackathons</strong> at IITs, IIMs, and national platforms.
          </p>
          <p>
            As a <strong>Google Gemini Student Ambassador (GID: 7505)</strong>, I run AI workshops and promote Google's AI tools to 1,000+ students at IMSEC.
            I'm also the <strong>Sports Main Coordinator</strong> at IMSEC Sports Society — managing all inter-college and inter-department events.
          </p>
          <p>
            I freelance for <strong>colleges, events, and businesses</strong> — building fast, beautiful web products. If you have a project idea, let's talk! 🚀
          </p>

          <div className="about-tags">
            {['Full-Stack Dev', 'Startup Founder', 'AI Enthusiast', 'Google Ambassador', 'Sports Coordinator', 'Freelancer'].map(t => (
              <span key={t} className="about-tag">{t}</span>
            ))}
          </div>
        </div>
        <img src="/images/vatsal-casual.jpg" alt="Vatsal Goyal" className="about-photo" />
      </div>

      {/* ── Achievement stats ── */}
      <div className="achievement-grid reveal" style={{ animationDelay: '0.15s' }}>
        {achievements.map(a => (
          <div key={a.label} className="ach-card" style={{ '--ach-color': a.color }}>
            <span className="ach-num">{a.label}</span>
            <span className="ach-sub">{a.sub}</span>
          </div>
        ))}
      </div>

      {/* ── Photo Gallery ── */}
      <section className="photo-gallery reveal" style={{ animationDelay: '0.18s' }}>
        <h2 className="section-title">Moments That Matter</h2>
        <div className="gallery-grid">
          <div className="gallery-item gi-tall">
            <img src="/images/hackwithup-stage.jpg" alt="Winning ₹10k at HackWithUttarPradesh, Chandigarh University" />
            <div className="gallery-caption">🏆 HackWithUP 2025 — 3rd Place, ₹10k Prize · Chandigarh University</div>
          </div>
          <div className="gallery-item gi-normal">
            <img src="/images/gfg-vp-seminar.jpg" alt="With GFG VP Chandan Jha at IMSEC Seminar" />
            <div className="gallery-caption">💚 With GFG VP Chandan Jha — Seminar organized at IMSEC</div>
          </div>
          <div className="gallery-item gi-normal">
            <img src="/images/rift-team.jpg" alt="RIFT 2026 Hackathon Team — Semi-finalist Rank 6" />
            <div className="gallery-caption">⚡ RIFT '26 — Semi-finalist Rank 6, Healthcare Track · PW Institute</div>
          </div>
          <div className="gallery-item gi-normal">
            <img src="/images/hackwithup-college.jpg" alt="Team celebration at IMS Engineering College" />
            <div className="gallery-caption">🎉 Celebration at IMSEC with Director & HODs</div>
          </div>
          <div className="gallery-item gi-normal">
            <img src="/images/vatsal-certificate.jpg" alt="Receiving certificate for Chakravyuh 2K26" />
            <div className="gallery-caption">📜 Certificate for Chakravyuh 2K26 from IMSEC Director</div>
          </div>
          <div className="gallery-item gi-wide">
            <img src="/images/iit-delhi-incubator.jpg" alt="IIT Delhi eDC INCon 2026 Incubator Summit" />
            <div className="gallery-caption">🚀 TrueChain at IIT Delhi eDC INCon 2026 — Incubator Summit</div>
          </div>
        </div>
      </section>


      <section className="about-timeline reveal" style={{ animationDelay: '0.2s' }}>
        <h2 className="section-title">Journey So Far</h2>
        <div className="timeline-list">
          {timeline.map((t, i) => (
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

      {/* ── Roles ── */}
      <section className="about-roles-section reveal" style={{ animationDelay: '0.25s' }}>
        <h2 className="section-title">Roles & Experience</h2>
        <div className="roles-grid">
          {roles.map((r, i) => (
            <div key={i} className="role-card">
              <span className="role-card-icon">{r.icon}</span>
              <div>
                <h4 className="role-card-title">{r.title}</h4>
                <div className="role-card-org">{r.org}</div>
                <div className="role-card-period">{r.period}</div>
                <p className="role-card-desc">{r.desc}</p>
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
    </div>
  )
}
