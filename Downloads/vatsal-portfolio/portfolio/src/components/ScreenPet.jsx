import { useState, useEffect, useRef } from 'react'

const MESSAGES = [
  "Hire Vatsal! 🚀",
  "Ask me anything! 💬",
  "Check projects! 🛠️",
  "He won ₹10k! 🏆",
  "Available for freelance! 💼",
  "React dev here! ⚡",
  "Psst.. click me! 😄",
  "IMSEC's finest! 🎓",
]

export default function ScreenPet() {
  const [pos, setPos]         = useState({ x: 80, y: window.innerHeight - 160 })
  const [dir, setDir]         = useState(1)         // 1 = right, -1 = left
  const [state, setState]     = useState('idle')    // idle | walk | jump | happy
  const [bubble, setBubble]   = useState('')
  const [showBubble, setShow] = useState(false)
  const timerRef  = useRef(null)
  const bubbleRef = useRef(null)

  /* ── Random roam ── */
  useEffect(() => {
    const roam = () => {
      const margin = 90
      const maxX = window.innerWidth  - margin
      const maxY = window.innerHeight - margin
      const nx   = Math.random() * (maxX - margin) + margin / 2
      const ny   = Math.random() * (maxY - 100)    + 60

      setPos(prev => {
        setDir(nx > prev.x ? 1 : -1)
        return { x: nx, y: ny }
      })
      setState('walk')
      setTimeout(() => setState('idle'), 1200)
    }

    roam()
    timerRef.current = setInterval(roam, 3500)
    return () => clearInterval(timerRef.current)
  }, [])

  /* ── Show random bubble every ~8s ── */
  useEffect(() => {
    const show = () => {
      setBubble(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
      setShow(true)
      bubbleRef.current = setTimeout(() => setShow(false), 2800)
    }
    const t = setInterval(show, 8000)
    setTimeout(show, 2500) // first bubble early
    return () => { clearInterval(t); clearTimeout(bubbleRef.current) }
  }, [])

  /* ── Click = happy jump ── */
  function handleClick() {
    setState('happy')
    setBubble(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    setShow(true)
    clearTimeout(bubbleRef.current)
    bubbleRef.current = setTimeout(() => { setShow(false); setState('idle') }, 2000)
  }

  return (
    <div
      className={`screen-pet pet-${state}`}
      style={{
        left: pos.x,
        top:  pos.y,
        transform: `scaleX(${dir})`,
      }}
      onClick={handleClick}
      title="Click me!"
    >
      {/* Speech bubble */}
      {showBubble && (
        <div className="pet-bubble" style={{ transform: `scaleX(${dir})` }}>
          {bubble}
        </div>
      )}

      {/* Robot SVG mascot */}
      <svg
        className="pet-svg"
        viewBox="0 0 80 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antenna */}
        <line x1="40" y1="8" x2="40" y2="18" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="40" cy="6" r="4" fill="#ec4899" className="pet-antenna-dot"/>

        {/* Helmet */}
        <ellipse cx="40" cy="28" rx="20" ry="18" fill="url(#helmetGrad)" />
        <ellipse cx="40" cy="28" rx="20" ry="18" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6"/>

        {/* Visor */}
        <ellipse cx="40" cy="28" rx="13" ry="11" fill="#0f0520"/>
        <ellipse cx="40" cy="28" rx="13" ry="11" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.8"/>

        {/* Eyes */}
        <circle cx="34" cy="26" r="3.5" fill="#ec4899" className="pet-eye"/>
        <circle cx="46" cy="26" r="3.5" fill="#ec4899" className="pet-eye"/>
        <circle cx="35" cy="25" r="1" fill="#fff" opacity="0.9"/>
        <circle cx="47" cy="25" r="1" fill="#fff" opacity="0.9"/>

        {/* Mouth */}
        <path
          d={state === 'happy'
            ? "M 34 33 Q 40 38 46 33"   // smile
            : "M 34 33 Q 40 35 46 33"}   // neutral
          stroke="#a78bfa" strokeWidth="2" fill="none" strokeLinecap="round"
        />

        {/* Body */}
        <rect x="22" y="44" width="36" height="30" rx="8" fill="url(#bodyGrad)"/>
        <rect x="22" y="44" width="36" height="30" rx="8" fill="none" stroke="#7c3aed" strokeWidth="1.2" opacity="0.5"/>

        {/* Chest light */}
        <circle cx="40" cy="57" r="5" fill="#7c3aed" opacity="0.8" className="pet-chest"/>
        <circle cx="40" cy="57" r="2.5" fill="#ec4899" className="pet-chest-inner"/>

        {/* Side buttons */}
        <circle cx="30" cy="52" r="2" fill="#06b6d4" opacity="0.8"/>
        <circle cx="50" cy="52" r="2" fill="#f59e0b" opacity="0.8"/>

        {/* Arms */}
        <rect x="8"  y="46" width="13" height="8" rx="4" fill="url(#bodyGrad)" className={state === 'walk' ? 'pet-arm-l' : ''}/>
        <rect x="59" y="46" width="13" height="8" rx="4" fill="url(#bodyGrad)" className={state === 'walk' ? 'pet-arm-r' : ''}/>

        {/* Legs */}
        <rect x="27" y="72" width="10" height="16" rx="5" fill="url(#bodyGrad)" className={state === 'walk' ? 'pet-leg-l' : ''}/>
        <rect x="43" y="72" width="10" height="16" rx="5" fill="url(#bodyGrad)" className={state === 'walk' ? 'pet-leg-r' : ''}/>

        {/* Feet */}
        <ellipse cx="32" cy="88" rx="7" ry="4" fill="#6d28d9"/>
        <ellipse cx="48" cy="88" rx="7" ry="4" fill="#6d28d9"/>

        {/* Gradients */}
        <defs>
          <radialGradient id="helmetGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#c4b5fd"/>
            <stop offset="100%" stopColor="#6d28d9"/>
          </radialGradient>
          <radialGradient id="bodyGrad" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#8b5cf6"/>
            <stop offset="100%" stopColor="#4c1d95"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
