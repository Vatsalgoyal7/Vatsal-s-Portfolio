import { useState, useRef, useEffect } from 'react'

/* ── API Keys from .env with fallback ── */
const NIM_KEY   = import.meta.env.VITE_NIM_KEY
const VATSAL_WA = import.meta.env.VITE_VATSAL_WA || '917452027691'
const NIM_URL   = 'https://integrate.api.nvidia.com/v1/chat/completions'

const RESUME_URL = 'https://drive.google.com/file/d/17Iq6gPvLKAHPI6dqbPmC9Z8zJX1TQ0j6/view?usp=drivesdk'

/* ── System prompt ── */
const SYSTEM = `You are Vatsal Goyal's personal AI portfolio assistant. Be friendly, short and enthusiastic.

About Vatsal:
- 3rd year B.Tech CSE student at IMSEC (IMS Engineering College, Ghaziabad, AKTU)
- Full-stack developer, UI designer, freelancer, startup founder
- Email: vatsalgoyal77@gmail.com | WhatsApp: +91 7452027691
- GitHub: github.com/Vatsalgoyal7 | LinkedIn: linkedin.com/in/vatsal-goyal-422b512a9
- Resume: ${RESUME_URL}

Skills: React, Next.js, TypeScript, JavaScript, Node.js, Python, Django, MongoDB, Firebase, SQL, Supabase, Vercel, Cloudflare, Ethereum/Blockchain, Gemini API, Claude API, OpenAI API

Projects:
1. Chakravyuh 2K26 — AKTU sports fest platform, React+Firebase, LIVE at chakravyuh2k26.vercel.app
2. TrueChain — Blockchain food provenance B2B SaaS (Founder), won ₹10k at HackWithUP, pitched at IIT Delhi
3. VitalGeneAI — Pharmacogenomic AI system, Gemini API, RIFT '26 Hackathon Rank 6
4. Digital Legacy Vault — digital inheritance system, Next.js+MongoDB (In Progress)

Hackathons (8+):
- HackWithUttarPradesh 2025 — 3rd Place + Rs.10,000 (21,000+ registrations, Chandigarh University)
- RIFT '26 — Semi-finalist Rank 6, Healthcare Track (8,000+ registrations, PW Institute)
- Wizards 2.0 — 3rd Place, IMSEC x HackerRank
- IIT Delhi Incubator Summit — TrueChain pitched (Jan 2026)

Roles:
- Sports Main Coordinator & Club Head — IMSEC Sports Society (2026-Present)
- Google Student Ambassador — GID: 7505 (2026-Present)
- Campus Mantri — GeeksforGeeks, IMSEC (Jan-Jun 2026)
- Generative AI Intern — AKTU-IBM PBEL Program (Feb-May 2026)

Rules: Keep replies SHORT (3-5 lines max). Be casual, friendly with emojis.`

