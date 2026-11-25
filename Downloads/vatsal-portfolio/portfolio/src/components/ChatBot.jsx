import { useState, useRef, useEffect } from 'react'

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY
const VATSAL_WA  = import.meta.env.VITE_VATSAL_WA || '917452027691'
const RESUME_URL = 'https://drive.google.com/file/d/17Iq6gPvLKAHPI6dqbPmC9Z8zJX1TQ0j6/view?usp=drivesdk'

const SYSTEM_PROMPT = `You are Vatsal Goyal's personal portfolio AI assistant. Be friendly, polite, short and professional with emojis.
About Vatsal:
- Full-stack developer (React, Next.js, TypeScript, Node.js, Tailwind CSS)
- 3rd year B.Tech CSE student at IMSEC Ghaziabad (AKTU)
- Founder of TrueChain (Won 3rd Place at HackWithUP among 21,000+ registrations, pitched at IIT Delhi)
- Lead developer of Chakravyuh 2K26 sports portal
- VitalGeneAI (Rank 6 Semi-Finalist at RIFT '26)
- Google Student Ambassador (GID: 7505)
- Open and available for freelance web & mobile development projects
- WhatsApp: +91 7452027691 | Email: vatsalgoyal77@gmail.com
- Resume: ${RESUME_URL}
Rules: Keep responses short (2 to 4 concise sentences). If asked about hiring or custom projects, enthusiastically invite them to chat directly on WhatsApp.`

/* ── Call Live Gemini 3.5 Flash-Lite API ── */
async function callGemini(history) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_KEY}`
  
  const contents = [
    {
      role: 'user',
      parts: [{ text: `System Instruction:\n${SYSTEM_PROMPT}\n\nUser Question:\n${history[history.length - 1].text}` }]
    }
  ]

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 6000)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
    return reply || null
  } catch (err) {
    clearTimeout(timeoutId)
    return null
  }
}

/* ── Bulletproof Fallback Knowledge Base ── */
function getSmartFallback(query) {
  const q = query.toLowerCase().trim()

  if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
    return `💻 **Vatsal's Tech Stack:**\n\n• **Frontend:** React.js, Next.js, TypeScript, Tailwind CSS, JavaScript\n• **Backend & DB:** Node.js, Express, Python, MongoDB, Firebase, SQL, Supabase\n• **Tools & AI:** Git/GitHub, Vercel, Cloudflare, Gemini API\n\nHe specializes in building clean, fast web & mobile products from design to production! 🚀`
  }

  if (q.includes('project') || q.includes('ship') || q.includes('built') || q.includes('work') || q.includes('truechain') || q.includes('chakravyuh')) {
    return `🚀 **Key Projects by Vatsal:**\n\n1. **Chakravyuh 2K26** — Inter-college sports festival portal with real-time registrations.\n2. **TrueChain** — Blockchain food provenance platform (3rd Place @ HackWithUP, pitched at IIT Delhi).\n3. **VitalGeneAI** — Pharmacogenomic risk predictor powered by Gemini API.\n\nCheck the **Projects** page for live links! 🌐`
  }

  if (q.includes('hackathon') || q.includes('win') || q.includes('prize') || q.includes('award')) {
    return `🏆 **Hackathons & Recognition:**\n\n• **HackWithUttarPradesh 2025** — 3rd Position & ₹10,000 cash prize among 21,000+ teams!\n• **RIFT '26** — Semi-Finalist, Rank 6 in Healthcare Track among 8,000+ registrations.\n• **IIT Delhi Incubation Summit** — Pitched TrueChain startup at eDC INCon 2026.\n\nAll verified certificates are visible on the **Gallery** page! 🎖️`
  }

  if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
    return `📄 **Vatsal Goyal's Resume:**\n\nYou can view and download his complete verified resume here:\n\n👉 [**Open Official Resume (Google Drive)**](${RESUME_URL})`
  }

  if (q.includes('freelance') || q.includes('hire') || q.includes('collab') || q.includes('contact')) {
    return `📲 **Hire Vatsal for Freelance:**\n\nVatsal is currently **Open for freelance web & mobile development** projects! Fast turnaround, clean code, and reliable communication.\n\n👇 **Tap the WhatsApp button below** to discuss your project directly with him!`
  }

  return `Vatsal is a full-stack developer & builder specializing in React, Next.js, and Mobile apps. 💡\n\nYou can explore his **Projects** and **Hackathons** in the menu, or view his [**Resume**](${RESUME_URL}).\n\nTo discuss a project or work together, tap **Chat on WhatsApp** below to message Vatsal directly!`
}

const QUICK_BUTTONS = ['Skills 💻', 'Projects 🚀', 'Hackathons 🏆', 'Resume 📄', 'Freelance? 📲']

