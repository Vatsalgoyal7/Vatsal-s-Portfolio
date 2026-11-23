import { useState, useRef, useEffect } from 'react'

/* ── Vatsal's knowledge base ── */
const VATSAL_WA = '917452027691' // Vatsal's WhatsApp

const KB = {
  greet: [
    "Hi there! 👋 I'm Vatsal's AI assistant. Ask me about his skills, projects, freelance availability — or just say hi!",
  ],
  skills: [
    "Vatsal is skilled in:\n• **Frontend**: React, HTML, CSS, JavaScript\n• **Backend**: Node.js, Python\n• **Databases**: MongoDB, Firebase, MySQL\n• **Deploy**: Vercel, Cloudflare\n• **AI Tools**: Cursor, GitHub Copilot\n\nWant to know about his projects? 🚀",
  ],
  projects: [
    "Here are Vatsal's key projects:\n\n🚀 **Chakravyuh 2K26** — Official sports fest website (React + Firebase) → Live!\n\n🔐 **Digital Legacy Vault** — Secure digital inheritance system (Next.js + MongoDB) — In Progress\n\n🤖 **Student Performance Predictor** — ML regression model (Python + Scikit-learn)\n\nWant to hire him for a project? 👇",
  ],
  hackathons: [
    "Vatsal's hackathon journey:\n\n🏆 **Hack with Uttar Pradesh** — 3rd Place & ₹10,000 prize at Chandigarh University\n\n⚡ **RIFT '26** — Semi-finalist at PW Institute of Innovation\n\n🤖 **YUVAAN AI/ML** — Competed at IIT Hyderabad\n\n🌐 **DRISHTI-NE** — National level at IIM Shillong\n\nPretty impressive for a 2nd year student! 💪",
  ],
  about: [
    "Vatsal Goyal is a **CS student at IMSEC, Ghaziabad** passionate about building real products.\n\n👤 He's also:\n• Sports Main Coordinator @ IMSEC\n• Club Head, AAVEG Sports Society\n• Campus Mantri @ GeeksforGeeks\n• Ex IBM SkillsBuild AI Intern\n\nHe combines tech skills with leadership. Want to work with him? 🤝",
  ],
  freelance: [
    "Yes! Vatsal is **actively available for freelance** work! 🟢\n\nHe builds for:\n• 🏫 College events & fests\n• 🏢 Businesses & startups\n• 🎉 Event websites\n• 📱 Web apps & dashboards\n\nTypically delivers in **1-3 weeks** depending on scope. Want to connect on WhatsApp to discuss? 📲",
  ],
  hire: [
    "Great choice! Vatsal loves working on real projects. 💼\n\nHe's especially good at:\n✅ College fest/event websites\n✅ Business landing pages\n✅ Full-stack web apps\n✅ Firebase/Supabase integrations\n\nShall I connect you on WhatsApp directly? It's the fastest way to get a quote! 📲",
  ],
  contact: [
    "You can reach Vatsal via:\n📧 vatsalgoyal77@gmail.com\n💼 LinkedIn: Vatsal Goyal\n📱 WhatsApp — click below!\n\nWhatsApp is usually the fastest! He typically replies within a few hours. 🙂",
  ],
  college: [
    "Vatsal studies **Computer Science Engineering at IMSEC (IMS Engineering College), Ghaziabad**, currently in 2nd year.\n\nApart from studies, he's the Sports Main Coordinator and runs the AAVEG sports club. Balance of tech + leadership! 🎓",
  ],
  price: [
    "Pricing depends on the project scope, but generally:\n\n💰 Simple landing page: ₹3k–8k\n💰 Event website (full): ₹8k–20k\n💰 Web app (backend+db): ₹15k–40k+\n\nBest to discuss on WhatsApp for a custom quote! Vatsal is fair and fast. 📲",
  ],
  default: [
    "Hmm, I'm not sure about that! 🤔 You can ask me about:\n• Vatsal's **skills**\n• His **projects**\n• **Hackathons** he's won\n• **Freelance** availability\n• **Pricing** / how to hire\n• General **contact** info\n\nOr just click below to chat directly on WhatsApp! 📲",
  ],
}

