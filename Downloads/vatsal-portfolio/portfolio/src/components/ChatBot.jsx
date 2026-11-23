import { useState, useRef, useEffect } from 'react'

/* ── API Keys from .env ── */
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY
const VATSAL_WA  = import.meta.env.VITE_VATSAL_WA

/* ── System prompt — full Vatsal context ── */
const SYSTEM = `You are Vatsal Goyal's personal AI portfolio assistant. Be friendly, short and enthusiastic.

About Vatsal:
- CSE student at IMSEC (IMS Engineering College), Ghaziabad, 2nd year
- Full-stack developer, UI designer, freelancer
- Email: vatsalgoyal77@gmail.com | WhatsApp: +91 7452027691
- GitHub: github.com/Vatsalgoyal7 | LinkedIn: linkedin.com/in/vatsal-goyal-422b512a9

Skills: React, HTML, CSS, JavaScript, Node.js, Python, MongoDB, Firebase, MySQL, Supabase, Vercel, Cloudflare

Projects:
1. Chakravyuh 2K26 — sports fest website, React+Firebase, LIVE at chakravyuh2k26.vercel.app
2. Digital Legacy Vault — digital inheritance system, Next.js+MongoDB (In Progress)
3. Student Performance Predictor — ML model, Python+Scikit-learn (IBM Internship)

Hackathons:
- 🏆 Hack with UP — 3rd Place + ₹10,000 at Chandigarh University (Nov 2025)
- ⚡ RIFT '26 — Semi-finalist, PW Institute of Innovation (Feb 2026)
- 🤖 YUVAAN AI/ML — IIT Hyderabad (2025)
- 🌐 DRISHTI-NE — IIM Shillong (2025)

Roles: Sports Main Coordinator IMSEC, Club Head AAVEG, Campus Mantri GeeksforGeeks, IBM AI Intern

Freelance availability: YES. Builds for colleges, events, businesses.
Pricing: Landing page ₹3k-8k | Event site ₹8k-20k | Web app ₹15k-40k+
Delivery: 1-3 weeks

Rules:
- Keep replies SHORT (3-5 lines max unless user asks for detail)
- Be enthusiastic, casual, friendly — like a cool assistant
- Use emojis occasionally
- NEVER mention marks, CGPA or grades
- After 2-3 exchanges, suggest WhatsApp connection
- If unsure, say "Best to ask Vatsal directly on WhatsApp!"
- Don't make up info not listed above`

