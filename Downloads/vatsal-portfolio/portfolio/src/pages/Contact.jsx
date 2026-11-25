import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY
const VATSAL_WA  = import.meta.env.VITE_VATSAL_WA || '917452027691'

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

Keep it concise, realistic and professional. Pricing reference: simple site ₹4k-8k, event site ₹8k-20k, full web app ₹15k-40k+`

async function generateBrief(idea) {
  const clean = idea.trim()
  const lower = clean.toLowerCase()

  // Smart Validation: Reject greetings, test strings, or overly vague 1-word inputs
  const greetings = ['hi', 'hii', 'hiii', 'hello', 'hey', 'heyy', 'test', 'testing', 'yo', 'sup', 'ok', 'okay', 'bro', 'namaste']
  if (greetings.includes(lower) || clean.length < 12 || !clean.includes(' ')) {
    throw new Error('GREETING_OR_SHORT')
  }

  if (GEMINI_KEY) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_KEY}`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${BRIEF_PROMPT}\n\nClient's Idea: ${clean}` }] }]
        })
      })
      if (res.ok) {
        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) return text
      }
    } catch {}
  }

  // Domain-aware Smart Scoper Fallback
  let projectTitle = 'Custom Web Application'
  let features = ['Responsive modern UI/UX design', 'Fast cloud hosting & SEO setup', 'Contact & WhatsApp integration']
  let stack = 'React.js, Tailwind CSS, Node.js, Vercel'
  let timeline = '1–2 weeks'
  let estimate = '₹8,000 – ₹18,000'

  if (lower.includes('ecommerce') || lower.includes('shop') || lower.includes('store') || lower.includes('cart')) {
    projectTitle = 'E-Commerce Storefront & Order Platform'
    features = ['Product catalog, search & filtering', 'Shopping cart + Razorpay/Stripe payment gateway', 'Admin dashboard for inventory & order tracking']
    stack = 'Next.js, Tailwind CSS, Node.js, MongoDB/Firebase, Razorpay'
    timeline = '3–4 weeks'
    estimate = '₹18,000 – ₹35,000'
  } else if (lower.includes('app') || lower.includes('mobile') || lower.includes('android') || lower.includes('ios')) {
    projectTitle = 'Cross-Platform Mobile & PWA App'
    features = ['Smooth native-like mobile experience (iOS & Android)', 'Push notifications & offline PWA support', 'Real-time database sync & user authentication']
    stack = 'React Native / PWA, Firebase, Node.js'
    timeline = '3–5 weeks'
    estimate = '₹20,000 – ₹45,000'
  } else if (lower.includes('ai') || lower.includes('bot') || lower.includes('gpt') || lower.includes('gemini')) {
    projectTitle = 'AI-Powered Intelligent Web Platform'
    features = ['Custom AI integration (Gemini / LLM workflows)', 'Interactive real-time chat & prompt interface', 'User session history & analytics dashboard']
    stack = 'Next.js, Gemini API, Node.js, PostgreSQL/Firebase'
    timeline = '2–4 weeks'
    estimate = '₹18,000 – ₹40,000'
  } else if (lower.includes('college') || lower.includes('event') || lower.includes('fest') || lower.includes('club')) {
    projectTitle = 'Event Management & Registration Portal'
    features = ['Multi-event registration & digital pass generation', 'Live schedule, leaderboards & photo gallery', 'Admin panel with data export & notifications']
    stack = 'React.js, Firebase Firestore, Tailwind CSS, Vercel'
    timeline = '1–2 weeks'
    estimate = '₹10,000 – ₹22,000'
  }

  return `📋 PROJECT BRIEF
━━━━━━━━━━━━━━━
🎯 Project: ${projectTitle}
📝 Summary: A tailored digital solution designed around your requirement: "${clean.slice(0, 80)}${clean.length > 80 ? '...' : ''}". Built for speed, scalability, and user conversion.
✨ Key Features:
  • ${features[0]}
  • ${features[1]}
  • ${features[2]}
⏱️ Timeline: ${timeline}
💻 Tech Stack: ${stack}
💰 Estimate: ${estimate}
📌 Next Step: Connect with Vatsal on WhatsApp to finalise!`
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

  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [email,   setEmail]   = useState('')
  const [idea,    setIdea]    = useState('')
  const [brief,   setBrief]   = useState('')
  const [loading, setLoading] = useState(false)
  const [err,     setErr]     = useState('')

  async function handleGenerate() {
    if (!name.trim() || !phone.trim()) {
      setErr('⚠️ Please enter your Name and WhatsApp / Phone number so Vatsal can contact you!')
      return
    }
    if (!idea.trim()) return
    setLoading(true)
    setBrief('')
    setErr('')
    try {
      const result = await generateBrief(idea)
      setBrief(result)

      // Auto-save lead with client details for CRM
      try {
        const existing = JSON.parse(localStorage.getItem('vatsal_client_leads') || '[]')
        const isSpam = idea.trim().length < 12
        const newLead = {
          id: Date.now(),
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || 'Not provided',
          text: idea.trim(),
          timestamp: new Date().toLocaleString(),
          ai: {
            isSpam,
            tag: isSpam ? 'Spam / Low Quality' : 'Genuine Opportunity',
            summary: isSpam ? 'Short test query' : `Project scope for: "${idea.slice(0, 45)}"`,
            budget: isSpam ? 'N/A' : '₹12,000 – ₹30,000',
            timeline: isSpam ? 'N/A' : '2–4 weeks',
            priority: isSpam ? 'Low' : 'High 🔥'
          }
        }
        localStorage.setItem('vatsal_client_leads', JSON.stringify([newLead, ...existing]))
      } catch {}
    } catch (e) {
      if (e.message === 'GREETING_OR_SHORT') {
        setErr('👋 Hey! Please describe your actual project idea in 1–2 sentences (e.g. "I need an e-commerce website with payment integration") so AI can generate an accurate scope & estimate.')
      } else {
        setErr('AI generation failed. Try again or contact Vatsal directly!')
      }
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '10px', width: '100%' }}>
            <input
              type="text"
              placeholder="Your Name *"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <input
              type="tel"
              placeholder="WhatsApp / Phone *"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>
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
            disabled={!idea.trim() || !name.trim() || !phone.trim() || loading}
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