function getResponse(input) {
  const q = input.toLowerCase()
  if (/skill|tech|stack|know|language|code|program|react|python|javascript|js|node/.test(q)) return KB.skills[0]
  if (/project|build|made|work|chakravyuh|vault|predictor|app|website/.test(q)) return KB.projects[0]
  if (/hackathon|hack|competition|win|prize|rift|yuvaan|drishti|compete/.test(q)) return KB.hackathons[0]
  if (/about|who|tell|background|himself|vatsal|person/.test(q)) return KB.about[0]
  if (/freelanc|available|free|hire|cost|budget|money|price|rupee|₹|how much|quote/.test(q)) return KB.price[0]
  if (/hire|work with|want to|build|develop|need/.test(q)) return KB.hire[0]
  if (/contact|reach|connect|email|whatsapp|message|dm/.test(q)) return KB.contact[0]
  if (/college|imsec|ghaziabad|cse|student|study|education|degree/.test(q)) return KB.college[0]
  if (/hello|hi|hey|sup|yo|namaste/.test(q)) return KB.greet[0]
  return KB.default[0]
}

const QUICK_BUTTONS = ['Skills 💻', 'Projects 🚀', 'Hackathons 🏆', 'Freelance? 📲']

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([])
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const [msgCount, setMsgCount] = useState(0)
  const [greeted, setGreeted]   = useState(false)
  const [nudge, setNudge]       = useState(false)
  const endRef = useRef(null)

  /* ── Show nudge bubble after 4 seconds ── */
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 4000)
    return () => clearTimeout(t)
  }, [])

  /* ── Animated greeting sequence on first open ── */
  useEffect(() => {
    if (!open || greeted) return
    setGreeted(true)
    setNudge(false)
    setTyping(true)

    const sequence = [
      { delay: 700,  text: "Hey! 👋 Welcome to Vatsal's portfolio!" },
      { delay: 1800, text: "I'm his personal AI assistant 🤖✨" },
      { delay: 3200, text: "I know everything about him — his **skills**, **projects**, **hackathon wins** and how to **hire him** for your next project 🚀\n\nWhat would you like to know?" },
    ]

    sequence.forEach(({ delay, text }, i) => {
      setTimeout(() => {
        setMsgs(prev => [...prev, { from: 'bot', text }])
        if (i < sequence.length - 1) setTyping(true)
        else setTyping(false)
      }, delay)
    })
  }, [open, greeted])



  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  function sendMessage(text) {
    const userMsg = text || input.trim()
    if (!userMsg) return
    setInput('')
    setMsgs(prev => [...prev, { from: 'user', text: userMsg }])
    setTyping(true)
    setMsgCount(c => c + 1)

    setTimeout(() => {
      const reply = getResponse(userMsg)
      setMsgs(prev => [...prev, { from: 'bot', text: reply }])
      setTyping(false)
    }, 900 + Math.random() * 400)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const showWA = msgCount >= 2

  return (
    <>
      {/* ── Nudge bubble (appears after 4s) ── */}
      {nudge && !open && (
        <div className="cb-nudge" onClick={() => setOpen(true)}>
          <span className="cb-nudge-wave">👋</span>
          <span>Psst! Ask me about Vatsal!</span>
          <button className="cb-nudge-close" onClick={e => { e.stopPropagation(); setNudge(false) }}>✕</button>
        </div>
      )}

      {/* ── Floating toggle button ── */}
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
            <div className="cb-title">Vatsal's Assistant</div>
            <div className="cb-subtitle"><span className="cb-dot" />Online</div>
          </div>
          <button className="cb-close" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Messages */}
        <div className="cb-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`cb-msg ${m.from === 'user' ? 'msg-user' : 'msg-bot'}`}>
              <div className="cb-bubble" dangerouslySetInnerHTML={{
                __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
              }} />
            </div>
          ))}
          {typing && (
            <div className="cb-msg msg-bot">
              <div className="cb-bubble cb-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Quick buttons */}
        <div className="cb-quick">
          {QUICK_BUTTONS.map(btn => (
            <button key={btn} className="cb-quick-btn" onClick={() => sendMessage(btn)}>
              {btn}
            </button>
          ))}
        </div>

        {/* WhatsApp CTA — appears after 2 messages */}
        {showWA && (
          <a
            href={`https://wa.me/${VATSAL_WA}?text=Hi%20Vatsal!%20I%20came%20from%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project.`}
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
            placeholder="Ask me anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="cb-send" onClick={() => sendMessage()} disabled={!input.trim()}>→</button>
        </div>
      </div>
    </>
  )
}
