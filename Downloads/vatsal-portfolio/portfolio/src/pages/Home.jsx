import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { links } from '../data'

/* ── Typewriter ── */
const messages = [
  'Full-Stack Developer.',
  'UI/UX Designer.',
  'CS Student @ IMSEC, Ghaziabad.',
  'Freelancer for Colleges & Events.',
  'Ships real products fast.',
  'Building for Businesses.',
]

function useTypewriter(el) {
  useEffect(() => {
    if (!el.current) return
    let msgIdx = 0, charIdx = 0, deleting = false
    let timer
    const tick = () => {
      const msg = messages[msgIdx]
      if (!deleting) {
        charIdx++
        el.current.textContent = msg.slice(0, charIdx)
        if (charIdx === msg.length) { deleting = true; timer = setTimeout(tick, 1800); return }
      } else {
        charIdx--
        el.current.textContent = msg.slice(0, charIdx)
        if (charIdx === 0) { deleting = false; msgIdx = (msgIdx + 1) % messages.length }
      }
      timer = setTimeout(tick, deleting ? 38 : 65)
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [el])
}

/* ── Tile grid ── */
const tiles = [
  { to: '/projects',   label: 'Projects',   desc: "What I've built",        icon: '🚀', color: '#7c3aed' },
  { to: '/hackathons', label: 'Hackathons',  desc: 'Competitions & wins',    icon: '🏆', color: '#f59e0b' },
  { to: '/about',      label: 'About',       desc: 'Who I am',               icon: '👤', color: '#06b6d4' },
  { to: '/contact',    label: 'Contact',     desc: "Let's work together",    icon: '✉️',  color: '#10b981' },
  { href: links.github,    label: 'GitHub',    desc: 'My code repos',         icon: '💻', color: '#a78bfa', external: true },
  { href: links.linkedin,  label: 'LinkedIn',  desc: 'Connect professionally',icon: '🔗', color: '#0ea5e9', external: true },
  { href: links.instagram, label: 'Instagram', desc: 'Follow me',             icon: '📸', color: '#ec4899', external: true },
  { href: `mailto:${links.email}?subject=Project%20enquiry`,
                           label: 'Mail Me',   desc: 'Drop a message',        icon: '📬', color: '#f59e0b', external: true },
]

function Tile({ tile, style }) {
  const inner = (
    <div className="tile-inner" style={{ '--tile-color': tile.color }}>
      <span className="tile-icon">{tile.icon}</span>
      <span className="tile-label">{tile.label}</span>
      <span className="tile-desc">{tile.desc}</span>
      <span className="tile-arrow">→</span>
    </div>
  )
  if (tile.external) return (
    <a href={tile.href} target="_blank" rel="noopener noreferrer"
       className="tile" style={style} aria-label={tile.label}>{inner}</a>
  )
  return (
    <Link to={tile.to} className="tile" style={style} aria-label={tile.label}>{inner}</Link>
  )
}

/* ── Identity floating badges ── */
const identityBadges = [
  { label: '🎓 CSE Student',     top: '8%',  left: '-28%', delay: '0s',    color: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.4)' },
  { label: '💼 Freelancer',      top: '28%', left: '-32%', delay: '0.4s',  color: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)' },
  { label: '⚡ React Dev',       top: '58%', left: '-30%', delay: '0.8s',  color: 'rgba(6,182,212,0.15)',   border: 'rgba(6,182,212,0.4)' },
  { label: '🎨 UI Designer',     top: '8%',  right: '-28%', delay: '0.2s', color: 'rgba(236,72,153,0.15)', border: 'rgba(236,72,153,0.4)' },
  { label: '🏆 Hackathon Winner',top: '32%', right: '-35%', delay: '0.6s', color: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)' },
  { label: '🌐 Events & Biz',    top: '60%', right: '-30%', delay: '1s',   color: 'rgba(167,139,250,0.15)','border': 'rgba(167,139,250,0.4)' },
]

export default function Home() {
  const twRef = useRef(null)
  useTypewriter(twRef)

  return (
    <div className="home-page">
      {/* ── HERO ── */}
      <section className="hero">
        {/* Left — content */}
        <div className="hero-content">
          <div className="hero-eyebrow fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="available-dot" />
            Available for freelance
          </div>

          {/* Identity pills row */}
          <div className="identity-row fade-up" style={{ animationDelay: '0.18s' }}>
            <span className="id-pill purple">🎓 CSE Student</span>
            <span className="id-pill cyan">💻 Developer</span>
            <span className="id-pill pink">🎨 Designer</span>
            <span className="id-pill amber">💼 Freelancer</span>
          </div>

          <h1 className="hero-name fade-up" style={{ animationDelay: '0.28s' }}>
            Hi! I am <br />
            <span className="name-grad">Vatsal Goyal.</span>
          </h1>

          <p className="hero-typewriter fade-up" style={{ animationDelay: '0.42s' }}>
            <span ref={twRef} />
            <span className="cursor-blink">|</span>
          </p>

          <p className="hero-bio fade-up" style={{ animationDelay: '0.55s' }}>
            I build fast, beautiful web products for <strong>events</strong>, <strong>colleges</strong> &amp; <strong>businesses</strong>. 
            Computer Science student at IMSEC, Ghaziabad — available for freelance projects.
          </p>

          <div className="hero-cta fade-up" style={{ animationDelay: '0.68s' }}>
            <Link to="/projects" className="btn-primary">See my work →</Link>
            <a href={`mailto:${links.email}`} className="btn-ghost">Email me</a>
          </div>

          {/* Quick stats row */}
          <div className="hero-stats fade-up" style={{ animationDelay: '0.82s' }}>
            <div className="stat-item">
              <span className="stat-num">3+</span>
              <span className="stat-lbl">Projects shipped</span>
            </div>
            <div className="stat-sep" />
            <div className="stat-item">
              <span className="stat-num">4</span>
              <span className="stat-lbl">Hackathons</span>
            </div>
            <div className="stat-sep" />
            <div className="stat-item">
              <span className="stat-num">1</span>
              <span className="stat-lbl">Win + prize 🏆</span>
            </div>
          </div>
        </div>

        {/* Right — floating photo with badges */}
        <div className="hero-photo-wrap fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="hero-photo-frame">
            {/* Floating badges around photo */}
            {identityBadges.map((b, i) => (
              <span
                key={i}
                className="float-badge"
                style={{
                  top: b.top,
                  left: b.left,
                  right: b.right,
                  animationDelay: b.delay,
                  background: b.color,
                  border: `1px solid ${b.border}`,
                }}
              >
                {b.label}
              </span>
            ))}
            <img src="/vatsal.jpg" alt="Vatsal Goyal" className="hero-photo" />
            <div className="hero-photo-glow" />
            {/* Orbit ring */}
            <div className="photo-ring" />
          </div>
        </div>
      </section>

      {/* ── TILE GRID ── */}
      <section className="tiles-section fade-up" style={{ animationDelay: '1.0s' }}>
        <p className="tiles-label">Explore →</p>
        <div className="tiles-grid">
          {tiles.map((tile, i) => (
            <Tile key={tile.label} tile={tile} style={{ animationDelay: `${1.0 + i * 0.07}s` }} />
          ))}
        </div>
      </section>
    </div>
  )
}
