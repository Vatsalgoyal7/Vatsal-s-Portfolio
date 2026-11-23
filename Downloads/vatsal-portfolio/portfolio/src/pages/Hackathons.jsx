import { Link } from 'react-router-dom'
import { hackathons } from '../data'
import { useReveal } from '../hooks/useReveal'

export default function Hackathons() {
  useReveal()

  return (
    <div className="inner-page">
      <div className="page-header reveal">
        <Link to="/" className="back-link">← Back</Link>
        <span className="page-eyebrow">Competition Journey</span>
        <h1 className="page-title">Hackathons <em>and Wins</em></h1>
      </div>

      <div className="timeline-grid">
        {hackathons.map((h, i) => (
          <div key={h.when} className="tc reveal" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="tc-when">{h.when}</div>
            <div className="tc-what">{h.what}</div>
            <div className="tc-note">{h.note}</div>
            <div className={`tc-badge ${h.result.includes('Semi') ? 'finalist' : h.result.includes('🏆') ? 'winner' : ''}`}>
              {h.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