export default function ChatBot() {
  const [open, setOpen]             = useState(false)
  const [msgs, setMsgs]             = useState([])
  const [input, setInput]           = useState('')
  const [typing, setTyping]         = useState(false)
  const [greeted, setGreeted]       = useState(false)
  const [nudge, setNudge]           = useState(false)
  const [msgCount, setMsgCount]     = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 4000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!open || greeted) return
    setGreeted(true)
    setNudge(false)
    setTyping(true)

    const sequence = [
      { delay: 300, text: "Hey! 👋 Welcome to Vatsal's portfolio!" },
      { delay: 900, text: "I'm his AI assistant. Ask me anything — his **skills**, **projects**, **hackathons**, **resume**, or how to **hire him**! 🚀\n\nTap a quick option below to get started:" },
    ]

    sequence.forEach(({ delay, text }, i) => {
      setTimeout(() => {
        setMsgs(prev => [...prev, { from: 'bot', text }])
        setTyping(i < sequence.length - 1)
      }, delay)
    })
  }, [open, greeted])

  useEffect(() => {
    if (open && endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [msgs, typing, open])

  async function sendMessage(text) {
    const userMsg = (text || input).trim()
    if (!userMsg || typing) return
    setInput('')

    const nextCount = msgCount + 1
    setMsgCount(nextCount)

    const newHistory = [...msgs, { from: 'user', text: userMsg }]
    setMsgs(newHistory)
    setTyping(true)

    // Try live Gemini 3.5 Flash-Lite first
    let reply = await callGemini(newHistory)

    // Seamless instant fallback if API takes too long or fails
    if (!reply) {
      reply = getSmartFallback(userMsg)
    }

    setMsgs(prev => [...prev, { from: 'bot', text: reply }])
    setTyping(false)

    // Trigger WhatsApp card after 3 messages or freelance intent
    if (nextCount >= 3 || userMsg.toLowerCase().includes('freelance') || userMsg.toLowerCase().includes('hire')) {
      setTimeout(() => setShowPrompt(true), 600)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {!open && nudge && (
        <aside
          className="cb-nudge"
          onClick={() => { setOpen(true); setNudge(false) }}
          role="status"
          aria-label="Chat assistant available"
        >
          <span>👋 Psst! Ask me about Vatsal!</span>
          <button
            className="cb-nudge-close"
            onClick={e => { e.stopPropagation(); setNudge(false) }}
            aria-label="Dismiss message"
          >
            ✕
          </button>
        </aside>
      )}

      <button
        className={`chatbot-fab ${open ? 'fab-open' : ''}`}
        onClick={() => { setOpen(prev => !prev); setNudge(false) }}
        aria-label={open ? 'Close chat' : 'Open AI chat assistant'}
        title="Chat with Vatsal's Assistant"
      >
        {open ? '✕' : '💬'}
        {!open && <span className="fab-ping" />}
      </button>

      <div className={`chatbot-panel ${open ? 'panel-open' : ''}`} role="dialog" aria-label="AI Portfolio Assistant">
        <div className="cb-header">
          <div className="cb-avatar">🤖</div>
          <div className="cb-header-info">
            <div className="cb-title">Vatsal's AI Assistant</div>
            <div className="cb-subtitle">
              <span className="cb-dot" /> Online · Powered by Gemini
            </div>
          </div>
          <button className="cb-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
        </div>

        <div className="cb-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`cb-msg ${m.from === 'user' ? 'msg-user' : 'msg-bot'}`}>
              <div
                className="cb-bubble"
                dangerouslySetInnerHTML={{
                  __html: m.text
                    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;text-decoration:underline;font-weight:600;">$1 ↗</a>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br/>')
                }}
              />
            </div>
          ))}

          {typing && (
            <div className="cb-msg msg-bot">
              <div className="cb-bubble cb-typing"><span /><span /><span /></div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        <div className="cb-quick">
          {QUICK_BUTTONS.map(btn => (
            <button key={btn} className="cb-quick-btn" onClick={() => sendMessage(btn)} disabled={typing}>
              {btn}
            </button>
          ))}
        </div>

        {showPrompt && (
          <div style={{
            margin: '8px 12px',
            padding: '10px 14px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.12), rgba(16, 185, 129, 0.06))',
            border: '1px solid rgba(37, 211, 102, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <p style={{ fontSize: '12.5px', color: '#e2e8f0', margin: 0, lineHeight: 1.4 }}>
              💡 <strong>Aapko Vatsal se further direct baat karni hai?</strong> Tap below to connect on WhatsApp:
            </p>
            <a
              href={`https://wa.me/${VATSAL_WA}?text=${encodeURIComponent('Hi Vatsal! I came from your portfolio and would like to discuss a project with you.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '99px',
                background: '#25D366',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '13px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
              }}
            >
              <span>💬</span> Chat Directly on WhatsApp
            </a>
          </div>
        )}

        <a
          href={`https://wa.me/${VATSAL_WA}?text=${encodeURIComponent('Hi Vatsal! I came from your portfolio and would love to connect.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cb-wa-btn"
        >
          <span>💬</span> Chat on WhatsApp (+91 7452027691)
        </a>

        <div className="cb-input-row">
          <input
            className="cb-input"
            placeholder="Ask anything about Vatsal or his work..."
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