/* ── Instant Local Knowledge Base (Guaranteed zero-failure answers) ── */
function getLocalAnswer(query) {
  const q = query.toLowerCase().trim()

  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('framework')) {
    return `💻 **Vatsal's Tech Stack & Capabilities:**\n\n• **Frontend:** React.js, Next.js, TypeScript, Tailwind CSS, JavaScript\n• **Backend & DB:** Node.js, Express, Python, Django, MongoDB, Firebase, SQL, Supabase\n• **Cloud & Tools:** Vercel, Cloudflare, Git/GitHub, REST APIs\n• **AI & Web3:** Google Gemini API, Claude API, OpenAI API, Solidity, Ethereum\n\nHe loves building full-stack products from idea to production! 🚀`
  }

  if (q.includes('project') || q.includes('ship') || q.includes('built') || q.includes('truechain') || q.includes('chakravyuh') || q.includes('vitalgene') || q.includes('work')) {
    return `🚀 **Key Projects Shipped by Vatsal:**\n\n1. **Chakravyuh 2K26** — AKTU sports fest platform with registration, live schedule & admin portal (React + Firebase).\n2. **TrueChain** — Blockchain food supply chain provenance system (Won 3rd Place at HackWithUP, incubated at IIT Delhi).\n3. **VitalGeneAI** — Pharmacogenomic AI decision tool using Gemini API (Rank 6 at RIFT '26).\n4. **Digital Legacy Vault** — Encrypted inheritance asset transfer system.\n\nCheck out the **Projects** page for live links! 🌐`
  }

  if (q.includes('hackathon') || q.includes('win') || q.includes('prize') || q.includes('award') || q.includes('rank') || q.includes('competition') || q.includes('iit') || q.includes('chandigarh')) {
    return `🏆 **Hackathons & National Wins:**\n\n• **HackWithUttarPradesh 2025** — 3rd Position & ₹10,000 prize among 21,000+ teams (Chandigarh University)!\n• **RIFT '26** — Semi-Finalist, Rank 6 in Healthcare Track among 8,000+ registrations.\n• **IIT Delhi eDC INCon 2026** — Pitched TrueChain startup at the incubator summit.\n• **Wizards 2.0** — 3rd Place, IMSEC x HackerRank.\n\nAll verified certificates and photos are visible on the **Gallery** page! 📜`
  }

  if (q.includes('resume') || q.includes('cv') || q.includes('download') || q.includes('drive') || q.includes('pdf')) {
    return `📄 **Vatsal Goyal's Official Resume:**\n\nYou can view and download his verified resume here:\n\n👉 [**Open Resume on Google Drive**](${RESUME_URL})\n\nIt details all his technical skills, hackathon wins, startup experience, and leadership roles! 🎯`
  }

  if (q.includes('freelance') || q.includes('hire') || q.includes('cost') || q.includes('price') || q.includes('rate') || q.includes('charge') || q.includes('available')) {
    return `💼 **Freelance Availability & Services:**\n\nYes! Vatsal is actively taking freelance projects for colleges, fests, and businesses:\n\n• **Landing Pages:** ₹3k – ₹8k\n• **Event/Fest Portals (with Auth & Admin):** ₹8k – ₹20k\n• **Full-Stack SaaS / Web Apps:** ₹15k – ₹40k+\n• **Delivery:** 1–3 weeks with modern dark UI & fast performance.\n\nTap **Chat on WhatsApp** below to discuss your project directly! 📲`
  }

  if (q.includes('contact') || q.includes('email') || q.includes('whatsapp') || q.includes('phone') || q.includes('reach')) {
    return `📬 **Get in Touch with Vatsal:**\n\n• **Email:** vatsalgoyal77@gmail.com\n• **WhatsApp:** +91 7452027691\n• **LinkedIn:** [linkedin.com/in/vatsal-goyal-422b512a9](https://www.linkedin.com/in/vatsal-goyal-422b512a9/)\n• **GitHub:** [github.com/Vatsalgoyal7](https://github.com/Vatsalgoyal7)\n\nHe responds fastest on WhatsApp! Say hi anytime! 👋`
  }

  if (q.includes('who') || q.includes('about') || q.includes('background') || q.includes('college') || q.includes('education') || q.includes('imsec')) {
    return `👤 **About Vatsal Goyal:**\n\nVatsal is a 3rd year B.Tech Computer Science student at **IMS Engineering College (AKTU)**, Ghaziabad. He is a full-stack developer, founder of **TrueChain**, official **Google Student Ambassador** (GID: 7505), and **Sports Main Coordinator & Club Head** at IMSEC.\n\nHe loves building high-impact products and competing in national hackathons! 🚀`
  }

  return null
}