/* ── Call Gemini API ── */
async function callGemini(history) {
  // Inject system prompt as first turn (works with all key formats)
  const systemTurn = [
    { role: 'user',  parts: [{ text: `[SYSTEM INSTRUCTIONS]\n${SYSTEM}\n[/SYSTEM INSTRUCTIONS]\n\nAcknowledge you understand.` }] },
    { role: 'model', parts: [{ text: "Got it! I'm Vatsal's AI assistant and I know everything about him. Ready to help! 🚀" }] },
  ]

  const userContents = history.map(m => ({
    role: m.from === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }))

  const body = {
    contents: [...systemTurn, ...userContents],
    generationConfig: {
      temperature: 0.85,
      maxOutputTokens: 300,
      topP: 0.95,
    }
  }

  // Try with key as query param first (standard), fallback to Bearer header
  const urlWithKey = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`

  const res = await fetch(urlWithKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.error('Gemini error:', err)
    throw new Error(err?.error?.message || `HTTP ${res.status}`)
  }

  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm, I had a hiccup. Try again! 😅"

}

const QUICK_BUTTONS = ['Skills 💻', 'Projects 🚀', 'Hackathons 🏆', 'Freelance? 📲']

export default function ChatBot() {
  const [open, setOpen]         = useState(false)
  const [msgs, setMsgs]         = useState([])
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const [greeted, setGreeted]   = useState(false)
  const [nudge, setNudge]       = useState(false)
  const [msgCount, setMsgCount] = useState(0)
  const [error, setError]       = useState('')
  const endRef = useRef(null)

  /* ── Nudge after 4s ── */
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 4000)
    return () => clearTimeout(t)
  }, [])

  /* ── Animated greeting on first open ── */
  useEffect(() => {
    if (!open || greeted) return
    setGreeted(true)
    setNudge(false)
    setTyping(true)

    const sequence = [
      { delay: 600,  text: "Hey! 👋 Welcome to Vatsal's portfolio!" },
      { delay: 1600, text: "I'm his AI assistant, powered by Gemini 🤖✨" },
      { delay: 2800, text: "Ask me anything — his **skills**, **projects**, **hackathon wins**, or how to **hire him**! 🚀\n\nWhat's on your mind?" },
    ]

    sequence.forEach(({ delay, text }, i) => {
      setTimeout(() => {
        setMsgs(prev => [...prev, { from: 'bot', text }])
        setTyping(i < sequence.length - 1)
      }, delay)
    })
  }, [open, greeted])

  /* ── Scroll to bottom ── */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  /* ── Send message ── */
  async function sendMessage(text) {
    const userMsg = (text || input).trim()
    if (!userMsg || typing) return
    setInput('')
    setError('')

    const newHistory = [...msgs, { from: 'user', text: userMsg }]
    setMsgs(newHistory)
    setTyping(true)
    setMsgCount(c => c + 1)

    try {
      const reply = await callGemini(newHistory)
      setMsgs(prev => [...prev, { from: 'bot', text: reply }])
    } catch (e) {
      setError('Oops! AI hiccup. Try again 🙁')
      console.error(e)
    } finally {
      setTyping(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const showWA = msgCount >= 2

  return (
    <>
      {/* ── Nudge bubble ── */}
      {nudge && !open && (
        <div className="cb-nudge" onClick={() => setOpen(true)}>
          <span className="cb-nudge-wave">👋</span>
          <span>Psst! Ask me about Vatsal!</span>
          <button className="cb-nudge-close" onClick={e => { e.stopPropagation(); setNudge(false) }}>✕</button>
        </div>
      )}

      {/* ── FAB ── */}
      <button
        className={`chatbot-fab ${open ? 'fab-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
      >
        {open ? '✕' : '💬'}
        {!open && <span className="fab-ping" />}
      </button>

      {/* ── Chat panel ── */}
      <div className={`chatbot-panel ${open ? 'panel-open' : ''}`} role="dialog" aria-label="Vatsal's assistant">

        {/* Header */}
        <div className="cb-header">
          <div className="cb-avatar">🤖</div>
          <div>
            <div className="cb-title">Vatsal's AI Assistant</div>
            <div className="cb-subtitle"><span className="cb-dot" /> Powered by Gemini</div>
          </div>
          <button className="cb-close" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Messages */}
        <div className="cb-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`cb-msg ${m.from === 'user' ? 'msg-user' : 'msg-bot'}`}>
              <div className="cb-bubble" dangerouslySetInnerHTML={{
                __html: m.text
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n/g, '<br/>')
              }} />
            </div>
          ))}

          {typing && (
            <div className="cb-msg msg-bot">
              <div className="cb-bubble cb-typing"><span /><span /><span /></div>
            </div>
          )}

          {error && <div className="cb-error">{error}</div>}
          <div ref={endRef} />
        </div>

        {/* Quick buttons */}
        <div className="cb-quick">
          {QUICK_BUTTONS.map(btn => (
            <button key={btn} className="cb-quick-btn" onClick={() => sendMessage(btn)} disabled={typing}>
              {btn}
            </button>
          ))}
        </div>

        {/* WhatsApp CTA */}
        {showWA && (
          <a
            href={`https://wa.me/${VATSAL_WA}?text=Hi%20Vatsal!%20I%20came%20from%20your%20portfolio%20and%20would%20love%20to%20connect.`}
            target="_blank"
            rel="noopener noreferrer"
            className="cb-wa-btn"
          >
            <span>💬</span> Chat on WhatsApp
          </a>
        )}

        {/* Input */}
        <div className="cb-input-row">
          <input
            className="cb-input"
            placeholder="Ask me anything about Vatsal..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={typing}
          />
          <button className="cb-send" onClick={() => sendMessage()} disabled={!input.trim() || typing}>→</button>
        </div>
      </div>
    </>
  )
}
