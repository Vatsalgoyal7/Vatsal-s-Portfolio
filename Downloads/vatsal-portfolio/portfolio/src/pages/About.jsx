import { Link } from 'react-router-dom'
import { roles, skills } from '../data'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  useReveal()

  return (
    <div className="inner-page">
      <div className="page-header reveal">
        <Link to="/" className="back-link">← Back</Link>
        <span className="page-eyebrow">Who I am</span>
        <h1 className="page-title">About <em>Vatsal</em></h1>
      </div>

      <div className="about-layout">
        {/* Left column – brief intro */}
        <section className="about-text reveal" style={{ animationDelay: '0.1s' }}>
          <p>Hello! I’m Vatsal, a full‑stack developer passionate about building fast, beautiful web experiences for events, colleges and startups. I love turning ideas into polished products and constantly explore new tech.
          </p>
        </section>

        {/* Right column – roles & skills */}
        <section className="about-sidebar reveal" style={{ animationDelay: '0.2s' }}>
          <div className="roles-list">
            <h3 className="sec-eyebrow">Roles</h3>
            {roles.map((r, i) => (
              <div key={i} className="role-item">
                <h4>{r.title}</h4>
                <div className="role-place">{r.place} • {r.period}</div>
                <p>{r.text}</p>
              </div>
            ))}
          </div>

          <div className="skills-panel">
            <h3 className="sec-eyebrow">Skills</h3>
            <div className="skill-list">
              {skills.map((s, i) => (
                <div key={i} className="skill-row">
                  <span className="sk-key" style={{ color: s.color }}>{s.key}</span>
                  <span className="sk-val">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
