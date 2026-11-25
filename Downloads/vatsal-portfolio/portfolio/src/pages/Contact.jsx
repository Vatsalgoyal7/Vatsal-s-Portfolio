import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

/* ── API Configuration ── */
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY
const VATSAL_WA  = import.meta.env.VITE_VATSAL_WA || '917452027691'

const BRIEF_PROMPT = `You are a professional project scoping assistant for Vatsal Goyal, a full-stack freelance web & mobile developer.
Given a client's project idea, generate a concise professional project brief in this exact format:

📋 PROJECT SCOPE & BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Project: [Clear Project Name]
📝 Summary: [2 concise lines describing the solution]
✨ Core Features:
  • [Key Feature 1]
  • [Key Feature 2]
  • [Key Feature 3]
⏱️ Estimated Timeline: [e.g. 1–2 weeks, 3–4 weeks]
💻 Recommended Tech Stack: React / Next.js, Tailwind CSS, Node.js / Firebase
💰 Indicative Budget: ₹[min]–₹[max]
📌 Next Step: Tap below to discuss this brief directly with Vatsal on WhatsApp!

Pricing guide: landing/portfolio ₹4k-10k, business/event portal ₹10k-25k, full-stack MVP ₹25k-50k+. Keep it realistic and encouraging.`

async function generateBrief(idea) {
  // If Gemini key is available, call Gemini 3.5 Flash-Lite
  if (GEMINI_KEY) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_KEY}`
      const body = {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${BRIEF_PROMPT}\n\nClient's Idea:\n${idea}` }]
          }
        ]
      }
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (res.ok) {
        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) return text
      }
    } catch (e) {
      // Fallback to smart template below
    }
  }

  // Instant Smart Scoper Fallback
  return `📋 PROJECT SCOPE & BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Project: Custom Digital Solution for "${idea.slice(0, 35)}..."
📝 Summary: A modern, high-performance web or mobile application tailored to your requirements, built with clean architecture and responsive UI.
✨ Core Features:
  • Modern, high-speed UI tailored to your users
  • Responsive mobile & desktop layout with fast loading
  • Backend/Database integration & secure APIs
⏱️ Estimated Timeline: 1–3 weeks
💻 Recommended Tech Stack: React / Next.js, Tailwind CSS, Node.js, Vercel
💰 Indicative Budget: ₹8,000 – ₹25,000 (Based on scope)
📌 Next Step: Tap below to discuss and finalize the scope directly with Vatsal on WhatsApp!`
}

/* ── Contact info cards ── */
const contacts = [
  { icon: '📧', label: 'Email',     val: 'vatsalgoyal77@gmail.com',          href: 'mailto:vatsalgoyal77@gmail.com',         color: '#7c3aed' },
  { icon: '💼', label: 'LinkedIn',  val: 'linkedin.com/in/vatsalgoyal7',     href: 'https://www.linkedin.com/in/vatsalgoyal7/', color: '#0ea5e9' },
  { icon: '💻', label: 'GitHub',    val: 'github.com/Vatsalgoyal7',          href: 'https://github.com/Vatsalgoyal7',        color: '#a78bfa' },
  { icon: '📸', label: 'Instagram', val: '@vatsalgoyal.7',                   href: 'https://www.instagram.com/vatsalgoyal.7/', color: '#ec4899' },
]

export default function Contact() {
  const ref = useReveal()
  const [idea,    setIdea]    = useState('')
  const [loading, setLoading] = useState(false)
  const [brief,   setBrief]   = useState('')
  const [err,     setErr]     = useState('')

  async function handleGenerate() {
    if (!idea.trim() || loading) return
    setLoading(true)
    setErr('')
    setBrief('')
    try {
      const result = await generateBrief(idea)
      setBrief(result)
    } catch {
      setErr('AI generation failed. Please message Vatsal directly on WhatsApp!')
    } finally {
      setLoading(false)
    }
  }

  const waText = brief
    ? `Hi Vatsal! I came from your portfolio. Here's my project idea:\n\n${idea}\n\nAI-generated brief:\n${brief}`
    : `Hi Vatsal! I came from your portfolio and would like to talk about a project.`

  return (
    <div className="page-wrap contact-page" ref={ref}>

      {/* ── Header ── */}
      <section className="page-header reveal">
        <div className="section-tag">Let's talk</div>
        <h1 className="page-title">Get in Touch</h1>
        <p className="page-sub">
          Have an idea, need a freelance developer, or just want to connect?
          Reach out through any platform below — WhatsApp is the fastest.
        </p>
      </section>

      {/* ── Contact channels ── */}
      <div className="contact-cards reveal" style={{ animationDelay: '0.1s' }}>
        {contacts.map(({ icon, label, val, href, color }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="contact-card"
            style={{ '--c-accent': color }}
          >
            <span className="contact-icon">{icon}</span>
            <div className="contact-info">
              <span className="contact-label">{label}</span>
              <span className="contact-val">{val}</span>
            </div>
            <span className="contact-arrow">↗</span>
          </a>
        ))}
      </div>

      {/* ── WhatsApp direct banner ── */}
      <a
        href={`https://wa.me/${VATSAL_WA}?text=${encodeURIComponent('Hi Vatsal! I came from your portfolio.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-direct-btn reveal" style={{ animationDelay: '0.2s' }}
      >
        <span className="wa-icon">💬</span>
        <div className="wa-text">
          <strong>Chat directly on WhatsApp</strong>
          <span>Usually replies within a few hours</span>
        </div>
        <span className="wa-arrow">→</span>
      </a>

      {/* ── AI Project Brief Generator ── */}
      <section className="brief-section reveal" style={{ animationDelay: '0.3s' }}>
        <div className="brief-header">
          <div className="brief-badge">✨ AI Project Scoper</div>
          <h2 className="brief-title">Generate Your Project Brief</h2>
          <p className="brief-sub">
            Describe your idea in plain words — AI will create a professional scope, timeline &amp; budget estimate instantly.
          </p>
        </div>

        <div className="brief-input-wrap">
          <textarea
            className="brief-textarea"
            placeholder="e.g. I need a modern website for my sports club with event registration, payment gateway and WhatsApp notifications..."
            value={idea}
            onChange={e => setIdea(e.target.value)}
            rows={4}
            disabled={loading}
          />
          <button
            className={`brief-btn ${loading ? 'brief-btn-loading' : ''}`}
            onClick={handleGenerate}
            disabled={loading || !idea.trim()}
          >
            {loading ? (
              <><span className="brief-spinner" /> Scoping Project...</>
            ) : (
              <>✨ Generate Project Brief</>
            )}
          </button>
        </div>

        {err && <div className="brief-error">{err}</div>}

        {brief && (
          <div className="brief-result">
            <pre className="brief-output">{brief}</pre>
            <a
              href={`https://wa.me/${VATSAL_WA}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="brief-wa-btn"
            >
              💬 Send this brief to Vatsal on WhatsApp
            </a>
          </div>
        )}
      </section>

    </div>
  )
}
