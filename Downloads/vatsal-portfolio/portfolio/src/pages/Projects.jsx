import { Link } from 'react-router-dom'
import { projects } from '../data'
import { useReveal } from '../hooks/useReveal'

export default function Projects() {
  useReveal()

  return (
    <div className="inner-page">
      <div className="page-header reveal">
        <Link to="/" className="back-link">← Back</Link>
        <span className="page-eyebrow">Selected Work</span>
        <h1 className="page-title">Projects I've <em>shipped</em></h1>
      </div>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <article key={p.name} className="project-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="project-card-top">
              <div className="project-icon" style={{ background: p.color + '22', border: `1px solid ${p.color}44` }}>
                <span style={{ color: p.color }}>{'<>'}</span>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <h2 className="project-name">
              {p.url
                ? <a href={p.url} target="_blank" rel="noopener">{p.name} ↗</a>
                : p.name}
            </h2>

            <p className="project-desc">{p.text}</p>

            <div className="project-stack">
              {p.stack.map(s => (
                <span key={s} className="stack-chip">{s}</span>
              ))}
            </div>

            <div className="project-card-shine" style={{ '--shine-color': p.color }} />
          </article>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    'Live':        { cls: 'badge-live',     label: '● Live' },
    'In Progress': { cls: 'badge-wip',      label: '◐ In Progress' },
    'Done':        { cls: 'badge-done',     label: '✓ Done' },
  }
  const { cls, label } = map[status] || map['Done']
  return <span className={`status-badge ${cls}`}>{label}</span>
}
