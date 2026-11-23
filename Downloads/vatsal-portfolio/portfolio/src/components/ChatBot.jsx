import { useState, useRef, useEffect } from 'react'

/* ── API Keys from .env ── */
const NIM_KEY   = import.meta.env.VITE_NIM_KEY
const VATSAL_WA = import.meta.env.VITE_VATSAL_WA
const NIM_URL   = 'https://integrate.api.nvidia.com/v1/chat/completions'

/* ── System prompt ── */
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
- Hack with UP — 3rd Place + Rs.10,000 at Chandigarh University (Nov 2025)
- RIFT 26 — Semi-finalist, PW Institute of Innovation (Feb 2026)
- YUVAAN AI/ML — IIT Hyderabad (2025)
- DRISHTI-NE — IIM Shillong (2025)

Roles: Sports Main Coordinator IMSEC, Club Head AAVEG, Campus Mantri GeeksforGeeks, IBM AI Intern

Freelance: YES. Colleges, events, businesses.
Pricing: Landing page Rs.3k-8k | Event site Rs.8k-20k | Web app Rs.15k-40k+
Delivery: 1-3 weeks

Rules:
- Keep replies SHORT (3-5 lines max)
- Be enthusiastic, casual, friendly with emojis
- NEVER mention marks, CGPA or grades
- After 2-3 exchanges, suggest WhatsApp connection
- If unsure, say "Best to ask Vatsal directly on WhatsApp!"
- Don't make up info not listed above`

/* ── Call NVIDIA NIM (Llama) ── */
async function callAI(history) {
  const messages = [
    { role: 'system', content: SYSTEM },
    ...history.map(m => ({
      role: m.from === 'user' ? 'user' : 'assistant',
      content: m.text
    }))
  ]

  const res = await fetch(NIM_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NIM_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta/llama-3.3-70b-instruct',
      messages,
      temperature: 0.75,
      max_tokens: 300,
    })
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.error('AI error:', JSON.stringify(err))
    throw new Error(err?.message || `HTTP ${res.status}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || "Let me try again! 😅"
}


const QUICK_BUTTONS = ['Skills 💻', 'Projects 🚀', 'Hackathons 🏆', 'Freelance? 📲']

const VATSAL_WA = import.meta.env.VITE_VATSAL_WA

export default function ChatBot() {
  const [open, setOpen]           = useState(false)
  const [msgs, setMsgs]           = useState([])
  const [input, setInput]         = useState('')
  const [typing, setTyping]       = useState(false)
  const [greeted, setGreeted]     = useState(false)
  const [nudge, setNudge]         = useState(false)
  const [msgCount, setMsgCount]   = useState(0)
  const [error, setError]         = useState('')
  const [enquiry, setEnquiry]     = useState(false)  // show work-together card
  const [enquiryDone, setEnqDone] = useState(false)  // answered
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
    const newCount = msgCount + 1
    setMsgCount(newCount)

    try {
      const reply = await callAI(newHistory)
      setMsgs(prev => [...prev, { from: 'bot', text: reply }])
      // Show enquiry card after 3rd user message
      if (newCount === 3 && !enquiryDone) {
        setTimeout(() => setEnquiry(true), 800)
      }
    } catch (e) {
      setError('Oops! AI hiccup. Try again 🙁')
      console.error(e)
    } finally {
      setTyping(false)
    }
  }

  /* ── Enquiry handlers ── */
  function handleEnquiryYes() {
    setEnquiry(false)
    setEnqDone(true)
    window.open(
      `https://wa.me/${VATSAL_WA}?text=${encodeURIComponent('Hi Vatsal! I came from your portfolio and would love to work together! 🚀')}`,
      '_blank'
    )
    setMsgs(prev => [...prev,
      { from: 'bot', text: 'Amazing! Connecting you to Vatsal on WhatsApp now 🎉 He usually replies within a few hours!' }
    ])
  }

  function handleEnquiryNo() {
    setEnquiry(false)
    setEnqDone(true)
    setMsgs(prev => [...prev,
      { from: 'bot', text: 'No worries! 😊 Feel free to explore more — his projects and hackathon wins are pretty impressive! Ask me anything else.' }
    ])
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const showWA = msgCount >= 4 && !enquiry

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
            <div className="cb-subtitle"><span className="cb-dot" /> Powered by Llama AI</div>
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

        {/* Enquiry card — shown after 3 messages */}
        {enquiry && (
          <div className="cb-enquiry">
            <p className="cb-enquiry-q">🤝 Would you like to work with Vatsal?</p>
            <div className="cb-enquiry-btns">
              <button className="cb-eq-yes" onClick={handleEnquiryYes}>✅ Yes, let's connect!</button>
              <button className="cb-eq-no"  onClick={handleEnquiryNo}>Not now</button>
            </div>
          </div>
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
