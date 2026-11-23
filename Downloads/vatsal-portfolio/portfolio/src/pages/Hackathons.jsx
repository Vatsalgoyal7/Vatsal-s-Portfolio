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
        <h1 className="page-title">Hackathons <em>& Wins</em></h1>
      </div>

      <div className="hackathons-list">
        {hackathons.map((h, i) => (
          <div key={i} className="hack-card reveal" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="hack-left">
              <div className="hack-year">{h.year}</div>
              <div className="hack-org">{h.org}</div>
            </div>
            <div className="hack-body">
              <h2 className="hack-name">{h.name}</h2>
              <div className={`hack-place ${
                (h.place || '').includes('🏆') || (h.place || '').includes('3rd') ? 'place-winner' :
                (h.place || '').includes('Semi') || (h.place || '').includes('⚡') ? 'place-finalist' :
                (h.place || '').includes('🚀') ? 'place-special' : 'place-participant'
              }`}>{h.place}</div>
              <p className="hack-desc">{h.desc}</p>
              <div className="hack-tags">
                {(h.tags || []).map(t => (
                  <span key={t} className="hack-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
