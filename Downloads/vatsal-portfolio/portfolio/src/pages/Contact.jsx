import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

/* ── API Keys from .env ── */
const NIM_KEY    = import.meta.env.VITE_NIM_KEY
const NIM_URL    = 'https://integrate.api.nvidia.com/v1/chat/completions'
const VATSAL_WA  = import.meta.env.VITE_VATSAL_WA

const BRIEF_PROMPT = `You are a professional project scoping assistant for Vatsal Goyal, a freelance web developer.
Given a client's project idea, generate a concise professional project brief in this exact format:

📋 PROJECT BRIEF
━━━━━━━━━━━━━━━
🎯 Project: [name]
📝 Summary: [2-line summary]
✨ Key Features:
  • [feature 1]
  • [feature 2]
  • [feature 3]
⏱️ Timeline: [X-Y weeks]
💻 Tech Stack: [recommended stack]
💰 Estimate: ₹[min]–₹[max]
📌 Next Step: Connect with Vatsal on WhatsApp to finalise!

Keep it concise, realistic and professional. Pricing reference: simple site ₹3k-8k, event site ₹8k-20k, full web app ₹15k-40k+`

async function generateBrief(idea) {
  const res = await fetch(NIM_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NIM_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nvidia/llama-3.1-nemotron-70b-instruct',
      messages: [
        { role: 'system', content: BRIEF_PROMPT },
        { role: 'user',   content: `Client's idea: ${idea}` }
      ],
      temperature: 0.6,
      max_tokens: 500,
    })
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err?.message || 'Nemotron error')
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || 'Could not generate brief.'
}

/* ── Contact info cards ── */
const contacts = [
  { icon: '📧', label: 'Email',     val: 'vatsalgoyal77@gmail.com',          href: 'mailto:vatsalgoyal77@gmail.com',         color: '#7c3aed' },
  { icon: '💼', label: 'LinkedIn',  val: 'linkedin.com/in/vatsalgoyal7',     href: 'https://www.linkedin.com/in/vatsalgoyal7/', color: '#0ea5e9' },
  { icon: '💻', label: 'GitHub',    val: 'github.com/Vatsalgoyal7',          href: 'https://github.com/Vatsalgoyal7',        color: '#a78bfa' },
  { icon: '📸', label: 'Instagram', val: '@vatsalgoyal.7',                   href: 'https://www.instagram.com/vatsalgoyal.7/', color: '#ec4899' },
]

export default function Contact() {
  useReveal()

  const [idea,    setIdea]    = useState('')
  const [brief,   setBrief]   = useState('')
  const [loading, setLoading] = useState(false)
  const [err,     setErr]     = useState('')

  async function handleGenerate() {
    if (!idea.trim()) return
    setLoading(true)
    setBrief('')
    setErr('')
    try {
      const result = await generateBrief(idea)
      setBrief(result)
    } catch (e) {
      setErr('AI generation failed. Try again or contact Vatsal directly!')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const waText = brief
    ? `Hi Vatsal! I came from your portfolio. Here's my project idea:\n\n${idea}\n\nAI-generated brief:\n${brief}`
    : `Hi Vatsal! I came from your portfolio and have a project idea: ${idea}`

  return (
    <div className="inner-page">
      <div className="page-header reveal">
        <Link to="/" className="back-link">← Back</Link>
        <span className="page-eyebrow">Get in touch</span>
        <h1 className="page-title">Let's <em>Build Together</em></h1>
      </div>

      {/* ── Contact cards ── */}
      <div className="contact-cards reveal" style={{ animationDelay: '0.1s' }}>
        {contacts.map(c => (
          <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
             className="contact-card" style={{ '--cc-color': c.color }}>
            <span className="cc-icon">{c.icon}</span>
            <div>
              <div className="cc-label">{c.label}</div>
              <div className="cc-val">{c.val}</div>
            </div>
            <span className="cc-arrow">↗</span>
          </a>
        ))}
      </div>

      {/* ── WhatsApp direct ── */}
      <a
        href={`https://wa.me/${VATSAL_WA}?text=Hi%20Vatsal!%20I%20came%20from%20your%20portfolio.`}
        target="_blank" rel="noopener noreferrer"
        className="wa-direct-btn reveal" style={{ animationDelay: '0.2s' }}
      >
        <span>💬</span>
        <div>
          <div style={{ fontWeight: 700 }}>Chat directly on WhatsApp</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>Usually replies within a few hours</div>
        </div>
        <span>→</span>
      </a>

      {/* ── Nemotron Project Brief Generator ── */}
      <section className="brief-section reveal" style={{ animationDelay: '0.3s' }}>
        <div className="brief-header">
          <div className="brief-badge">🧠 Powered by Nemotron AI</div>
          <h2 className="brief-title">Generate Your Project Brief</h2>
          <p className="brief-sub">
            Describe your idea in plain words — Nemotron AI will create a professional scope, timeline &amp; budget estimate instantly.
          </p>
        </div>

        <div className="brief-input-wrap">
          <textarea
            className="brief-textarea"
            rows={4}
            placeholder="e.g. I need a website for my college's annual sports fest with event registration, schedule page and photo gallery..."
            value={idea}
            onChange={e => setIdea(e.target.value)}
          />
          <button
            className={`brief-btn ${loading ? 'brief-btn-loading' : ''}`}
            onClick={handleGenerate}
            disabled={!idea.trim() || loading}
          >
            {loading ? (
              <><span className="brief-spinner" /> Generating with Nemotron...</>
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
              target="_blank" rel="noopener noreferrer"
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