/* ── Call NVIDIA NIM ── */
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
      temperature: 0.7,
      max_tokens: 280,
    })
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || `HTTP ${res.status}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || null
}

const QUICK_BUTTONS = ['Skills 💻', 'Projects 🚀', 'Hackathons 🏆', 'Resume 📄', 'Freelance? 📲']

export default function ChatBot() {
  const [open, setOpen]           = useState(false)
  const [msgs, setMsgs]           = useState([])
  const [input, setInput]         = useState('')
  const [typing, setTyping]       = useState(false)
  const [greeted, setGreeted]     = useState(false)
  const [nudge, setNudge]         = useState(false)
  const [msgCount, setMsgCount]   = useState(0)
  const [enquiry, setEnquiry]     = useState(false)
  const [enquiryDone, setEnqDone] = useState(false)
  const endRef = useRef(null)

  /* ── Nudge after 4s ── */
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 4000)
    return () => clearTimeout(t)
  }, [])

  /* ── Greeting on first open ── */
  useEffect(() => {
    if (!open || greeted) return
    setGreeted(true)
    setNudge(false)
    setTyping(true)

    const sequence = [
      { delay: 400,  text: "Hey! 👋 Welcome to Vatsal's portfolio!" },
      { delay: 1200, text: "I'm his AI assistant. Ask me anything — his **skills**, **projects**, **hackathon wins**, **resume**, or how to **hire him**! 🚀\n\nWhat would you like to know?" },
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

    const newHistory = [...msgs, { from: 'user', text: userMsg }]
    setMsgs(newHistory)
    setTyping(true)
    const newCount = msgCount + 1
    setMsgCount(newCount)

    // Check instant local knowledge base first (bulletproof)
    const localMatch = getLocalAnswer(userMsg)
    if (localMatch) {
      setTimeout(() => {
        setMsgs(prev => [...prev, { from: 'bot', text: localMatch }])
        setTyping(false)
        if (newCount >= 3 && !enquiryDone) {
          setTimeout(() => setEnquiry(true), 800)
        }
      }, 350)
      return
    }

    // Try external API if configured, with graceful fallback
    try {
      if (!NIM_KEY) throw new Error('No NIM key configured')
      const reply = await callAI(newHistory)
      if (reply) {
        setMsgs(prev => [...prev, { from: 'bot', text: reply }])
      } else {
        throw new Error('Empty reply')
      }
    } catch {
      // Clean, helpful fallback (never shows an ugly error)
      setMsgs(prev => [...prev, {
        from: 'bot',
        text: `Vatsal is a 3rd year B.Tech CSE student, full-stack developer, and founder of **TrueChain**! 🚀\n\nYou can explore his **Projects**, **Hackathons**, or [**View His Resume**](${RESUME_URL}).\n\nWant to discuss a project or collaboration? Tap **Chat on WhatsApp** below to talk with him directly!`
      }])
    } finally {
      setTyping(false)
      if (newCount >= 3 && !enquiryDone) {
        setTimeout(() => setEnquiry(true), 800)
      }
    }
  }

  function handleEnquiryYes() {
    setEnquiry(false)
    setEnqDone(true)
    window.open(
      `https://wa.me/${VATSAL_WA}?text=${encodeURIComponent('Hi Vatsal! I came from your portfolio and would love to work together! 🚀')}`,
      '_blank'
    )
    setMsgs(prev => [...prev,
      { from: 'bot', text: 'Amazing! Connecting you to Vatsal on WhatsApp now 🎉 He usually replies promptly!' }
    ])
  }

  function handleEnquiryNo() {
    setEnquiry(false)
    setEnqDone(true)
    setMsgs(prev => [...prev,
      { from: 'bot', text: 'No problem at all! Feel free to explore his projects and hackathons above 🌟' }
    ])
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const showWA = msgCount >= 1

  return (
    <>
      {/* Nudge bubble */}
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

      {/* Launcher Button */}
      <button
        className={`cb-launcher ${open ? 'active' : ''}`}
        onClick={() => { setOpen(prev => !prev); setNudge(false) }}
        aria-label={open ? 'Close chat' : 'Open AI chat assistant'}
        title="Chat with Vatsal's AI Assistant"
      >
        <span className="cb-icon-chat">💬</span>
        <span className="cb-icon-close">✕</span>
        <span className="cb-online-dot" />
      </button>

      {/* Chat Window */}
      <div className={`cb-window ${open ? 'open' : ''}`} role="dialog" aria-label="AI Portfolio Assistant">
        {/* Header */}
        <div className="cb-header">
          <div className="cb-header-avatar">🤖</div>
          <div className="cb-header-info">
            <span className="cb-header-title">Vatsal's AI Assistant</span>
            <span className="cb-header-sub">● Online · Instant Portfolio Answers</span>
          </div>
          <button className="cb-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
        </div>

        {/* Messages */}
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
            placeholder="Ask anything about Vatsal or his resume..."
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
