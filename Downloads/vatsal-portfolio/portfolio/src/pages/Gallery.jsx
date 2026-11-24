import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const GALLERY = [
  {
    category: '🏆 Hackathon Wins',
    items: [
      {
        img: '/images/hackwithup-stage.jpg',
        title: 'HackWithUttarPradesh 2025',
        sub: '3rd Place · ₹10,000 Prize · Chandigarh University',
        type: 'photo',
      },
      {
        img: '/images/hackwithup-certificate.png',
        title: 'Certificate of Achievement',
        sub: 'Hack With Uttarpradesh · 3rd Position · 05.11.2025',
        type: 'cert',
      },
      {
        img: '/images/hackwithup-college.jpg',
        title: 'Celebration at IMSEC',
        sub: 'With Director & HODs after HackWithUP win',
        type: 'photo',
      },
    ],
  },
  {
    category: '⚡ RIFT Hackathon',
    items: [
      {
        img: '/images/rift-team.jpg',
        title: "RIFT '26 · PW Institute of Innovation",
        sub: 'Semi-Finalist · Rank 6 · Healthcare Track · 8,000+ Registrations',
        type: 'photo',
      },
    ],
  },
  {
    category: '🚀 IIT Delhi · Startup Incubation',
    items: [
      {
        img: '/images/iit-delhi-incubator.jpg',
        title: 'IIT Delhi eDC INCon 2026',
        sub: 'TrueChain — Incubator Summit · LHC, IIT Delhi · 31 Jan 2026',
        type: 'photo',
      },
    ],
  },
  {
    category: '🏅 Leadership & Events',
    items: [
      {
        img: '/images/vatsal-certificate.jpg',
        title: 'Chakravyuh 2K26 · Certificate of Merit',
        sub: 'IMSEC — Sports Fest · From IMSEC Director',
        type: 'photo',
      },
      {
        img: '/images/gfg-vp-seminar.jpg',
        title: 'With GFG VP Chandan Jha',
        sub: 'Seminar organized at IMSEC · 2026',
        type: 'photo',
      },
      {
        img: '/images/gfg-letter.png',
        title: 'GFG Campus Mantri — Appointment Letter',
        sub: 'Official Representative · IMSEC Ghaziabad · Jan 2026',
        type: 'cert',
      },
    ],
  },
  {
    category: '🤖 Certifications',
    items: [
      {
        img: '/images/ibm-certificate.png',
        title: 'IBM PBEL 2.3 — Generative AI',
        sub: 'Vatsal Goyal · Issued May 2, 2026 · IBM Developer Skills Network',
        type: 'cert',
      },
    ],
  },
]

export default function Gallery() {
  useReveal()

  return (
    <div className="inner-page">
      <div className="page-header reveal">
        <Link to="/" className="back-link">← Back</Link>
        <span className="page-eyebrow">Proof of Work</span>
        <h1 className="page-title">Gallery &amp; <em>Certificates</em></h1>
      </div>

      {GALLERY.map((section, si) => (
        <section key={si} className="gallery-section reveal" style={{ animationDelay: `${si * 0.1}s` }}>
          <h2 className="gallery-section-title">{section.category}</h2>
          <div className="gallery-page-grid">
            {section.items.map((item, ii) => (
              <div
                key={ii}
                className={`gallery-page-item ${item.type === 'cert' ? 'gpi-cert' : 'gpi-photo'}`}
              >
                <div className="gpi-img-wrap">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="gpi-info">
                  <h3 className="gpi-title">{item.title}</h3>
                  <p className="gpi-sub">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
