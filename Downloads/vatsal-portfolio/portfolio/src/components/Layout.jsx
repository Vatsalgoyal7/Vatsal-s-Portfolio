import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { links } from '../data'
import ChatBot from './ChatBot'
import ScreenPet from './ScreenPet'

/* ── Aurora + cursor glow ── */
function Background() {
  useEffect(() => {
    // Cursor glow that follows mouse
    const glow = document.getElementById('cursor-glow')
    if (!glow) return
    const move = e => {
      glow.style.left = e.clientX + 'px'
      glow.style.top  = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById('scroll-bar')
    if (!bar) return
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      bar.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="bg-layer" aria-hidden="true">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="grid-overlay" />
        <div className="noise" />
      </div>
      <div id="cursor-glow" className="cursor-glow" aria-hidden="true" />
      <div id="scroll-bar" className="scroll-bar" aria-hidden="true" />
    </>
  )
}

export default function Layout({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  const navItems = [
    { to: '/',            label: 'Home' },
    { to: '/projects',    label: 'Projects' },
    { to: '/hackathons',  label: 'Hackathons' },
    { to: '/about',       label: 'About' },
    { to: '/gallery',     label: 'Gallery' },
    { to: '/contact',     label: 'Contact' },
  ]

  return (
    <>
      <Background />

      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="Home">
          <span className="brand-mark">VG</span>
          <span className="brand-text">Vatsal<span>.</span></span>
        </NavLink>

        <nav className="site-nav" aria-label="Main">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              end={to === '/'}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume"
            title="Open Vatsal's Resume in Google Drive"
          >
            📄 Resume
          </a>
          <a className="nav-hire" href={`mailto:${links.email}?subject=Project%20enquiry`}>
            Get in touch ✦
          </a>
        </div>
      </header>

      <main className="page-main">
        {children}
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Vatsal Goyal</span>
        <div className="footer-links">
          <a href={links.github}    target="_blank" rel="noopener">GitHub</a>
          <a href={links.linkedin}  target="_blank" rel="noopener">LinkedIn</a>
          <a href={links.instagram} target="_blank" rel="noopener">Instagram</a>
          <a href={links.resume}    target="_blank" rel="noopener">Resume</a>
        </div>
      </footer>

      <ChatBot />
      <ScreenPet />
    </>
  )
}
