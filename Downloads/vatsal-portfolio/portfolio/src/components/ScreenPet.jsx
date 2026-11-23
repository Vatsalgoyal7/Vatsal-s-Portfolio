import { useState, useEffect, useRef } from 'react'

const MESSAGES = [
  "Hire Vatsal! 🚀",
  "He won ₹10k! 🏆",
  "Blockchain founder! ⛓️",
  "Ask me anything! 💬",
  "Available to freelance! 💼",
  "Gemini Ambassador! 🔵",
  "IIT Delhi incubated! 🎓",
  "React dev here! ⚡",
  "8+ hackathons! 🏅",
  "Check projects! 🛠️",
]

export default function ScreenPet() {
  const [pos, setPos]         = useState({ x: 100, y: window.innerHeight - 200 })
  const [dir, setDir]         = useState(1)
  const [state, setState]     = useState('idle')
  const [bubble, setBubble]   = useState('')
  const [showBubble, setShow] = useState(false)
  const [blink, setBlink]     = useState(false)
  const timerRef  = useRef(null)
  const bubbleRef = useRef(null)

  /* ── Random roam ── */
  useEffect(() => {
    const roam = () => {
      const margin = 100
      const maxX = window.innerWidth  - margin
      const maxY = window.innerHeight - margin
      const nx   = Math.random() * (maxX - margin) + margin / 2
      const ny   = Math.random() * (maxY - 100) + 60

      setPos(prev => {
        setDir(nx > prev.x ? 1 : -1)
        return { x: nx, y: ny }
      })
      setState('walk')
      setTimeout(() => setState('idle'), 1400)
    }

    roam()
    timerRef.current = setInterval(roam, 4000)
    return () => clearInterval(timerRef.current)
  }, [])

  /* ── Eye blink ── */
  useEffect(() => {
    const t = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  /* ── Speech bubble every ~8s ── */
  useEffect(() => {
    const show = () => {
      setBubble(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
      setShow(true)
      bubbleRef.current = setTimeout(() => setShow(false), 3000)
    }
    const t = setInterval(show, 8000)
    setTimeout(show, 2000)
    return () => { clearInterval(t); clearTimeout(bubbleRef.current) }
  }, [])

  /* ── Click ── */
  function handleClick() {
    setState('happy')
    setBubble(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    setShow(true)
    clearTimeout(bubbleRef.current)
    bubbleRef.current = setTimeout(() => { setShow(false); setState('idle') }, 2200)
  }

  return (
    <div
      className={`screen-pet pet-${state}`}
      style={{ left: pos.x, top: pos.y }}
      onClick={handleClick}
      title="Click me!"
    >
      {/* Speech bubble — NOT mirrored */}
      {showBubble && (
        <div className="pet-bubble">{bubble}</div>
      )}

      {/* Character SVG — only THIS flips direction */}
      <svg
        className="pet-svg"
        viewBox="0 0 60 80"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `scaleX(${dir})` }}
      >
        {/* Glow aura */}
        <ellipse cx="30" cy="72" rx="18" ry="5" fill="rgba(124,58,237,0.25)" />

        {/* Body — teardrop ghost shape */}
        <path
          d="M 30 10 C 10 10, 6 30, 8 48 C 8 60, 14 68, 20 68 C 23 68 25 65 30 65 C 35 65 37 68 40 68 C 46 68 52 60 52 48 C 54 30 50 10 30 10 Z"
          fill="url(#bodyGrad)"
          stroke="rgba(167,139,250,0.4)"
          strokeWidth="1"
        />

        {/* Inner glow core */}
        <ellipse cx="30" cy="38" rx="12" ry="14" fill="rgba(167,139,250,0.12)" />

        {/* Face — visor */}
        <rect x="16" y="22" width="28" height="20" rx="10" fill="#0a0520" opacity="0.9"/>
        <rect x="16" y="22" width="28" height="20" rx="10" fill="none" stroke="rgba(124,58,237,0.6)" strokeWidth="1.2"/>

        {/* Eyes */}
        <circle cx="24" cy="32" r={blink ? 0.5 : 4} fill="#ec4899" className="pet-eye-glow"/>
        <circle cx="36" cy="32" r={blink ? 0.5 : 4} fill="#ec4899" className="pet-eye-glow"/>
        {!blink && <>
          <circle cx="25.5" cy="30.5" r="1.5" fill="#fff" opacity="0.9"/>
          <circle cx="37.5" cy="30.5" r="1.5" fill="#fff" opacity="0.9"/>
          {/* Pupils */}
          <circle cx="24" cy="32" r="1.8" fill="#7c3aed" opacity="0.6"/>
          <circle cx="36" cy="32" r="1.8" fill="#7c3aed" opacity="0.6"/>
        </>}

        {/* Mouth */}
        <path
          d={state === 'happy' ? "M 24 40 Q 30 46 36 40" : "M 25 40 Q 30 43 35 40"}
          stroke="#a78bfa" strokeWidth="1.8" fill="none" strokeLinecap="round"
        />

        {/* Antenna */}
        <line x1="30" y1="10" x2="30" y2="4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="30" cy="3" r="3" fill="#ec4899" className="pet-antenna-dot"/>

        {/* Chest glow orb */}
        <circle cx="30" cy="52" r="5" fill="rgba(124,58,237,0.3)" className="pet-chest"/>
        <circle cx="30" cy="52" r="2.5" fill="#a78bfa" className="pet-chest-inner"/>

        {/* Tail wiggles */}
        <path
          d="M 20 66 Q 15 72 20 76"
          stroke="rgba(167,139,250,0.5)" strokeWidth="3" fill="none" strokeLinecap="round"
          className={state === 'walk' ? 'pet-tail-l' : ''}
        />
        <path
          d="M 40 66 Q 45 72 40 76"
          stroke="rgba(167,139,250,0.5)" strokeWidth="3" fill="none" strokeLinecap="round"
          className={state === 'walk' ? 'pet-tail-r' : ''}
        />

        {/* Sparkles when happy */}
        {state === 'happy' && <>
          <circle cx="10" cy="20" r="2" fill="#f59e0b" className="pet-sparkle"/>
          <circle cx="50" cy="15" r="1.5" fill="#ec4899" className="pet-sparkle" style={{animationDelay:'0.1s'}}/>
          <circle cx="8"  cy="40" r="1" fill="#a78bfa" className="pet-sparkle" style={{animationDelay:'0.2s'}}/>
          <circle cx="52" cy="35" r="2" fill="#22d3ee" className="pet-sparkle" style={{animationDelay:'0.05s'}}/>
        </>}

        {/* Defs */}
        <defs>
          <radialGradient id="bodyGrad" cx="40%" cy="30%">
            <stop offset="0%"   stopColor="#8b5cf6"/>
            <stop offset="60%"  stopColor="#5b21b6"/>
            <stop offset="100%" stopColor="#2e1065"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
